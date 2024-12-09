import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import LoginForm from './auth/Login/Login'
import React from 'react'
import Landing from './pages/landing/Landing'
import LoginPage from './auth/Login/Login'
import Register from './auth/Register/Register'
import Navbar from './components/Navbar'
import Room from './pages/room/Room'


function App() {
  return (
    <div>
      
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/room" element={<Room />} />
      </Routes>
    </div>
  );
}

export default App
