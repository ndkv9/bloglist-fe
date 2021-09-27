import React, { useState } from 'react'

const BlogList = ({ blogs, handleLike, removeBlog, loggedUser }) => {
  const sortByLikes = blogArr => {
    return blogArr.sort((a, b) => b.likes - a.likes)
  }

  return (
    <React.Fragment>
      {sortByLikes(blogs).map(blog => (
        <Blog
          key={blog.id}
          blog={blog}
          handleLike={handleLike}
          removeBlog={removeBlog}
          loggedUser={loggedUser}
        />
      ))}
    </React.Fragment>
  )
}

const Blog = ({ blog, handleLike, removeBlog, loggedUser }) => {
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

  const removeBtnVisibility = loggedUser.name === blog.user.name ? '' : 'none'

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

  const handleRemove = async () => {
    const confirmation = window.confirm(`remove blog ${blog.title} ?`)

    if (confirmation) {
      await removeBlog(blog.id)
    }
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
        <button
          style={{ backgroundColor: 'orange', display: removeBtnVisibility }}
          onClick={handleRemove}
        >
          remove
        </button>
      </div>
    </div>
  )
}

export default BlogList
