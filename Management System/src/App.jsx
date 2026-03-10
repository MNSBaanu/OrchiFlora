import { useState } from 'react'
import './App.css'
import Dashboard from './components/Dashboard'
import TemperatureModule from './components/TemperatureModule'
import EnvironmentalMonitoring from './components/EnvironmentalMonitoring'
import PlantInventory from './components/PlantInventory'
import ProductionPlanning from './components/ProductionPlanning'

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
      <header className="app-header">
        <h1>Orchi-Flora Management System</h1>
        <p>Comprehensive Orchid Farm Management & Analysis Platform</p>
      </header>

      <nav className="nav-tabs">
        <button
          className={`nav-tab ${activeTab === 'dashboard' ? 'active' : ''}`}
          onClick={() => setActiveTab('dashboard')}
        >
          Dashboard
        </button>
        <button
          className={`nav-tab ${activeTab === 'temperature' ? 'active' : ''}`}
          onClick={() => setActiveTab('temperature')}
        >
          Temperature Analysis
        </button>
        <button
          className={`nav-tab ${activeTab === 'environmental' ? 'active' : ''}`}
          onClick={() => setActiveTab('environmental')}
        >
          Environmental
        </button>
        <button
          className={`nav-tab ${activeTab === 'inventory' ? 'active' : ''}`}
          onClick={() => setActiveTab('inventory')}
        >
          Plant Inventory
        </button>
        <button
          className={`nav-tab ${activeTab === 'production' ? 'active' : ''}`}
          onClick={() => setActiveTab('production')}
        >
          Production
        </button>
      </nav>

      <main>
        {renderContent()}
      </main>
    </div>
  )
}

export default App
