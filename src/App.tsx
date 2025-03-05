import { AuthenticatedTemplate } from '@azure/msal-react';
import { JSX } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import { msalInstance } from './auth/msalConfig';
import Footer from './components/Footer';
import { Navbar } from './components/Navbar';
import ForgetPassword from './pages/auth/ForgetPassword';
import Verify from './pages/auth/verify';
import Dashboard from './pages/dashboard/dashboard';
import Error404Page from './pages/error/404';
import HomeScreen from './pages/home/home';

type RouteType = {
  path?: string;
  element?: JSX.Element;
  name?: string;
}

function App() {
  const publicRoutes: RouteType[] = [
    { path: '/', element: <HomeScreen />, name: 'Home' },
    { path: '/reset', element: <ForgetPassword />, name: 'Forget Password' },
    { path: '/verify', element: <Verify />, name: 'Verify' },
    { path: '*', element: <Error404Page />, name: 'Error404' },
  ];

  const privateRoutes: RouteType[] = [
    { path: '/dashboard', element: <Dashboard />, name: 'Dashboard' },
  ];

  return (
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
  );
}

export default App;
