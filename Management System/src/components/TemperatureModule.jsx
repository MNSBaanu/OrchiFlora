import { useState, useEffect } from 'react'

function TemperatureModule() {
  const [temperatureData, setTemperatureData] = useState([])
  const [dayTemp, setDayTemp] = useState('')
  const [nightTemp, setNightTemp] = useState('')
  const [activeView, setActiveView] = useState('entry')

  useEffect(() => {
    loadData()
  }, [])

  const loadData = () => {
    const saved = localStorage.getItem('orchiFloraData')
    if (saved) {
      setTemperatureData(JSON.parse(saved))
    }
  }

  const convertToFahrenheit = (celsius) => {
    return (celsius * 9 / 5) + 32
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (temperatureData.length >= 30) {
      alert('Maximum 30 days reached!')
      return
    }

    const dayTempNum = parseFloat(dayTemp)
    const nightTempNum = parseFloat(nightTemp)

    if (isNaN(dayTempNum) || isNaN(nightTempNum)) {
      alert('Please enter valid temperature values')
      return
    }

    const newData = {
      day: temperatureData.length + 1,
      dayTempC: dayTempNum,
      nightTempC: nightTempNum,
      dayTempF: convertToFahrenheit(dayTempNum),
      nightTempF: convertToFahrenheit(nightTempNum),
      date: new Date().toISOString()
    }

    const updated = [...temperatureData, newData]
    setTemperatureData(updated)
    localStorage.setItem('orchiFloraData', JSON.stringify(updated))
    
    setDayTemp('')
    setNightTemp('')
    alert(`Day ${newData.day} data added successfully!`)
  }

  const clearAllData = () => {
    if (window.confirm('Are you sure you want to clear all data?')) {
      setTemperatureData([])
      localStorage.removeItem('orchiFloraData')
      alert('All data cleared!')
    }
  }

  const exportToCSV = () => {
    if (temperatureData.length === 0) {
      alert('No data to export')
      return
    }

    let csv = 'Day,Day Temp (°C),Day Temp (°F),Night Temp (°C),Night Temp (°F),Fluctuation (°F)\n'
    
    temperatureData.forEach(data => {
      const fluctuation = data.dayTempF - data.nightTempF
      csv += `${data.day},${data.dayTempC.toFixed(2)},${data.dayTempF.toFixed(2)},${data.nightTempC.toFixed(2)},${data.nightTempF.toFixed(2)},${fluctuation.toFixed(2)}\n`
    })

    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `temperature-data-${new Date().toISOString().split('T')[0]}.csv`
    link.click()
    
    alert('Data exported successfully!')
  }

  const generateAnalysis = () => {
    if (temperatureData.length === 0) {
      return null
    }

    let totalFluctuation = 0
    let totalDayTemp = 0
    let totalNightTemp = 0
    let maxDayTemp = temperatureData[0].dayTempF
    let minDayTemp = temperatureData[0].dayTempF
    let maxNightTemp = temperatureData[0].nightTempF
    let minNightTemp = temperatureData[0].nightTempF

    temperatureData.forEach(data => {
      const fluctuation = data.dayTempF - data.nightTempF
      totalFluctuation += fluctuation
      totalDayTemp += data.dayTempF
      totalNightTemp += data.nightTempF
      
      if (data.dayTempF > maxDayTemp) maxDayTemp = data.dayTempF
      if (data.dayTempF < minDayTemp) minDayTemp = data.dayTempF
      if (data.nightTempF > maxNightTemp) maxNightTemp = data.nightTempF
      if (data.nightTempF < minNightTemp) minNightTemp = data.nightTempF
    })

    const avgFluctuation = totalFluctuation / temperatureData.length
    const avgDayTemp = totalDayTemp / temperatureData.length
    const avgNightTemp = totalNightTemp / temperatureData.length

    return {
      avgFluctuation,
      avgDayTemp,
      avgNightTemp,
      maxDayTemp,
      minDayTemp,
      maxNightTemp,
      minNightTemp
    }
  }

  const analysis = generateAnalysis()

  return (
    <div>
      <div className="stats-grid">
        <div className="stat-card">
          <span className="stat-label">Days Recorded</span>
          <span className="stat-value">{temperatureData.length}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Max Days</span>
          <span className="stat-value">30</span>
        </div>
        {analysis && (
          <>
            <div className="stat-card">
              <span className="stat-label">Avg Fluctuation</span>
              <span className="stat-value">{analysis.avgFluctuation.toFixed(1)}°F</span>
            </div>
            <div className="stat-card">
              <span className="stat-label">Avg Day Temp</span>
              <span className="stat-value">{analysis.avgDayTemp.toFixed(1)}°F</span>
            </div>
          </>
        )}
      </div>

      <div style={{ marginBottom: '20px', display: 'flex', gap: '12px' }}>
        <button 
          className={`btn ${activeView === 'entry' ? 'btn-primary' : ''}`}
          onClick={() => setActiveView('entry')}
          style={activeView !== 'entry' ? { background: 'var(--orchid-white)', color: 'var(--text-primary)' } : {}}
        >
          Data Entry
        </button>
        <button 
          className={`btn ${activeView === 'view' ? 'btn-primary' : ''}`}
          onClick={() => setActiveView('view')}
          style={activeView !== 'view' ? { background: 'var(--orchid-white)', color: 'var(--text-primary)' } : {}}
        >
          View Data
        </button>
        <button 
          className={`btn ${activeView === 'analysis' ? 'btn-primary' : ''}`}
          onClick={() => setActiveView('analysis')}
          style={activeView !== 'analysis' ? { background: 'var(--orchid-white)', color: 'var(--text-primary)' } : {}}
        >
          Analysis
        </button>
      </div>

      {activeView === 'entry' && (
        <div className="card">
          <h2>Add Temperature Data</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Day Number:</label>
              <input type="number" value={temperatureData.length + 1} readOnly />
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>Daytime Temperature (°C):</label>
                <input 
                  type="number" 
                  step="0.1" 
                  value={dayTemp}
                  onChange={(e) => setDayTemp(e.target.value)}
                  required 
                />
                {dayTemp && (
                  <span style={{ 
                    display: 'block', 
                    marginTop: '8px', 
                    color: 'var(--orchid-purple)',
                    fontWeight: '600'
                  }}>
                    = {convertToFahrenheit(parseFloat(dayTemp)).toFixed(2)}°F
                  </span>
                )}
              </div>
              
              <div className="form-group">
                <label>Nighttime Temperature (°C):</label>
                <input 
                  type="number" 
                  step="0.1" 
                  value={nightTemp}
                  onChange={(e) => setNightTemp(e.target.value)}
                  required 
                />
                {nightTemp && (
                  <span style={{ 
                    display: 'block', 
                    marginTop: '8px', 
                    color: 'var(--orchid-purple)',
                    fontWeight: '600'
                  }}>
                    = {convertToFahrenheit(parseFloat(nightTemp)).toFixed(2)}°F
                  </span>
                )}
              </div>
            </div>
            
            <button type="submit" className="btn btn-primary">Add Day Data</button>
            <button type="button" className="btn btn-secondary" onClick={clearAllData}>Clear All Data</button>
            <button type="button" className="btn btn-primary" onClick={exportToCSV}>Export to CSV</button>
          </form>
        </div>
      )}

      {activeView === 'view' && (
        <div className="card">
          <h2>Temperature Records</h2>
          <button className="btn btn-primary" onClick={exportToCSV} style={{ marginBottom: '20px' }}>
            Export to CSV
          </button>
          {temperatureData.length === 0 ? (
            <div className="empty-state">No data available. Please add temperature data first.</div>
          ) : (
            <table className="data-table">
              <thead>
                <tr>
                  <th>Day</th>
                  <th>Day Temp (°C)</th>
                  <th>Day Temp (°F)</th>
                  <th>Night Temp (°C)</th>
                  <th>Night Temp (°F)</th>
                  <th>Fluctuation (°F)</th>
                </tr>
              </thead>
              <tbody>
                {temperatureData.map(data => (
                  <tr key={data.day}>
                    <td>{data.day}</td>
                    <td>{data.dayTempC.toFixed(2)}</td>
                    <td>{data.dayTempF.toFixed(2)}</td>
                    <td>{data.nightTempC.toFixed(2)}</td>
                    <td>{data.nightTempF.toFixed(2)}</td>
                    <td>{(data.dayTempF - data.nightTempF).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {activeView === 'analysis' && (
        <div className="card">
          <h2>Temperature Analysis Report</h2>
          {!analysis ? (
            <div className="empty-state">No data available. Please add temperature data first.</div>
          ) : (
            <div>
              <div style={{ 
                padding: '32px', 
                background: 'var(--orchid-white)', 
                borderRadius: '20px',
                marginBottom: '24px'
              }}>
                <h3 style={{ color: 'var(--orchid-purple)', marginBottom: '20px' }}>Statistical Summary</h3>
                <div style={{ display: 'grid', gap: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', background: 'white', borderRadius: '8px' }}>
                    <span>Days Analyzed:</span>
                    <strong>{temperatureData.length}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', background: 'white', borderRadius: '8px' }}>
                    <span>Average Temperature Fluctuation:</span>
                    <strong>{analysis.avgFluctuation.toFixed(2)}°F</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', background: 'white', borderRadius: '8px' }}>
                    <span>Average Day Temperature:</span>
                    <strong>{analysis.avgDayTemp.toFixed(2)}°F</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', background: 'white', borderRadius: '8px' }}>
                    <span>Average Night Temperature:</span>
                    <strong>{analysis.avgNightTemp.toFixed(2)}°F</strong>
                  </div>
                </div>
              </div>

              <div style={{ 
                padding: '32px', 
                background: 'var(--orchid-white)', 
                borderRadius: '20px'
              }}>
                <h3 style={{ color: 'var(--orchid-purple)', marginBottom: '20px' }}>Suitability Assessment</h3>
                <div style={{ display: 'grid', gap: '12px' }}>
                  {[
                    { condition: analysis.avgFluctuation >= 10 && analysis.avgFluctuation <= 15, text: 'Temperature Fluctuation (10-15°F ideal)', value: `${analysis.avgFluctuation.toFixed(2)}°F` },
                    { condition: analysis.avgNightTemp >= 55 && analysis.avgNightTemp <= 62, text: 'Average Night Temperature (55-62°F ideal)', value: `${analysis.avgNightTemp.toFixed(2)}°F` },
                    { condition: analysis.avgDayTemp >= 70 && analysis.avgDayTemp <= 80, text: 'Average Day Temperature (70-80°F ideal)', value: `${analysis.avgDayTemp.toFixed(2)}°F` }
                  ].map((check, index) => (
                    <div 
                      key={index}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: '18px 22px',
                        borderRadius: '14px',
                        background: check.condition ? 'linear-gradient(135deg, #d4edda 0%, #c3e6cb 100%)' : 'linear-gradient(135deg, #f8d7da 0%, #f5c6cb 100%)',
                        color: check.condition ? 'var(--orchid-green)' : '#721c24',
                        border: `2px solid ${check.condition ? 'rgba(74, 124, 89, 0.3)' : 'rgba(220, 53, 69, 0.3)'}`,
                        fontWeight: '600'
                      }}
                    >
                      <span style={{ marginRight: '16px', fontSize: '1.4em' }}>{check.condition ? '✓' : '✗'}</span>
                      <span>{check.text}: <strong>{check.value}</strong></span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default TemperatureModule
