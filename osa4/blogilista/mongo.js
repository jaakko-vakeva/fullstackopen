const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://jaakko:${password}@cluster1.js72j.mongodb.net/blog-app-test?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
})

const Blog = mongoose.model('Blog', blogSchema)

const blog = new Blog({
  title: '12 Rules for Life',
  author: 'Jordan Peterson',
  url: 'youtube.com',
  likes: 17
})

blog.save().then(response => {
  console.log('blog saved!')
  mongoose.connection.close()
})