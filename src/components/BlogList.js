import React, { useState } from 'react'
import PropTypes from 'prop-types'

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
  const [visible, setVisible] = useState(false)

  const label = visible ? 'hide' : 'view'

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

  const handleRemove = async () => {
    const confirmation = window.confirm(`remove blog ${blog.title} ?`)

    if (confirmation) {
      await removeBlog(blog.id)
    }
  }

  return (
    <div style={blogStyle} data-testid='blog-item'>
      <div>
        <p>
          {blog.title} {blog.author}{' '}
          <button onClick={() => setVisible(!visible)}>{label}</button>
        </p>
      </div>
      {visible && (
        <div>
          <div>{blog.url}</div>
          <div>
            likes {blog.likes}
            <button onClick={() => likeBlog()}>like</button>
          </div>
          <div>{blog.user.name}</div>
          {loggedUser && (
            <button onClick={() => handleRemove(blog.id)}>remove</button>
          )}
        </div>
      )}
    </div>
  )
}

BlogList.propTypes = {
  blogs: PropTypes.array.isRequired,
  loggedUser: PropTypes.object.isRequired,
  handleLike: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired,
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  loggedUser: PropTypes.object.isRequired,
  handleLike: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired,
}

export { BlogList, Blog }
