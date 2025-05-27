
import React, { useState, useEffect } from 'react';

export default function AddProductModal({ isOpen, onClose, onAddProduct, editId, todos }) {
  const [form, setForm] = useState({
    title: '',
    priority: {
      low: 'Low',
      medium: 'Medium',
      high: 'High',
    },
     completed:  false,
    createdAt: new Date().toISOString(),

  
  });

  useEffect(() => {
    if (editId) {
      const todoToEdit = todos.find((todo) => todo.id === editId);
      if (todoToEdit) {
        setForm({
          title: todoToEdit.title || '',
          priority: todoToEdit.priority || '',
          completed: todoToEdit.completed || false,
          createdAt: todoToEdit.createdAt || new Date().toISOString(),

    
        });
      }
    } else {
      setForm({
        title: '',
        priority: '',
        completed: false,
        createdAt: new Date().toISOString(),
      });
    }
  }, [editId, todos]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddProduct(form);
    onClose();
    setForm({
      title: '',
      priority: '',
      completed: false,
      createdAt: new Date().toISOString(),
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-50">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6 space-y-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{editId ? 'Edit Product' : 'Add New Product'}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-600 text-xl font-bold"
          >
            &times;
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Product Name</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Priority</label>
            <select
              name="priority"
              value={form.priority}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            >
              <option value="">Select Priority</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Completed</label>
            <input
              type="checkbox"
              name="completed"
              checked={form.completed}
              onChange={(e) => setForm({ ...form, completed: e.target.checked })}
              className="mt-1 rounded border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
    
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-md bg-gray-300 hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
            >
              {editId ? 'Update' : 'Add'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
