const Notification = ({ type, message }) => {
    if (message === null) {
      return null
    }
    
    var className = 'notification'
    if (type === 'error') {
        className += ' error';
    } else {
        className += ' success';
    }
  
    return (
        <div className={ className }>
        {message}
      </div>
    )
}
  
export default Notification