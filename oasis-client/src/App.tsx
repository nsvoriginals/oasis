import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import { Login } from './auth/Login/Login'

function App() {
 

  return (
  
   <div>
     <BrowserRouter>
     <Routes>
      <Route path='/' element={<Login/>}>

      </Route>
     </Routes>
     </BrowserRouter>
   </div>
  )
}

export default App
