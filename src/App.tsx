// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/Wellcome/login';
import Registration from './pages/Wellcome/registration';
import Home from './pages/Dashboard/Home/home';
import Profile from './pages/Dashboard/Profile/profile';
import Plan from './pages/Dashboard/Plans/plans';
import Settings from './pages/Dashboard/Settings/settings';
import Notes from './pages/Dashboard/Notes/notes';
import Schedule from './pages/Dashboard/Schedule/schedule';
function App() {

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/dashboard/home" element={<Home />} />
          <Route path="/dashboard/profile" element={<Profile />} />
          <Route path="/dashboard/plans" element={<Plan />} />
          <Route path="/dashboard/settings" element={<Settings />} />
          <Route path="/dashboard/notes" element={<Notes />} />
          <Route path="/dashboard/schedule" element={<Schedule />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
