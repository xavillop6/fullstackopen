const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const bcrypt = require('bcrypt')

const User = require('../models/User')
const Blog = require('../models/Blog')

beforeEach(async () => {
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('password', 10)
  const user = new User({ username: 'root', passwordHash })
  await user.save()
})

beforeEach(async () => {
  await Blog.deleteMany({})
  const users = await User.find({})
  const user = users[0]

  const blogObjects = helper.initialBlogs
    .map(blog => {
      blog.user = user._id
      return new Blog(blog)
    })
  const promiseArray = blogObjects.map(blog => {
    user.blogs = user.blogs.concat(blog._id)
    return blog.save()
  })
  await Promise.all(promiseArray)
  await user.save()
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
  test('a valid blog can be added by authorized user', async () => {
    const newBlog = {
      title: 'My blog',
      author: 'Xavier Llop',
      url: 'https://myblog.com',
      likes: 7
    }

    const user = {
      username: 'root',
      password: 'password'
    }

    const loginUser = await api
      .post('/api/login')
      .send(user)

    await api.post('/api/blogs/')
      .send(newBlog)
      .set('Authorization', `Bearer ${loginUser.body.token}`)
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

    const user = {
      username: 'root',
      password: 'password'
    }

    const loginUser = await api
      .post('/api/login')
      .send(user)

    await api.post('/api/blogs/')
      .send(newBlog)
      .set('Authorization', `Bearer ${loginUser.body.token}`)
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

    const user = {
      username: 'root',
      password: 'password'
    }

    const loginUser = await api
      .post('/api/login')
      .send(user)

    await api.post('/api/blogs/')
      .set('Authorization', `Bearer ${loginUser.body.token}`)
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

    const user = {
      username: 'root',
      password: 'password'
    }

    const loginUser = await api
      .post('/api/login')
      .send(user)

    await api.post('/api/blogs/')
      .set('Authorization', `Bearer ${loginUser.body.token}`)
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

    const user = {
      username: 'root',
      password: 'password'
    }

    const loginUser = await api
      .post('/api/login')
      .send(user)

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `Bearer ${loginUser.body.token}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(
      helper.initialBlogs.length - 1
    )

    const blogsAtEndIds = blogsAtEnd.map(blog => blog.id)

    expect(blogsAtEndIds).not.toContain(blogToDelete.id)
  })

  test('return 401 if token is missing', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(401)
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

    const passwordHash = await bcrypt.hash('password', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    await api
      .post('/api/users')
      .send(helper.newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(helper.newUser.username)
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()
    const rootUsername = {
      username: 'root',
      name: helper.newUser.name,
      password: helper.newUser.password
    }
    const result = await api
      .post('/api/users')
      .send(rootUsername)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('username must be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('creation fails with proper statuscode and message if username is missing', async () => {
    const usersAtStart = await helper.usersInDb()
    const newUserWithoutUsername = {
      password: helper.newUser.password,
      name: helper.newUser.name
    }
    const result = await api
      .post('/api/users')
      .send(newUserWithoutUsername)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('username and password are required')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('creation fails with proper statuscode and message if password is missing', async () => {
    const newUserWithoutPassword = {
      username: helper.newUser.username,
      name: helper.newUser.name
    }

    const usersAtStart = await helper.usersInDb()
    const result = await api
      .post('/api/users')
      .send(newUserWithoutPassword)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('username and password are required')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('creation fails with proper statuscode and message if username too short', async () => {
    const newUserShortUsername = {
      username: 'X',
      name: helper.newUser.name,
      password: helper.newUser.password
    }
    const usersAtStart = await helper.usersInDb()
    const result = await api
      .post('/api/users')
      .send(newUserShortUsername)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('username and password must be at least 3 characters')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('creation fails with proper statuscode and message if password too short', async () => {
    const newUserShortPassword = {
      username: helper.newUser.username,
      name: helper.newUser.name,
      password: 'X'
    }
    const usersAtStart = await helper.usersInDb()
    const result = await api
      .post('/api/users')
      .send(newUserShortPassword)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('username and password must be at least 3 characters')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
