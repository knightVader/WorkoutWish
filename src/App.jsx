import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import ApiKeyNotification from './components/ApiKeyNotification'
import Home from './pages/Home'
import HealthAssessment from './pages/HealthAssessment'
import DishGenerator from './pages/DishGenerator'
import Plans from './pages/Plans'
import './App.css'

function App() {
  return (
    <div className="App">
      <Navbar />
      <ApiKeyNotification />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/health-assessment" element={<HealthAssessment />} />
          <Route path="/dish-generator" element={<DishGenerator />} />
          <Route path="/plans" element={<Plans />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
