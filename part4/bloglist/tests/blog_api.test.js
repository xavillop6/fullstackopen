const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

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
  // escribe un test en jest que compruebe la llamada POST de express de un blog nuevo y revisa que el numero total de blogs a incrementado a uno respecto a initialBlogs
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
})

afterAll(() => {
  mongoose.connection.close()
})
