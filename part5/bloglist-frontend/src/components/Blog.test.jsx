import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

describe('Blog component tests', () => {
  const initialBlog =
  {
    id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    user: {
      id: '5a437a851b54a676234d17f7',
      username: 'mluukkai',
      name: 'Matti Luukkainen'
    }
  }

  test('renders title and author before clicking view', () => {
    const component = render(
      <Blog blog={initialBlog} user={initialBlog.user} />
    )

    const whenHiddenDiv = component.container.querySelector('.whenHidden')

    expect(whenHiddenDiv).toHaveTextContent(
      `${initialBlog.title} ${initialBlog.author}`
    )

    expect(whenHiddenDiv).not.toHaveTextContent(
      initialBlog.url
    )

    expect(whenHiddenDiv).not.toHaveTextContent(
      `likes: ${initialBlog.likes}`
    )
  })

  test('renders url and blog after clicking view', () => {
    const component = render(
      <Blog blog={initialBlog} user={initialBlog.user} />
    )

    const whenVisibleDiv = component.container.querySelector('.whenVisible')

    expect(whenVisibleDiv).toHaveTextContent(
      initialBlog.url
    )

    expect(whenVisibleDiv).toHaveTextContent(
      `likes: ${initialBlog.likes}`
    )
  })
})
