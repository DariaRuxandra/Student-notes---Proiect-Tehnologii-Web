import React, { useState } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { routes } from './routes';
import ResponsiveAppBar from './components/navbar';
import LogIn from './views/LogIn';

function App() {

  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    setLoggedIn(true);
  };

  return (
    <div className="App">

    <ResponsiveAppBar />
    
        <Routes>
          {routes
            // .filter((route) => route.private) 
            .map((r, index) => (
              <Route key={index} path={r.path} element={<r.component />} />
            ))}
        </Routes>

  </div>
  );
}

export default App;
