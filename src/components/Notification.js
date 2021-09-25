import React from 'react'

const Notification = ({ notification }) => {
  if (!notification) return null

  const notificationStyle = notification.error ? 'error' : 'noti'

  return <div className={notificationStyle}>{notification.message}</div>
}

export default Notification
