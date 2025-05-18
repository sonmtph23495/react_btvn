// import { useState } from 'react'
// import { students } from './dataStudents.js'
import Task45 from './component/task45'

import './App.css'

function App() {
  // const [searchTerm, setSearchTerm] = useState('')
  // const [filterAverage, setFilterAverage] = useState('all')
  // const [filterGrade, setFilterGrade] = useState('all')

  // const handleChange = (e) => {
  //   setSearchTerm(e.target.value.toLowerCase())
  // }

  // const getAverage = (student) =>
  //   (student.math + student.literature + student.english) / 3

  // const getGrade = (avg) => {
  //   if (avg >= 8) return 'Giỏi'
  //   else if (avg >= 6.5) return 'Khá'
  //   else if (avg >= 5) return 'Trung Bình'
  //   else return 'Yếu'
  // }

  // const filteredStudents = students.filter((student) => {
  //   const nameMatch = student.name.toLowerCase().includes(searchTerm)
  //   const average = getAverage(student)
  //   const grade = getGrade(average)

  //   const averageMatch =
  //     filterAverage === 'all' ||
  //     (filterAverage === '>=8' && average >= 8) ||
  //     (filterAverage === '6.5-8' && average >= 6.5 && average < 8) ||
  //     (filterAverage === '5-6.5' && average >= 5 && average < 6.5) ||
  //     (filterAverage === '<5' && average < 5)

  //   const gradeMatch = filterGrade === 'all' || grade === filterGrade

  //   return nameMatch && averageMatch && gradeMatch
  // })
  return (
  <>
<div>
  <Task45 />
</div>
  </>
    // <div className="App">
    //   <h1>Danh sách sinh viên</h1>

    //   <div style={{ marginBottom: '10px' }}>
    //     <input
    //       type="text"
    //       onChange={handleChange}
    //       placeholder="Nhập tên sinh viên"
    //     />

    //     <select onChange={(e) => setFilterAverage(e.target.value)}>
    //       <option value="all">Tất cả điểm TB</option>
    //       <option value=">=8">Điểm TB ≥ 8</option>
    //       <option value="6.5-8">6.5 ≤ Điểm TB &lt; 8</option>
    //       <option value="5-6.5">5 ≤ Điểm TB &lt; 6.5</option>
    //       <option value="<5">Điểm TB &lt; 5</option>
    //     </select>

    //     <select onChange={(e) => setFilterGrade(e.target.value)}>
    //       <option value="all">Tất cả học lực</option>
    //       <option value="Giỏi">Giỏi</option>
    //       <option value="Khá">Khá</option>
    //       <option value="Trung Bình">Trung Bình</option>
    //       <option value="Yếu">Yếu</option>
    //     </select>
    //   </div>

    //   <table>
    //     <thead>
    //       <tr>
    //         <th>ID</th>
    //         <th>Tên</th>
    //         <th>Toán</th>
    //         <th>Văn</th>
    //         <th>Tiếng Anh</th>
    //         <th>Điểm TB</th>
    //         <th>Học Lực</th>
    //       </tr>
    //     </thead>
    //     <tbody>
    //       {filteredStudents.map((student) => {
    //         const avg = getAverage(student).toFixed(2)
    //         const grade = getGrade(avg)
    //         return (
    //           <tr key={student.id}>
    //             <td>{student.id}</td>
    //             <td>{student.name}</td>
    //             <td>{student.math}</td>
    //             <td>{student.literature}</td>
    //             <td>{student.english}</td>
    //             <td>{avg}</td>
    //             <td>{grade}</td>
    //           </tr>
    //         )
    //       })}
    //     </tbody>
    //   </table>
    // </div>
  )
}

export default App
