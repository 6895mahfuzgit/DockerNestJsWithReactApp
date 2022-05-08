import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Users from './pages/Users';
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';
import Login from './pages/Login';

function App() {
  return (
    <div className="App">
      <BrowserRouter>

        <Routes>
          <Route path={'/'} element={<Dashboard />} />
          <Route path={'/users'} element={<Users />} />
          <Route path={'/register'} element={<Register />} />
          <Route path={'/login'} element={<Login />} />
        </Routes>

        
      </BrowserRouter>
    </div>
  );
}

export default App;