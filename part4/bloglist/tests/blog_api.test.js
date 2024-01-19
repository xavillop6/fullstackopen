const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const bcrypt = require('bcrypt')

const User = require('../models/User')
const Blog = require('../models/Blog')

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

describe('testing GET requests', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('id is defined', async () => {
    const response = await api.get('/api/blogs/')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const firstBlog = response.body[0]
    expect(firstBlog.id).toBeDefined()
  })
})

describe('testing POST requests', () => {
  test('a valid blog can be added', async () => {
    const newBlog = {
      title: 'My blog',
      author: 'Xavier Llop',
      url: 'https://myblog.com',
      likes: 7
    }

    await api.post('/api/blogs/')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const contents = blogsAtEnd.map(blog => blog.title)
    expect(contents).toContain(
      newBlog.title
    )
  })

  test('new blog without likes has likes = 0', async () => {
    const newBlog = {
      title: 'My blog',
      author: 'Xavier Llop',
      url: 'https://myblog.com'
    }

    await api.post('/api/blogs/')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    const lastBlogLikes = blogsAtEnd[blogsAtEnd.length - 1].likes
    expect(0).toEqual(lastBlogLikes)
  })

  test('new blog without title will not be added', async () => {
    const newBlog = {
      author: 'Xavier Llop',
      url: 'https://myblog.com',
      likes: 7
    }

    await api.post('/api/blogs/')
      .send(newBlog)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })

  test('new blog without url will not be added', async () => {
    const newBlog = {
      title: 'My blog',
      author: 'Xavier Llop',
      likes: 7
    }

    await api.post('/api/blogs/')
      .send(newBlog)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })
})

describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(
      helper.initialBlogs.length - 1
    )

    const blogsAtEndIds = blogsAtEnd.map(blog => blog.id)

    expect(blogsAtEndIds).not.toContain(blogToDelete.id)
  })
})

describe('testing PUT request', () => {
  test('update likes of a blog', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    const newLikes = 10
    blogToUpdate.likes = newLikes

    await api.put(`/api/blogs/${blogToUpdate.id}`)
      .send(blogToUpdate)
      .expect(200)

    const blog = await Blog.findById(blogToUpdate.id)

    expect(newLikes).toEqual(blog.likes)
  })
})

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    await api
      .post('/api/users')
      .send(helper.newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(helper.newUser.username)
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()
    const result = await api
      .post('/api/users')
      .send(helper.newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` to be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
