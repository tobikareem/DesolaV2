import { AuthenticatedTemplate } from '@azure/msal-react';
import { JSX, useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Flip, ToastContainer } from 'react-toastify';
import './App.css';
import AuthEventListener from './auth/auth-event-listener';
import Callback from './auth/Callback';
import Footer from './components/layout/Footer';
import { Navbar } from './components/layout/Navbar';
import { Preloader } from './components/layout/Preloader';
import { AppProvider } from './providers/AppProvider';
import ForgetPassword from './pages/auth/ForgetPassword';
import RedirectToLogin from './pages/auth/RedirectToLogin';
import Verify from './pages/auth/verify';
import Dashboard from './pages/dashboard/chats/Dashboard';
import Error404Page from './pages/error/Error404';
import HomeScreen from './pages/home/home';
import PrivacyPolicy from './pages/legal/PrivacyPolicy';
import TermsAndConditions from './pages/legal/TermsAndConditions';
import authService from './services/authService';
import { CustomStorage } from './utils/customStorage';


const storage = new CustomStorage();

type RouteType = {
  path?: string;
  element?: JSX.Element;
  name?: string;
}

function App() {
  const router = useLocation();
  const [showPreloader, setShowPreloader] = useState<string>('');
  const [authChecking, setAuthChecking] = useState(true);


  const publicRoutes: RouteType[] = [
    { path: '/', element: <HomeScreen />, name: 'Home' },
    { path: '/reset', element: <ForgetPassword />, name: 'Forget Password' },
    { path: '/verify', element: <Verify />, name: 'Verify' },
    { path: '/test', element: <Dashboard />, name: 'Test' },
    { path: '/privacy', element: <PrivacyPolicy />, name: 'Privacy' },
    { path: '/terms', element: <TermsAndConditions />, name: 'Terms' },
    { path: '/callback', element: <Callback />, name: 'Callback' },
    { path: '*', element: <Error404Page />, name: 'Error404' },
  ];
  const privateRoutes: RouteType[] = [
    { path: '/dashboard', element: <Dashboard />, name: 'Dashboard' },
  ];

  // Use mock account in development mode, otherwise use authService
  // const MockAccount = {
  //   username: 'mocktest ',
  //   homeaccountId: 'Desola@example.com',
  //   localaccountId: 'Desola',
  // }

  // const activeAccount = import.meta.env.MODE ? MockAccount : authService.getCurrentAccount();
  const activeAccount = authService.getCurrentAccount();

  useEffect(() => {
    const checkAuth = async () => {
      // If we're in dev mode with mock account, skip the real auth check
      // if (import.meta.env.MODE) {
      //   setAuthChecking(false);
      //   return;
      // }

      try {
        await authService.getToken();
      } catch (error) {
        console.error("Auth check error:", error);
      } finally {
        setAuthChecking(false);
      }
    };

    checkAuth();
  }, []);

  useEffect(() => {
    const handlePreloaderFn = () => setShowPreloader('hidden');

    if (!['/', '/dashboard'].includes(router.pathname)) {
      handlePreloaderFn();
    }

    const time = 3200;
    const firstTimeLoad = storage.getItem('Load') === 'true';

    if (firstTimeLoad && router.pathname == '/test') {
      setTimeout(handlePreloaderFn, 500)
    } else if (firstTimeLoad) {
      handlePreloaderFn()
    }

    const timer = setTimeout(() => {
      storage.setItem('Load', 'true');
      handlePreloaderFn();
    }, time);

    return () => clearTimeout(timer);
  }, [router.pathname]);

  if (authChecking) {
    return <Preloader visibility="" />;
  }

  return (
    <AppProvider>
      <AuthEventListener />
      <Preloader visibility={showPreloader} />
      <Navbar />
      <main>
        <ToastContainer position='top-right' closeOnClick theme='colored' 
          pauseOnHover newestOnTop autoClose={3000} transition={Flip}
         />
        <Routes>
          {publicRoutes.map((route) => (
            <Route key={route.name} path={route.path} element={route.element} />
          ))}

          {privateRoutes.map((route) => (
            <Route
              key={route.name}
              path={route.path}
              element={
                activeAccount ? (
                  <AuthenticatedTemplate>{route.element}</AuthenticatedTemplate>
                ) : (
                  <RedirectToLogin />
                )
              }
            />
          ))}
        </Routes>
      </main>
      <Footer />
    </AppProvider>
  );
}

export default App;