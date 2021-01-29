const http = require('http')
const express = require('express')
const app = express()

const config = require('./utils/config')
const logger = require('./utils/logger')

const cors = require('cors')

app.use(express.json())

const Blog = require('./models/blog')

const blogsRouter = require('./controllers/blogs')

app.use('/api/blogs', blogsRouter)

app.use(cors())



const PORT = 3003
app.listen(PORT, () => {
  logger.info(`Server running on port ${config.PORT} url: ${config.MONGODB_URI}`)
})