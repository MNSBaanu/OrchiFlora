import { useState, useEffect } from 'react'
import { HiDotsHorizontal } from 'react-icons/hi'

function Dashboard() {
  const [timeFilter, setTimeFilter] = useState('today')
  const [stats, setStats] = useState({
    totalPlants: 0,
    activeGreenhouses: 0,
    temperatureRecords: 0,
    upcomingHarvests: 0
  })

  useEffect(() => {
    // Load stats from localStorage
    const tempData = JSON.parse(localStorage.getItem('orchiFloraData') || '[]')
    const plants = JSON.parse(localStorage.getItem('plantInventory') || '[]')
    
    setStats({
      totalPlants: plants.length,
      activeGreenhouses: 3,
      temperatureRecords: tempData.length,
      upcomingHarvests: plants.filter(p => p.status === 'blooming').length
    })
  }, [])

  const generateChartBars = (count) => {
    return Array.from({ length: 24 }, (_, i) => ({
      height: Math.random() * 100,
      active: i < count
    }))
  }

  return (
    <div>
      {/* Time Filter */}
      <div className="time-filter">
        <button 
          className={`time-filter-btn ${timeFilter === 'today' ? 'active' : ''}`}
          onClick={() => setTimeFilter('today')}
        >
          Today
        </button>
        <button 
          className={`time-filter-btn ${timeFilter === 'week' ? 'active' : ''}`}
          onClick={() => setTimeFilter('week')}
        >
          This Week
        </button>
        <button 
          className={`time-filter-btn ${timeFilter === 'month' ? 'active' : ''}`}
          onClick={() => setTimeFilter('month')}
        >
          This Month
        </button>
      </div>

      {/* Info Card */}
      <div className="info-card">
        <div className="info-grid">
          <div className="info-item">
            <span className="info-label">Greenhouse name</span>
            <span className="info-value">Phalaenopsis House</span>
          </div>
          <div className="info-item">
            <span className="info-label">Manager name</span>
            <span className="info-value">Alexander</span>
          </div>
          <div className="info-item">
            <span className="info-label">Location</span>
            <span className="info-value">Section A</span>
          </div>
          <div className="info-item">
            <span className="info-label">Plant type</span>
            <span className="info-value">Orchid Mix</span>
          </div>
          <div className="info-item">
            <span className="info-label">Zone code</span>
            <span className="info-value">GH-001</span>
          </div>
          <div className="info-item">
            <span className="info-label">Capacity</span>
            <span className="info-value">500 plants</span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-header">
            <span className="stat-label">Active Plants</span>
            <button className="card-menu">
              <HiDotsHorizontal size={20} />
            </button>
          </div>
          <div className="stat-value-container">
            <span className="stat-value">450</span>
            <span className="stat-change positive">(+40)</span>
          </div>
          <div className="stat-chart">
            {generateChartBars(18).map((bar, i) => (
              <div 
                key={i} 
                className={`stat-bar ${bar.active ? 'active' : ''}`}
                style={{ height: `${bar.height}%` }}
              />
            ))}
          </div>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            marginTop: '8px',
            fontSize: '0.75em',
            color: 'var(--text-muted)'
          }}>
            <span>08:00</span>
            <span>10:00</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <span className="stat-label">Blooming Today</span>
            <button className="card-menu">
              <HiDotsHorizontal size={20} />
            </button>
          </div>
          <div className="stat-value-container">
            <span className="stat-value">320</span>
            <span className="stat-change positive">(+25)</span>
          </div>
          <div className="stat-chart">
            {generateChartBars(20).map((bar, i) => (
              <div 
                key={i} 
                className={`stat-bar ${bar.active ? 'active' : ''}`}
                style={{ height: `${bar.height}%` }}
              />
            ))}
          </div>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            marginTop: '8px',
            fontSize: '0.75em',
            color: 'var(--text-muted)'
          }}>
            <span>00:00</span>
            <span>00:00</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <span className="stat-label">Available Space</span>
            <button className="card-menu">
              <HiDotsHorizontal size={20} />
            </button>
          </div>
          <div className="stat-value-container">
            <span className="stat-value">180</span>
            <span className="stat-change negative">(-20)</span>
          </div>
          <div className="stat-chart">
            {generateChartBars(15).map((bar, i) => (
              <div 
                key={i} 
                className={`stat-bar ${bar.active ? 'active' : ''}`}
                style={{ height: `${bar.height}%` }}
              />
            ))}
          </div>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            marginTop: '8px',
            fontSize: '0.75em',
            color: 'var(--text-muted)'
          }}>
            <span>09:00</span>
            <span>23:00</span>
          </div>
        </div>
      </div>

      {/* Bottom Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
        <div className="card">
          <div className="card-header">
            <h2>Growth Performance</h2>
            <button className="card-menu">
              <HiDotsHorizontal size={20} />
            </button>
          </div>
          <div style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
            Chart visualization coming soon...
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h2>Greenhouse Status</h2>
            <button className="card-menu">
              <HiDotsHorizontal size={20} />
            </button>
          </div>
          <div style={{ marginTop: '20px' }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              marginBottom: '24px'
            }}>
              <div style={{ 
                width: '160px', 
                height: '160px', 
                borderRadius: '50%',
                background: `conic-gradient(
                  var(--orchid-green) 0deg 157deg,
                  var(--orchid-purple) 157deg 230deg,
                  var(--orchid-pink) 230deg 314deg,
                  #e0e0e0 314deg 360deg
                )`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <div style={{ 
                  width: '120px', 
                  height: '120px', 
                  borderRadius: '50%',
                  background: 'white',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <div style={{ fontSize: '2em', fontWeight: '700' }}>87.29%</div>
                  <div style={{ fontSize: '0.75em', color: 'var(--text-muted)' }}>vs last month</div>
                </div>
              </div>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { label: 'Blooming', percent: '43%', count: '1,250 plants', color: 'var(--orchid-green)' },
                { label: 'Growing', percent: '21%', count: '620 plants', color: 'var(--orchid-purple)' },
                { label: 'Maintenance', percent: '23%', count: '740 plants', color: 'var(--orchid-pink)' },
                { label: 'Available', percent: '13%', count: '360 slots', color: '#e0e0e0' }
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ 
                      width: '12px', 
                      height: '12px', 
                      borderRadius: '3px',
                      background: item.color 
                    }} />
                    <span style={{ fontSize: '0.9em', color: 'var(--text-secondary)' }}>{item.label} ({item.percent})</span>
                  </div>
                  <span style={{ fontSize: '0.9em', fontWeight: '600' }}>{item.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
