

import './App.css'
import HomeScreen from './pages/home/home'
import { APP_NAME } from './utils/constants'

function App() {

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>{ APP_NAME }</h1>
      </header>

      <HomeScreen />

    </div>
  )
}

export default App
