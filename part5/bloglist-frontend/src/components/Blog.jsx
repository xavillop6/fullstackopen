import { useState } from 'react'

const Blog = ({ blog, updateBlog }) => {
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

  const showWhenVisible = { display: showDetails ? '' : 'none' }

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author} <button onClick={toggleShowDetails}>{showDetails ? 'hide' : 'view'}</button>
      <div style={showWhenVisible}>{showDetails ? blog.url : null}</div>
      <div style={showWhenVisible}>likes: {blog.likes} <button onClick={handleLike}>likes</button></div>
      <div style={showWhenVisible}>{blog.user !== null && blog.user.name}</div>
    </div>
  )
}

export default Blog
