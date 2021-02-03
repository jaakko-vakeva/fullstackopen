const Blog = require('../models/blog')
const User = require('../models/user')

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

const nonExistingId = async () => {
    const blog = new Blog({ 
        title: 'willremovethissoon', 
        author: 'Will Remove',
        url: 'www.ilta-sanomat.fi',
        likes: 5 
    })
    await blog.save()
    await blog.remove()
  
    return blog._id.toString()
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
  }



module.exports = {
    initialBlogs, nonExistingId, blogsInDb, usersInDb
}

