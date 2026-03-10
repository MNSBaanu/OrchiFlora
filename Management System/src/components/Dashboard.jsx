import { useState, useEffect } from 'react'

function Dashboard() {
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

  return (
    <div>
      <div className="stats-grid">
        <div className="stat-card">
          <span className="stat-label">Total Plants</span>
          <span className="stat-value">{stats.totalPlants}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Active Greenhouses</span>
          <span className="stat-value">{stats.activeGreenhouses}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Temperature Records</span>
          <span className="stat-value">{stats.temperatureRecords}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Upcoming Harvests</span>
          <span className="stat-value">{stats.upcomingHarvests}</span>
        </div>
      </div>

      <div className="card">
        <h2>System Overview</h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
          Welcome to the Orchi-Flora Management System. This comprehensive platform helps you manage 
          all aspects of your orchid cultivation operations, from temperature monitoring to production planning.
        </p>
        
        <div style={{ marginTop: '32px' }}>
          <h3 style={{ color: 'var(--orchid-purple)', marginBottom: '16px', fontSize: '1.3em' }}>
            Quick Actions
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
            <div style={{ 
              padding: '24px', 
              background: 'var(--orchid-white)', 
              borderRadius: '16px',
              border: '2px solid rgba(155, 77, 150, 0.1)'
            }}>
              <h4 style={{ color: 'var(--orchid-dark)', marginBottom: '8px' }}>Temperature Analysis</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9em' }}>
                Monitor and analyze temperature variations for optimal orchid growth
              </p>
            </div>
            <div style={{ 
              padding: '24px', 
              background: 'var(--orchid-white)', 
              borderRadius: '16px',
              border: '2px solid rgba(155, 77, 150, 0.1)'
            }}>
              <h4 style={{ color: 'var(--orchid-dark)', marginBottom: '8px' }}>Environmental Monitoring</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9em' }}>
                Track humidity, light levels, and other environmental factors
              </p>
            </div>
            <div style={{ 
              padding: '24px', 
              background: 'var(--orchid-white)', 
              borderRadius: '16px',
              border: '2px solid rgba(155, 77, 150, 0.1)'
            }}>
              <h4 style={{ color: 'var(--orchid-dark)', marginBottom: '8px' }}>Plant Inventory</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9em' }}>
                Manage your orchid collection and track growth stages
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <h2>Recent Activity</h2>
        <div className="empty-state">
          No recent activity to display
        </div>
      </div>
    </div>
  )
}

export default Dashboard
