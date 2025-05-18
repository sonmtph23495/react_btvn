// import { useState } from 'react'
// import { students } from './dataStudents.js'
import Task45 from './component/task45'
import HomePage from './page/HomePage';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css'
import Router from './router/router'
import Task44 from './component/Task44';

function App() {

  return (
  <>

  <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/task44" element={<Task44 />} />
      <Route path="/task45" element={<Task45 />} />
      
      </Routes>
      </BrowserRouter>

  </>

  )
}

export default App
