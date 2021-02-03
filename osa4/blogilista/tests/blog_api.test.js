const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const initialBlogs = [
  {
    title: "Jaakko koodaa Full Stackia",
    author: "Jaakko",
    url: "http://www.fullstackopen.com",
    like: 1,
  },
  {
    title: "12 Rules for Life",
    author: "Jordan Peterson",
    url: "http://www.youtube.com",
    like: 69,
  },
  {
    title: "Matti Nykänen söi kolme litraa mansikoita",
    author: "Mansikka Matti",
    url: "https://www.is.fi/viihde/art-2000000214135.html",
    like: 100,
  },
  {
    title: "Koirat",
    author: "Pluto",
    url: "https://wikipedia.org",
    like: 3,
  },
]
beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[2])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[3])
  await blogObject.save()
})

test('returns blogs in json', async () => {
  await api
  .get('/api/blogs')
  .expect(200)
  .expect('Content-Type', /application\/json/)
})

test('there are right amount of blogs blogs', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(initialBlogs.length)
})

test('returned blogs have an identification field called id', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body[0]).toBeDefined()
})


test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'This is a test blog',
    author: 'Tester',
    url: 'http://www.google.com',
    likes: 4,
  }

  const previousLength = initialBlogs.length

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(previousLength + 1)
})


test('if likes field is not given a value it is set to zero', async () => {
  const newBlog = {
    title: 'No likes field here',
    author: 'Zero Man',
    url: 'http://www.google.com',
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  expect(response.body[initialBlogs.length].likes).toEqual(0)
})

test('if title or author is empty return 400 bad request', async () => {
  const newBlog = {
    url: 'http://www.google.com',
    likes: 5
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

})



afterAll(() => {
  mongoose.connection.close()
})