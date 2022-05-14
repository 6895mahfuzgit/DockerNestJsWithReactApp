import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Users from './pages/users/Users';
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';
import Login from './pages/Login';
import UserCreate from './pages/users/UserCreate';
import UserEdit from './pages/users/UserEdit';

function App() {
  return (
    <div className="App">
      <BrowserRouter>

        <Routes>
          <Route path={'/'} element={<Dashboard />} />
          <Route path={'/register'} element={<Register />} />
          <Route path={'/login'} element={<Login />} />
          <Route path={'/users'}  element={<Users />} />
          <Route path={'/users/create'} element={<UserCreate/>} />
          <Route path={'/users/:id/edit'} element={<UserEdit/>} />

         
        </Routes>

        
      </BrowserRouter>
    </div>
  );
}

export default App;
