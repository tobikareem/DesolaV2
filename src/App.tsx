import { AuthenticatedTemplate } from '@azure/msal-react';
import { JSX } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Callback from './auth/Callback';
import { msalInstance } from './auth/msalConfig';
import Footer from './components/Footer';
import { Navbar } from './components/Navbar';
import ChatTest from './pages/ChatTestScreenPage/ChatTest';
import ForgetPassword from './pages/auth/ForgetPassword';
import NewPassword from './pages/auth/NewPassword';
import OTPVerification from './pages/auth/OTPVerification';
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
    { path: '/verify', element: <OTPVerification />, name: 'Verify' },
    { path: '/password-reset', element: <NewPassword />, name: 'PasswordReset' },
    { path: '/callback', element: <Callback />, name: 'Callback' }
  ];

  const privateRoutes: RouteType[] = [
    { path: '/chat', element: <ChatTest />, name: 'Chat' },
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