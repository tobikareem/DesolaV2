import { JSX } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Callback from './auth/Callback';
import Footer from './components/Footer';
import { Navbar } from './components/Navbar';
import ForgetPassword from './pages/auth/ForgetPassword';
import NewPassword from './pages/auth/NewPassword';
import OTPVerification from './pages/auth/OTPVerification';
import SignIn from './pages/auth/signin';
import SignUp from './pages/auth/signup';
import HomeScreen from './pages/home/home';

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
    { path: '/reset', element: <ForgetPassword />, name: 'Forget Password' },
    { path: '/verify', element: <OTPVerification />, name: 'Verify' },
    { path: '/password-reset', element: <NewPassword />, name: 'PasswordReset' },
    { path: '/callback', element: <Callback />, name: 'Callback' }
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
      <Footer />
    </div>

  );
}

export default App;
