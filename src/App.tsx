
import './App.css'
import { Navbar } from './components/Navbar'
import HomeScreen from './pages/home/home'

function App() {

  return (
    <div className="app-container">

      <header className="app-header">
          <Navbar />
      </header>

      <HomeScreen />
    </div>

  )
}

export default App
