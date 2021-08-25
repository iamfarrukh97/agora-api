const express = require('express')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(
  cors({
    origin: '*'
  })
)
const tourRouter = require('./routes/tourRoutes')

app.use('/api/v1/tours', tourRouter)

module.exports = app
