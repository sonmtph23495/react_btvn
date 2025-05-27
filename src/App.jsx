// import { useState } from 'react'
// import { students } from './dataStudents.js'
import 'react-toastify/dist/ReactToastify.css';
import Task45 from './component/task45'
import HomePage from './page/HomePage';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css'
import Router from './router/router'
import Task44 from './component/Task44';
import Task46 from './component/Task46';
import Task47 from './component/Task47';
import { ToastContainer } from 'react-toastify';

function App() {

  return (
  <>

  <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/task44" element={<Task44 />} />
      <Route path="/task45" element={<Task45 />} />
      <Route path="/task46" element={<Task46 />} />
      <Route path="/task47" element={<Task47 />} />
      {/* Add more routes as needed */}
      
      </Routes>
      </BrowserRouter>
       <ToastContainer/>

  </>

  )
}

export default App
