import React, { useState } from 'react'

const Togglable = props => {
  const [visible, setVisible] = useState(null)

  const hideWhenVisibility = { display: visible ? 'none' : '' }
  const showWhenVisibility = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div>
      <div style={hideWhenVisibility}>
        <button onClick={toggleVisibility}>{props.btnLabel}</button>
      </div>
      <div style={showWhenVisibility}>
        {props.children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  )
}

export default Togglable
