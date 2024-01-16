const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((totalLikes, blog) => blog.likes + totalLikes, 0)
}

const favoriteBlog = (blogs) => {
  const blogLikes = blogs.map(blog => blog.likes)
  const maxLikes = Math.max(...blogLikes)
  const blog = blogs.find(blog => blog.likes === maxLikes)
  return {
    title: blog.title,
    author: blog.author,
    likes: blog.likes
  }
}

const mostBlogs = (blogs) => {
  const authors = blogs.map(blog => blog.author)
  const authorCount = {}
  authors.forEach((author) => {
    authorCount[author] = authorCount[author] ? authorCount[author] + 1 : authorCount[author] = 1
  })
  const author = Object.keys(authorCount).reduce((a, b) => authorCount[a] > authorCount[b] ? a : b)
  return {
    author,
    blogs: authorCount[author]
  }
}

const mostLikes = (blogs) => {
  const authorLikes = {}
  blogs.forEach(blog => {
    if (authorLikes[blog.author]) {
      authorLikes[blog.author] += blog.likes
    } else {
      authorLikes[blog.author] = blog.likes
    }
  })

  const author = Object.keys(authorLikes).reduce((a, b) => authorLikes[a] > authorLikes[b] ? a : b)
  return {
    author,
    likes: authorLikes[author]
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
