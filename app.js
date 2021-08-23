const express = require('express')

const app = express()
app.use(express.json())

const tourRouter = require('./routes/tourRoutes')

app.use('/api/v1/tours', tourRouter)

module.exports = app
