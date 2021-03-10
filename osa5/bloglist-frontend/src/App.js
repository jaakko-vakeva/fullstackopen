import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'


const Notification = ({ message, type }) => {
  if (message === null) {
    return null
  }

  return (
    <div className={type}>
      {message}
    </div>
  )
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newTitle, setNewTitle] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [alertMessage, setAlertMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])


  const handleTitleChange = (event) => {
    console.log(event.target.value)
    setNewTitle(event.target.value)
  }

  const handleUrlChange = (event) => {
    console.log(event.target.value)
    setNewUrl(event.target.value)
  }

  const handleAuthorChange = (event) => {
    console.log(event.target.value)
    setNewAuthor(event.target.value)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)

  try {
    const user = await loginService.login({
      username, password
    })

    window.localStorage.setItem(
      'loggedBlogappUser', JSON.stringify(user)
    )


    blogService.setToken(user.token)
    setUser(user)
    setUsername('')
    setPassword('')
    setAlertMessage('login succesful')
    setTimeout(() => {
      setAlertMessage(null)
    }, 5000)

  } catch (expection) {
    setErrorMessage('wrong username or password')
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }
}

const handleLogout = async (event) => {
  console.log('logging out')
  window.localStorage.removeItem('loggedBlogappUser')
  setUser(null)
  setUsername('')
  setPassword('')
  setAlertMessage('logout succesful')
    setTimeout(() => {
      setAlertMessage(null)
    }, 5000)

}

const addBlog = (event) => {
  event.preventDefault()
  const blogObject = {
    title: newTitle,
    author: newAuthor,
    url: newUrl
  }

  blogService
    .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setNewTitle('')
        setNewUrl('')
        setNewAuthor('')
      })

      setAlertMessage(
        `a new blog ${blogObject.title} by ${blogObject.author} added`
      )
      setTimeout(() => {
        setAlertMessage(null)
      }, 5000)
}

const loginForm = () => (
  <form onSubmit = {handleLogin}>
    <h2>log in to application</h2>
    <div>
      username 
      <input
        type="text"
        value={username}
        name="Username"
        onChange={({ target }) => setUsername(target.value)}
      />
    </div>
    <div>
      password 
      <input
        type="password"
        value={password}
        name="Password"
        onChange={({ target }) => setPassword(target.value)}
      />
    </div>
    <button type="submit">login</button>
  </form>
)

const blogList = () => (
  <div>
    <h1>blogs</h1>

    <p>{user.name} logged in <button onClick={handleLogout}>logout</button> </p>

    <form onSubmit={addBlog}>
      <h2>create new</h2>
      <div>
        title: <input value={newTitle} onChange={handleTitleChange} />
      </div>
      <div>
        author: <input value={newAuthor} onChange={handleAuthorChange} />
      </div>
      <div>
        url: <input value={newUrl} onChange={handleUrlChange} />
      </div>
      <button type="submit">create</button>
    </form>

    {blogs.map(blog =>
      <Blog key={blog.id} blog={blog} />
    )}
  </div>
)


  return (
    <div>

      <Notification message={errorMessage} type="error" />
      <Notification message={alertMessage} type="alert" />
      

      {user === null ? 
        loginForm() :
        blogList()
      }

    </div>
  )
}

export default App