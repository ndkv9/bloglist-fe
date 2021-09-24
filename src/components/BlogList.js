import React from 'react'

const BlogList = ({ blogs }) => {
  return (
    <React.Fragment>
      {blogs.map(blog => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </React.Fragment>
  )
}

const Blog = ({ blog }) => (
  <div>
    {blog.title} {blog.author}
  </div>
)

export default BlogList
