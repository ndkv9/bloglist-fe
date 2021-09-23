import React from 'react'

const LoginForm = ({ username, password, setUsername, setPassword }) => {
  return (
    <form>
      <div>
        username
        <input
          type='text'
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type='password'
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
    </form>
  )
}

export default LoginForm
