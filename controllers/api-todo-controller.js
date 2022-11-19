const Todo = require('../models/todo')

const handleError = (res, error) => {
  res.status(500).send(error.message)
}

const getTodos = (req, res) => {
  Todo
    .find()
    .sort({ createdAt: -1 })
    .then((todos) => res.status(200).json(todos))
    .catch((error) => handleError(res, error))
}

const addTodo = (req, res) => {
  const { title, completed, deleted } = req.body
  const todo = new Todo({ title, completed, deleted })
  todo
    .save()
    .then((todoItem) => res.status(200).json(todoItem))
    .catch((error) => handleError(res, error))
}

const getTodo = (req, res) => {
  Todo
    .findById(req.params.id)
    .then((todoItem) => res.status(200).json(todoItem))
    .catch((error) => handleError(res, error))
}

const deleteTodo = (req, res) => {
  const { id } = req.params
  Todo
  .findByIdAndDelete(id)
  .then((todo) => res.status(200).json(id))
  .catch((error) => handleError(res, error))
}

const editTodo = (req, res) => {
  const { title, completed, deleted } = req.body
  const { id } = req.params
  Todo
    .findByIdAndUpdate(id, { title, completed, deleted }, { new: true })
    .then((todo) => res.json(todo))
    .catch((error) => handleError(res, error))
}

module.exports = {
  getTodos,
  addTodo,
  getTodo, 
  deleteTodo,
  editTodo,
}
