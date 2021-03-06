const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')

const user = new User({
  "username": "jaakko",
  "name": "Jaakko",
  "password": "vakeva"
})

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(helper.initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(helper.initialBlogs[1])
  await blogObject.save()
  blogObject = new Blog(helper.initialBlogs[2])
  await blogObject.save()
  blogObject = new Blog(helper.initialBlogs[3])
  await blogObject.save()

  await User.deleteMany({})
  await api 
    .post('/api/users')
    .send({
      username: "jaakko",
      name: "Jaakko",
      password: "vakeva"
    })

  await api 
    .post('/api/users')
    .send({
      username: "jordan",
      name: "Jordan Peterson",
      password: "peterson"
    })


})

test('returns blogs in json', async () => {
  await api
  .get('/api/blogs')
  .expect(200)
  .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('returned blogs have an identification field called id', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body[0]).toBeDefined()
})


test('a valid blog can be added', async () => {

  
  const res = await api
    .post('/api/login')
    .send({
      username: 'jaakko',
      password: 'vakeva'
    })

  let token = res.body.token

  const newBlog = {
    title: 'This is a test blog by jaakko',
    url: 'http://www.google.com',
    likes: 4,
  }

  await api
    .post('/api/blogs')
    .set('Authorization', `bearer ${token}`)
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

})


test('if likes field is not given a value it is set to zero', async () => {
  const newBlog = {
    title: 'No likes field here',
    url: 'http://www.google.com',
  }

  const res = await api
    .post('/api/login')
    .send({
      username: 'jaakko',
      password: 'vakeva'
    })

  let token = res.body.token

  await api
    .post('/api/blogs')
    .send(newBlog)
    .set('Authorization', `bearer ${token}`)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  expect(response.body[helper.initialBlogs.length].likes).toEqual(0)
})

test('if title or author is empty return 400 bad request', async () => {
  const newBlog = {
    url: 'http://www.google.com',
    likes: 5
  }

  const res = await api
    .post('/api/login')
    .send({
      username: 'jaakko',
      password: 'vakeva'
    })

  let token = res.body.token

  await api
    .post('/api/blogs')
    .set('Authorization', `bearer ${token}`)
    .send(newBlog)
    .expect(400)

})

test ('if there is not a token in the request return 401 unauthorized', async () => {
  const newBlog = {
    title: 'This is a test blog by jaakko',
    url: 'http://www.google.com',
    likes: 4,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(401)
    .expect('Content-Type', /application\/json/)

})



afterAll(() => {
  mongoose.connection.close()
})