const http = require('http')
const express = require('express')
const app = express()
const config = require('./utils/config')
const logger = require('./utils/logger')

const cors = require('cors')


const Blog = require('./models/blog')


app.use(cors())
app.use(express.json())

app.get('/api/blogs', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

app.get('/', (request, response) => {
  logger.info("Hello world")
})


app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})

const PORT = 3003
app.listen(PORT, () => {
  logger.info(`Server running on port ${config.PORT} url: ${config.MONGODB_URI}`)
})