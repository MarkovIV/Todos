const express = require('express')
const {
  getTodos,
  addTodo,
  getTodo, 
  deleteTodo,
  editTodo,
} = require('../controllers/api-todo-controller')

const router = express.Router()

// Get All Todos
router.get('/api/todos', getTodos)
// Add New Todo
router.post('/api/todo', addTodo)
// Get Todo by ID
router.get('/api/todo/:id', getTodo)
// Delete Todo by ID
router.delete('/api/todo/:id', deleteTodo)
// Update Todo by ID
router.put('/api/todo/:id', editTodo)

module.exports = router
