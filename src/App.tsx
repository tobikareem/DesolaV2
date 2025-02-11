
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Footer from './Components/Footer'
import HomeScreen from './pages/home/home'
import SignIn from './pages/auth/signin'
import SignUp from './pages/auth/signup'
import { JSX } from 'react'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'

type RouteType = {
  path?: string;
  element?: JSX.Element;
  name?: string;


}

function App() {

  const routes: RouteType[] = [
    { path: '/', element: <HomeScreen />, name: 'Home' },
    { path: '/signin', element: <SignIn />, name: 'Sign In' },
    { path: '/signup', element: <SignUp />, name: 'Sign Up' },
  ];
  
  return (
<<<<<<< HEAD
    <div className="app-container">
      <header className="app-header">
        <h1>{ APP_NAME }</h1>
      </header>

      <HomeScreen />
      <Footer />
    </div>
=======
    <BrowserRouter>
      <Navbar/>
      <Routes>
        {
          routes?.map((route) => (
            <Route key={route?.name} path={route?.path} element={route?.element} />
          ))
        }
      </Routes>
      <Footer/>
    </BrowserRouter>
>>>>>>> dd08bedcfd0b91b8e4c506715d0b758691f871e7
  )
}

export default App
