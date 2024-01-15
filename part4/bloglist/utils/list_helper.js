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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}
