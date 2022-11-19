const express = require('express')
const chalk = require('chalk')
const morgan = require('morgan')
const mongoose = require('mongoose')
require('dotenv').config()
const methodOverride = require('method-override')
const todoApiRoutes = require('./routes/api-todo-routes')
const createPath = require('./helpers/create-path')
const cors = require('cors')

const errorMsg = chalk.bgKeyword('white').redBright
const successMsg = chalk.bgKeyword('green').white

const app = express()

mongoose
  .connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((res) => console.log(successMsg('Connected to DB')))
  .catch((error) => console.log(errorMsg(error)))

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))
app.use(methodOverride('_method'))

app.use(todoApiRoutes)

app.get('/', (req, res) => {
  res.sendFile(createPath('index'))
})

app.get('**', (req, res) => {
  res.sendFile(createPath('error'))
})

app.listen(process.env.PORT, (error) => {
  error ? console.log(errorMsg(error)) : console.log(successMsg(`Listening port ${process.env.PORT}`))
})