import React, { useState, useEffect } from 'react'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async event => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      blogService.setToken(user.token)
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log(exception)
    }
  }

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
  }

  const handleCreate = async event => {
    event.preventDefault()
    try {
      const savedBlog = await blogService.create({ title, author, url })
      const blogObj = {
        title: savedBlog.title,
        author: savedBlog.author,
        url: savedBlog.url,
        likes: savedBlog.likes,
        id: savedBlog.id,
      }

      setBlogs(prev => prev.concat(blogObj))
      setTitle('')
      setAuthor('')
      setUrl('')
    } catch (exception) {
      console.log(exception.message)
    }
  }

  const displayLoginForm = () => {
    return (
      <LoginForm
        username={username}
        password={password}
        setUsername={setUsername}
        setPassword={setPassword}
        handleLogin={handleLogin}
      />
    )
  }

  const displayBlogs = () => {
    const loggedInStyle = {
      color: 'orange',
    }

    return (
      <div>
        <h2>blogs</h2>

        <p style={loggedInStyle}>
          {user.name} logged in <button onClick={handleLogout}>logout</button>
        </p>

        <h2>create new</h2>

        <NewBlogForm
          newBlog={{
            title,
            author,
            url,
            setTitle,
            setAuthor,
            setUrl,
            handleCreate,
          }}
        />

        <br />

        <BlogList blogs={blogs} />
      </div>
    )
  }

  return <div>{!user ? displayLoginForm() : displayBlogs()}</div>
}

export default App
