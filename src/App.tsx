
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Navbar } from './components/navbar'
import HomeScreen from './pages/home/home'
import { APP_NAME } from './utils/constants'
import Auth from './pages/auth/auth'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeScreen />}/>
        <Route path="/auth" element={<Auth />}/>
      </Routes>
    </BrowserRouter>
    // <div className="app-container">
    //   <header className="app-header">
    //     <h1>{ APP_NAME }</h1>
    //   </header>

    // </div>
  )
}

export default App
