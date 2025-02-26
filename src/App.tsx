import { JSX } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Callback from './auth/Callback';
import Footer from './components/Footer';
import { Navbar } from './components/Navbar';
import ForgetPassword from './pages/auth/ForgetPassword';
import SignIn from './pages/auth/signin';
import SignUp from './pages/auth/signup';
import HomeScreen from './pages/home/home';
import Verify from './pages/auth/verify';
import Dashboard from './pages/dashboard/dashboard';
import Error404Page from './pages/error/Error404';

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
    { path: '/verify', element: <Verify />, name: 'Verify' },
    { path: '/callback', element: <Callback />, name: 'Callback' },
    { path: '/dashboard', element: <Dashboard />, name: 'Dashboard' },
    {path:'*', element:<Error404Page/>}
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
