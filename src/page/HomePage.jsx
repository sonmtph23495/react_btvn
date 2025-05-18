import React from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div>
        <h1>Danh Sách bài Tập </h1>
        <nav>
            <ul>
            <li>
                <Link to="/">Trang Chủ</Link>
            </li>
            <li>
                <Link to="/task44">Task 44</Link>
            </li>
            <li>
                <Link to="/task45">Task 45</Link>

            </li>
            </ul>
        </nav>
    
        <Routes>
            {/* Define your routes here */}
        </Routes>
        
    </div>
  )
}

export default HomePage