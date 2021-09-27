import React, { useState } from 'react'

const BlogList = ({ blogs, handleLike }) => {
  return (
    <React.Fragment>
      {blogs.map(blog => (
        <Blog key={blog.id} blog={blog} handleLike={handleLike} />
      ))}
    </React.Fragment>
  )
}

const Blog = ({ blog, handleLike }) => {
  const [visible, setVisible] = useState(null)

  const hideWhenVisibility = { display: visible ? 'none' : '' }
  const showWhenVisibility = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    backgroundColor: '#63B4B8',
  }

  const likeBlog = async () => {
    const id = blog.id
    const blogObj = {
      user: blog.user.id,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
    }

    await handleLike(id, blogObj)
  }

  return (
    <div style={blogStyle}>
      <div style={hideWhenVisibility}>
        <p>
          {blog.title} {blog.author}{' '}
          <button onClick={toggleVisibility}>view</button>
        </p>
      </div>
      <div style={showWhenVisibility}>
        <p>
          {blog.title} {blog.author}{' '}
          <button onClick={toggleVisibility}>hide</button>
        </p>
        <p>{blog.url}</p>
        <p>
          likes {blog.likes} <button onClick={likeBlog}>like</button>
        </p>
        <p>{blog.user.name}</p>
      </div>
    </div>
  )
}

export default BlogList
