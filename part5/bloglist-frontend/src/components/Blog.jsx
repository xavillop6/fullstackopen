import { useState } from 'react'

const Blog = ({ blog, updateBlog, removeBlog, user }) => {
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

  const handleLike = async () => {
    const likedBlog = { ...blog, likes: blog.likes + 1 }
    await updateBlog(blog.id, likedBlog)
  }

  const handleRemove = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      await removeBlog(blog.id)
    }
  }

  const showRemove = blog.user.username === user.username
  const showWhenVisible = { display: showDetails ? '' : 'none' }

  return (
    <div style={blogStyle}>
      <div className='whenHidden'>
        {blog.title} {blog.author} <button onClick={toggleShowDetails}>{showDetails ? 'hide' : 'view'}</button>
      </div>
      <div style={showWhenVisible} className='whenVisible'>
        <div>{blog.url}</div>
        <div>likes: {blog.likes} <button onClick={handleLike}>likes</button></div>
        <div>{blog.user !== null && blog.user.name}</div>
        {showRemove && <button onClick={handleRemove}>remove</button>}
      </div>
    </div>
  )
}

export default Blog
