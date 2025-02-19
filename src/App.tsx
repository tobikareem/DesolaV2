import { Route, Routes } from 'react-router-dom';
import './App.css';
import HomeScreen from './pages/home/home';
import SignIn from './pages/auth/signin';
import SignUp from './pages/auth/signup';
import ForgetPassword from './pages/auth/ForgetPassword';
import { Navbar } from './Components/Navbar';
import { JSX } from 'react';
import Footer from './components/Footer';
import AuthCallback from './auth/AuthCallback';

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
    { path: '/callback', element: <AuthCallback />, name: 'Callback' }
  ];

  return (

    <div className="app-container h-screen">
      <Navbar />
      <main className="">
        <Routes>
          {routes.map((route) => (
            <Route key={route.name} path={route.path} element={route.element} />
          ))}
        </Routes>
      </main>
      <Footer/>
    </div>

  );
}

export default App;
