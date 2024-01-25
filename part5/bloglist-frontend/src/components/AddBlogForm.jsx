import { useState } from 'react'

const AddBlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleAddBlog = async (event) => {
    event.preventDefault()
    const blog = { title, author, url }
    await createBlog(blog)
    setTitle('')
    setAuthor('')
    setUrl('')
  }
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleAddBlog}>
        <div>
          title:
          <input
            id='title' name='title'
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            id='author' name='author'
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            id='url' name='url'
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default AddBlogForm
