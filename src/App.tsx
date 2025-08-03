import { AuthenticatedTemplate } from '@azure/msal-react';
import { JSX, lazy, Suspense, useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Flip, ToastContainer } from 'react-toastify';
import './App.css';
import AuthEventListener from './auth/auth-event-listener';
import LoadingScreen from './components/layout/LoadingScreen';
import { Navbar } from './components/layout/Navbar';
import { Preloader } from './components/layout/Preloader';
import useAuthEvents from './hooks/useAuthEvents';
import AdminDashboardScreen from './pages/admin/AdminDashboardScreen';
import { AppProvider } from './providers/AppProvider';
import authService from './services/authService';
import { CustomStorage } from './utils/customStorage';
const Footer = lazy(() => import('./components/layout/Footer'));
const ForgetPassword = lazy(() => import('./pages/auth/ForgetPassword'));
const RedirectToLogin = lazy(() => import('./pages/auth/RedirectToLogin'));
const Verify = lazy(() => import('./pages/auth/verify'));
const Dashboard = lazy(() => import('./pages/dashboard/chats/Dashboard'));
const Error404Page = lazy(() => import('./pages/error/Error404'));
const HomeScreen = lazy(() => import('./pages/home/home'));
const PrivacyPolicy = lazy(() => import('./pages/legal/PrivacyPolicy'));
const TermsAndConditions = lazy(() => import('./pages/legal/TermsAndConditions'));
const Callback = lazy(() => import('./auth/Callback'));
const Pricing = lazy(() => import('./pages/pricing/pricing'));

const storage = new CustomStorage();

type RouteType = {
  path: string;
  element: JSX.Element;
  name: string;
}

function App() {
  const router = useLocation();
  const [showPreloader, setShowPreloader] = useState<string>('');
  const [authChecking, setAuthChecking] = useState(true);
  const [isProcessingAuth, setIsProcessingAuth] = useState(false);

  useAuthEvents({
    setIsProcessingAuth,
    defaultRedirectUrl: '/dashboard'
  });

  const publicRoutes: RouteType[] = [
    { path: '/', element: <HomeScreen />, name: 'Home' },
    { path: '/reset', element: <ForgetPassword />, name: 'Forget Password' },
    { path: '/verify', element: <Verify />, name: 'Verify' },
    { path: '/test', element: <Dashboard />, name: 'Test' },
    { path: '/admin', element: <AdminDashboardScreen />, name: 'Admin' },
    { path: '/privacy', element: <PrivacyPolicy />, name: 'Privacy' },
    { path: '/terms', element: <TermsAndConditions />, name: 'Terms' },
    { path: '/callback', element: <Callback />, name: 'Callback' },
    { path: '/pricing', element: <Pricing />, name: 'Pricing' },
    { path: '*', element: <Error404Page />, name: 'Error404' },
  ];
  const privateRoutes: RouteType[] = [
    { path: '/dashboard', element: <Dashboard />, name: 'Dashboard' },
    { path: '/admin', element: <AdminDashboardScreen />, name: 'Admin' },
  ];

  const activeAccount = authService.getCurrentAccount();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await authService.initialize();
      } catch{
        setIsProcessingAuth(false);
      } finally {
        setAuthChecking(false);
      }
    };

    setTimeout(checkAuth, 50);
  }, [router.pathname]);

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

  if (authChecking || isProcessingAuth) {
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
        <Suspense fallback={<LoadingScreen message='Loading...' dimension={undefined} background={'z-[70]'} />}>
          <Routes>
            {publicRoutes.map((route) => (
              <Route
                key={route.name || route.path}
                path={route.path}
                element={route.element}
              />
            ))}

            {privateRoutes.map((route) => (
              <Route
                key={route.name || route.path}
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
        </Suspense>
      </main>
      <Suspense fallback={<div> ... </div>}>
        <Footer />
      </Suspense>
    </AppProvider>
  );
}

export default App;