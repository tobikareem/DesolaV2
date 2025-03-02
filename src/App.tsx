import { JSX } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Callback from './auth/Callback';
import Footer from './components/Footer';
import { Navbar } from './components/Navbar';
import { useAuth } from './hooks/useAuthInfo';
import ChatTest from './pages/ChatTestScreenPage/ChatTest';
import ForgetPassword from './pages/auth/ForgetPassword';
import NewPassword from './pages/auth/NewPassword';
import OTPVerification from './pages/auth/OTPVerification';
import SignIn from './pages/auth/SignIn';
import SignUp from './pages/auth/SignUp';
import HomeScreen from './pages/home/home';
import { AuthProvider } from './auth/AuthProvider';

type RouteType = {
  path?: string;
  element?: JSX.Element;
  name?: string;
}

// A wrapper for <Route> that redirects to the login if user is not login
const PrivateRoute: React.FC<{ element: React.ReactNode }> = ({ element }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? <>{element}</> : <Navigate to="/signin" />;
};

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
    <AuthProvider>
      <div className="app-container h-screen">
        <Navbar />
        <main>
          <Routes>

            {/* Public Routes */}
            {routes.map((route) => (
              <Route key={route.name} path={route.path} element={route.element} />
            ))}


            {/* Protected Route: Only accessible if authenticated */}
            <Route path="/chat" element={<PrivateRoute element={<ChatTest />} />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
