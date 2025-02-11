
import './App.css'
import Footer from './Components/Footer'
import HomeScreen from './pages/home/home'
import { APP_NAME } from './utils/constants'

function App() {

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>{ APP_NAME }</h1>
      </header>

      <HomeScreen />
      <Footer />
    </div>
  )
}

export default App
