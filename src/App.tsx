<<<<<<< HEAD
import { JSX, useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
=======
import { AuthenticatedTemplate } from '@azure/msal-react';
import { JSX } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
>>>>>>> 7ed6f2a495abb8c89efa12d37d8a345d6fa754a9
import './App.css';
import { msalInstance } from './auth/msalConfig';
import Footer from './components/Footer';
import { Navbar } from './components/Navbar';
import ForgetPassword from './pages/auth/ForgetPassword';
import Verify from './pages/auth/verify';
import Dashboard from './pages/dashboard/dashboard';
<<<<<<< HEAD
import Error404Page from './pages/error/Error404';
import { Preloader } from './components/Preloader';
import { GlobalProvider } from './hooks/contextProvider';
=======
import Error404Page from './pages/error/404';
import HomeScreen from './pages/home/home';
>>>>>>> 7ed6f2a495abb8c89efa12d37d8a345d6fa754a9

type RouteType = {
  path?: string;
  element?: JSX.Element;
  name?: string;
}

function App() {
<<<<<<< HEAD
  const router = useLocation();
  
  
  const routes: RouteType[] = [
=======
  const publicRoutes: RouteType[] = [
>>>>>>> 7ed6f2a495abb8c89efa12d37d8a345d6fa754a9
    { path: '/', element: <HomeScreen />, name: 'Home' },
    { path: '/reset', element: <ForgetPassword />, name: 'Forget Password' },
    { path: '/verify', element: <Verify />, name: 'Verify' },
    { path: '*', element: <Error404Page />, name: 'Error404' },
  ];

  const privateRoutes: RouteType[] = [
    { path: '/dashboard', element: <Dashboard />, name: 'Dashboard' },
<<<<<<< HEAD
    {path:'*', element:<Error404Page/>},
=======
>>>>>>> 7ed6f2a495abb8c89efa12d37d8a345d6fa754a9
  ];

  const [showPreloader, setShowPreloader] = useState<string>('');

  
  useEffect((): (() => void) => {

    const handlePreloaderFn =()=> {
      setShowPreloader('hidden')
    }

    if (router.pathname !== '/' ) {
      handlePreloaderFn()
    }

    const time: number = 3200;

    const firstTimeLoad = sessionStorage.getItem('Load') === 'true'; 

    if(firstTimeLoad){
      handlePreloaderFn()
    } 
      const timer: NodeJS.Timeout = setTimeout((): void => {
        sessionStorage.setItem('Load','true')
        handlePreloaderFn()
      },time )
    

    return (): void => {
      clearTimeout(timer)
    }
  },[router.pathname])


  return (
<<<<<<< HEAD
    <>
      <GlobalProvider>
        <Preloader visibility={showPreloader}/>
        <Navbar />
        <main className="">
          <Routes>
            {routes.map((route) => (
              <Route key={route.name} path={route.path} element={route.element} />
            ))}
          </Routes>
        </main>
        <Footer />
      </GlobalProvider>
    </>
=======
    <div className="app-container h-screen">
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
                msalInstance.getActiveAccount() ? (
                  <AuthenticatedTemplate>
                    {route.element}
                  </AuthenticatedTemplate>
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
    </div>
>>>>>>> 7ed6f2a495abb8c89efa12d37d8a345d6fa754a9
  );
}

export default App;
