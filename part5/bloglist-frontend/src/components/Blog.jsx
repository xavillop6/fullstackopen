import { useState } from 'react'

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [showDetails, setShowDetails] = useState(false)
  const toggleShowDetails = () => {
    setShowDetails(!showDetails)
  }

  const showWhenVisible = { display: showDetails ? '' : 'none' }

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author} <button onClick={toggleShowDetails}>{showDetails ? 'hide' : 'view'}</button>
      <div style={showWhenVisible}>{showDetails ? blog.url : null}</div>
      <div style={showWhenVisible}>likes: {blog.likes} <button>likes</button></div>
      <div style={showWhenVisible}>{blog.user !== null && blog.user.name}</div>
    </div>
  )
}

export default Blog
