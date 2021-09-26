import React, { useState } from 'react'

const BlogList = ({ blogs }) => {
  return (
    <React.Fragment>
      {blogs.map(blog => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </React.Fragment>
  )
}

const Blog = ({ blog }) => {
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
        <p>likes {blog.likes}</p>
        <p>{blog.user.name}</p>
      </div>
    </div>
  )
}

export default BlogList
