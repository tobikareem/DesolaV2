import { AuthenticatedTemplate } from '@azure/msal-react';
import { JSX, useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import './App.css';
import AuthEventListener from './auth/auth-event-listener';
import Footer from './components/Footer';
import { Navbar } from './components/Navbar';
import { Preloader } from './components/Preloader';
import { GlobalProvider } from './hooks/contextProvider';
import ForgetPassword from './pages/auth/ForgetPassword';
import RedirectToLogin from './pages/auth/RedirectToLogin';
import Verify from './pages/auth/verify';
import Dashboard from './pages/dashboard/dashboard';
import Error404Page from './pages/error/Error404';
import HomeScreen from './pages/home/home';
import authService from './services/authService';
import { CustomStorage } from './utils/customStorage';
import PrivacyPolicy from './pages/legal/PrivacyPolicy';
import TermsAndConditions from './pages/legal/TermsAndConditions';
import Callback from './auth/Callback';
import GuidedFlightBooking from './pages/dashboard/chat/guidedflightbooking';

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
    { path: '/guide', element: <GuidedFlightBooking />, name: 'Guide' },
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
    <GlobalProvider>
      <AuthEventListener />
      <Preloader visibility={showPreloader} />
      <Navbar />
      <main>
        <ToastContainer position='top-right' />
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
    </GlobalProvider>
  );
}

export default App;