describe('Blog app', function () {
  const user = {
    name: 'Matti Luukkainen',
    username: 'mluukkai',
    password: 'salainen'
  }

  const secondUser = {
    name: 'John Doe',
    username: 'johndoe',
    password: 'salainen'
  }

  const initialBlogs = [
    {
      title: 'React patterns',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
      likes: 7
    },
    {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    },
    {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12
    },
    {
      title: 'First class tests',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html',
      likes: 10
    },
    {
      title: 'TDD harms architecture',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
      likes: 0
    }
  ]

  beforeEach(function () {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)

    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user) 
    cy.visit('')
  })

  it('Login form is shown', function () {
    cy.contains('Log in to application')
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login', function () {
    it('fails with wrong credentials', function () {
      cy.get('#username').type(user.name)
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.error').contains('invalid username or password')
    })

    it('succeeds with correct credentials', function () {
      cy.get('#username').type(user.username)
      cy.get('#password').type(user.password)
      cy.get('#login-button').click()

      cy.contains(`${user.name} logged in`)
    })
  })

    describe('When logged in', function() {
      beforeEach(function() {
        cy.login({ username: user.username, password: user.password })
      })
  
      it('A blog can be created', function() {
        cy.contains('new blog').click()
        cy.get('#title').type(initialBlogs[0].title)
        cy.get('#author').type(initialBlogs[0].author)
        cy.get('#url').type(initialBlogs[0].url)

        cy.get('#create').click()

        cy.contains(initialBlogs[0].title)
      })

      describe('When blogs exist', function () {
        beforeEach(function () {
          initialBlogs.forEach(blog => {
            cy.createBlog(blog)
          })

          cy.visit('')
        })

        it('User can like a blog', function () {
          cy.contains(initialBlogs[0].title).as('theBlog')
          cy.get('@theBlog').find('.viewButton').click()
          
          cy.get('@theBlog').parent().find('.likeButton').click()
          
          const blogLikes = initialBlogs[0].likes + 1;
          cy.get('@theBlog').parent().should('contain', `likes: ${blogLikes}`)
        })

        it('User can delete their blog', function () {
          cy.contains(initialBlogs[0].title).as('theBlog')
          cy.get('@theBlog').parent().find('.viewButton').click()
          cy.get('@theBlog').parent().find('.removeButton').as('removeButton').click()
          cy.get('@theBlog').should('not.exist')
        })

        describe('When there more than one user', function () {
          beforeEach(function () {
            cy.request('POST', `${Cypress.env('BACKEND')}/users`, secondUser) 
            cy.login({ username: secondUser.username, password: secondUser.password })

            cy.visit('')
          })

          it('blog only can delete by creator', function () {
            cy.contains(initialBlogs[0].title).as('theBlog')
            cy.get('@theBlog').find('.viewButton').click()
            cy.get('@theBlog').parent().find('.removeButton').should('not.exist')
          })
        });

        it('blogs are ordered according to likes', function () {   
          const sortedBlogs = [...initialBlogs].sort((a, b) => b.likes - a.likes)
          sortedBlogs.forEach((blog, index) => {
            cy.get('.blog').eq(index).should('contain', blog.title)
          })
        })
      })
    })
  
})
