// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Login from './conponents/Wellcome/login';
import Registration from './conponents/Wellcome/registration';
import Dashboard from './conponents/Dashboard/dashboard';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
