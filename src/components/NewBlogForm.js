import React from 'react'

const NewBlogForm = ({ newBlog }) => {
  return (
    <form onSubmit={newBlog.handleCreate}>
      <div>
        title:
        <input
          type='text'
          value={newBlog.title}
          onChange={({ target }) => newBlog.setTitle(target.value)}
        />
      </div>
      <div>
        author:
        <input
          type='text'
          value={newBlog.author}
          onChange={({ target }) => newBlog.setAuthor(target.value)}
        />
      </div>
      <div>
        url:
        <input
          type='text'
          value={newBlog.url}
          onChange={({ target }) => newBlog.setUrl(target.value)}
        />
      </div>
      <button type='submit'>create</button>
    </form>
  )
}

export default NewBlogForm
