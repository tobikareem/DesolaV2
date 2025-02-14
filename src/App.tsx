
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
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
  )
}

export default App
