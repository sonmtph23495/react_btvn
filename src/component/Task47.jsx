import React, { useEffect, useState } from 'react'
import { createProduct, deleteProduct, getProducts, updateProduct } from '../api'
import AddProductModal from '../model/AddProductModal'
import { toast } from 'react-toastify'

const Task47 = () => {
  const [todos, setTodos] = useState([])
  const [editId, setEditId] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterPriority, setFilterPriority] = useState('')
  const [sortField, setSortField] = useState('')
  const [sortOrder, setSortOrder] = useState('asc')
  const [page, setPage] = useState(1)
  const [limit] = useState(5)

  const fetchTodos = async () => {
    try {
      const res = await getProducts()
      setTodos(res)
    } catch (error) {
      console.error('Error fetching todos:', error)
    }
  }

  useEffect(() => {
    fetchTodos()
  }, [])

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this todo?')) return
    try {
      await deleteProduct(id)
      setTodos(todos.filter((todo) => todo.id !== id))
      toast.success('xóa todo thành công')
    } catch (error) {
      console.error('Error deleting todo:', error)
    }
  }

  const handleEdit = (id) => {
    setEditId(id)
    setShowModal(true)
  }

  const handleCompleteToggle = async (todo) => {
    try {
      const updatedTodo = { ...todo, completed: !todo.completed }
      await updateProduct(todo.id, updatedTodo)
      setTodos(
        todos.map((t) => (t.id === todo.id ? updatedTodo : t))
      )
      toast.success(
        `Todo marked as ${updatedTodo.completed ? 'completed' : 'incomplete'}`
      )
    } catch (error) {
      console.error('Error toggling todo completion:', error)
    }
  }

  const handleAddOrUpdateTodo = async (todo) => {
    try {
      if (editId) {
        const updated = await updateProduct(editId, todo)
        setTodos(todos.map((t) => (t.id === editId ? updated : t)))
        toast.success('Cập nhật todo thành công')
        setEditId(null)
      } else {
        const newTodo = {
          ...todo,
          createdAt: new Date().toISOString(),
          completed: todo.completed || false,
        }
        const created = await createProduct(newTodo)
        setTodos([...todos, created])
        toast.success('Thêm todo thành công')
      }
      setShowModal(false)
    } catch (error) {
      console.error('Error adding/updating todo:', error)
    }
  }

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
    setPage(1)
  }

  const handleFilterChange = (e) => {
    setFilterPriority(e.target.value)
    setPage(1)
  }

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortOrder('asc')
    }
  }

  const filteredTodos = todos
    .filter((todo) =>
      todo.title && todo.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((todo) =>
      filterPriority ? todo.priority === filterPriority : true
    )
    .sort((a, b) => {
      if (!sortField) return 0
      let aField = a[sortField]
      let bField = b[sortField]
      if (sortField === 'createdAt') {
        aField = new Date(aField)
        bField = new Date(bField)
      }
      if (aField < bField) return sortOrder === 'asc' ? -1 : 1
      if (aField > bField) return sortOrder === 'asc' ? 1 : -1
      return 0
    })

  const paginatedTodos = filteredTodos.slice(
    (page - 1) * limit,
    page * limit
  )

  const totalPages = Math.ceil(filteredTodos.length / limit)

  return (
    <div className="p-4">
      <div className="mb-4 flex flex-wrap gap-2 items-center">
        <button
          onClick={() => {
            setEditId(null)
            setShowModal(true)
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Add Todo
        </button>
        <input
          type="text"
          placeholder="Tìm kiếm theo tiêu đề"
          value={searchTerm}
          onChange={handleSearchChange}
          className="border border-gray-300 rounded px-2 py-1"
        />
        <select
          value={filterPriority}
          onChange={handleFilterChange}
          className="border border-gray-300 rounded px-2 py-1"
        >
          <option value="">Tất cả ưu Tiên</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <div className="flex gap-2">
          <button
            onClick={() => handleSort('title')}
            className="bg-blue-200 px-2 rounded"
          >
            Sort Title {sortField === 'title' ? (sortOrder === 'asc' ? '▲' : '▼') : ''}
          </button>
          <button
            onClick={() => handleSort('createdAt')}
            className="bg-gray-200 px-2 rounded"
          >
            Sort Date {sortField === 'createdAt' ? (sortOrder === 'asc' ? '▲' : '▼') : ''}
          </button>
          <button
            onClick={() => handleSort('priority')}
            className="bg-gray-200 px-2 rounded"
          >
            Sort Priority {sortField === 'priority' ? (sortOrder === 'asc' ? '▲' : '▼') : ''}
          </button>
        </div>
      </div>

      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead className="bg-gray-200">
          <tr>
            <th>STT</th>
            <th>Title</th>
            <th>Priority</th>
            <th>Completed</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {paginatedTodos.map((todo, index) => (
            <tr key={todo.id} className="border-b border-gray-300">
              <td>{(page - 1) * limit + index + 1}</td>
              <td>{todo.title}</td>
              <td>{todo.priority}</td>
              <td>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleCompleteToggle(todo)}
                />
              </td>
              <td>{new Date(todo.createdAt).toLocaleDateString()}</td>
              <td className="flex gap-2">
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  onClick={() => handleDelete(todo.id)}
                >
                  Delete
                </button>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  onClick={() => handleEdit(todo.id)}
                >
                  Edit
                </button>
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                  onClick={() => alert(JSON.stringify(todo, null, 2))}
                >
                  View Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4 flex justify-center gap-2">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span className="px-3 py-1 border rounded">
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
          disabled={page === totalPages}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {showModal && (
        <AddProductModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onAddProduct={handleAddOrUpdateTodo}
          editId={editId}
          todos={todos}
        />
      )}
    </div>

  )
}



export default Task47



