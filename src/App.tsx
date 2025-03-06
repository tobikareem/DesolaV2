import { AuthenticatedTemplate } from '@azure/msal-react';
import { JSX, useEffect, useState } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import { msalInstance } from './auth/msalConfig';
import Footer from './components/Footer';
import { Navbar } from './components/Navbar';
import { Preloader } from './components/Preloader';
import { GlobalProvider } from './hooks/contextProvider';
import ForgetPassword from './pages/auth/ForgetPassword';
import Verify from './pages/auth/verify';
import Dashboard from './pages/dashboard/dashboard';
import Error404Page from './pages/error/Error404';
import HomeScreen from './pages/home/home';

type RouteType = {
  path?: string;
  element?: JSX.Element;
  name?: string;
}

function App() {
  const router = useLocation();

  const publicRoutes: RouteType[] = [
    { path: '/', element: <HomeScreen />, name: 'Home' },
    { path: '/reset', element: <ForgetPassword />, name: 'Forget Password' },
    { path: '/verify', element: <Verify />, name: 'Verify' },
    { path: '*', element: <Error404Page />, name: 'Error404' },
  ];

  const privateRoutes: RouteType[] = [
    { path: '/dashboard', element: <Dashboard />, name: 'Dashboard' },
  ];

  const [showPreloader, setShowPreloader] = useState<string>('');

  const MockAccount = {
    name:'',
    userId:'',
    email:'',
  }
  const ActiveAccount = import.meta.env.MODE ? MockAccount :  msalInstance.getActiveAccount()


  useEffect(() => {
    const handlePreloaderFn = () => setShowPreloader('hidden');

    if (!['/','/dashboard'].includes(router.pathname)) {
      handlePreloaderFn(); 
    }
  
    const time = 3200;
    const firstTimeLoad = sessionStorage.getItem('Load') === 'true';

    if (firstTimeLoad && router.pathname == '/test') {
      setTimeout(handlePreloaderFn,500)
    } else if (firstTimeLoad) {
      handlePreloaderFn()
    }
    const timer = setTimeout(() => {
      sessionStorage.setItem('Load', 'true');
      handlePreloaderFn();
    }, time);

    return () => clearTimeout(timer);
  }, [router.pathname]);

  return (
    <GlobalProvider>
      <Preloader visibility={showPreloader} />
      <Navbar />
      <main>
        <Routes>
          {publicRoutes.map((route) => (
            <Route key={route.name} path={route.path} element={route.element} />
          ))}

          {privateRoutes.map((route) => (
            <Route
              key={route.name}
              path={route.path}
              element={
                ActiveAccount ? (
                  <AuthenticatedTemplate>{route.element}</AuthenticatedTemplate>
                ) : (
                  // <RedirectToLogin />

                  <Navigate to="/" />
                )
              }
            />
          ))}
        </Routes>
      </main>
      <Footer />
    </GlobalProvider>
  );
}

export default App;