import { useState } from 'react'
import './App.css'
import Dashboard from './components/Dashboard'
import TemperatureModule from './components/TemperatureModule'
import EnvironmentalMonitoring from './components/EnvironmentalMonitoring'
import PlantInventory from './components/PlantInventory'
import ProductionPlanning from './components/ProductionPlanning'
import { 
  MdDashboard, 
  MdThermostat, 
  MdCloud, 
  MdInventory, 
  MdBarChart,
  MdSettings,
  MdLogout,
  MdSearch,
  MdNotifications
} from 'react-icons/md'
import { GiFlowerPot } from 'react-icons/gi'

function App() {
  const [activeTab, setActiveTab] = useState('dashboard')

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />
      case 'temperature':
        return <TemperatureModule />
      case 'environmental':
        return <EnvironmentalMonitoring />
      case 'inventory':
        return <PlantInventory />
      case 'production':
        return <ProductionPlanning />
      default:
        return <Dashboard />
    }
  }

  return (
    <div className="app-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo-container">
          <GiFlowerPot style={{ fontSize: '28px', color: 'white' }} />
        </div>
        
        <nav className="sidebar-nav">
          <button
            className={`sidebar-item ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
            title="Dashboard"
          >
            <MdDashboard size={24} />
          </button>
          <button
            className={`sidebar-item ${activeTab === 'temperature' ? 'active' : ''}`}
            onClick={() => setActiveTab('temperature')}
            title="Temperature"
          >
            <MdThermostat size={24} />
          </button>
          <button
            className={`sidebar-item ${activeTab === 'environmental' ? 'active' : ''}`}
            onClick={() => setActiveTab('environmental')}
            title="Environmental"
          >
            <MdCloud size={24} />
          </button>
          <button
            className={`sidebar-item ${activeTab === 'inventory' ? 'active' : ''}`}
            onClick={() => setActiveTab('inventory')}
            title="Inventory"
          >
            <MdInventory size={24} />
          </button>
          <button
            className={`sidebar-item ${activeTab === 'production' ? 'active' : ''}`}
            onClick={() => setActiveTab('production')}
            title="Production"
          >
            <MdBarChart size={24} />
          </button>
        </nav>

        <div className="sidebar-bottom">
          <button className="sidebar-item" title="Settings">
            <MdSettings size={24} />
          </button>
          <button className="sidebar-item" title="Logout">
            <MdLogout size={24} />
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Top Bar */}
        <div className="top-bar">
          <div className="brand-title">
            <GiFlowerPot style={{ fontSize: '32px', color: 'var(--orchid-purple)' }} />
            Orchi-Flora
          </div>
          
          <div className="search-bar">
            <MdSearch className="search-icon" size={20} />
            <input 
              type="text" 
              className="search-input" 
              placeholder="Search anything here..."
            />
          </div>

          <div className="top-bar-actions">
            <button className="icon-btn">
              <MdNotifications size={20} />
            </button>
            <button className="icon-btn">
              <MdSettings size={20} />
            </button>
            <div className="user-avatar">A</div>
          </div>
        </div>

        {/* Content */}
        {renderContent()}
      </main>
    </div>
  )
}

export default App
