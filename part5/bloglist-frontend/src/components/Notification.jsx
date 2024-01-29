import PropTypes from 'prop-types'

const Notification = ({ notification }) => {
  if (notification === null) {
    return null
  }

  const { message, type } = notification

  return (
    <div className={type}>
      {message}
    </div>
  )
}

Notification.propTypes = {
  notification: PropTypes.string.isRequired
}

export default Notification
