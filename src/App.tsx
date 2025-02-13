import { Route, Routes } from 'react-router-dom';
import './App.css';
import HomeScreen from './pages/home/home';
import SignIn from './pages/auth/signin';
import SignUp from './pages/auth/signup';
import { Navbar } from './components/Navbar';
import { JSX } from 'react';

type RouteType = {
  path?: string;
  element?: JSX.Element;
  name?: string;
};

function App() {
  const routes: RouteType[] = [
    { path: '/', element: <HomeScreen />, name: 'Home' },
    { path: '/signin', element: <SignIn />, name: 'Sign In' },
    { path: '/signup', element: <SignUp />, name: 'Sign Up' },
  ];

  return (

    <div className="app-container h-screen">
      <Navbar />
      <main className="">
        <header className="app-header">{/* <h1>{ APP_NAME }</h1> */}</header>;
        <Routes>
          {routes.map((route) => (
            <Route key={route.name} path={route.path} element={route.element} />
          ))}
        </Routes>
      </main>

    </div>

  );
}

export default App;
