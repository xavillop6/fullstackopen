describe('Blog app', function () {
  const user = {
    name: 'Matti Luukkainen',
    username: 'mluukkai',
    password: 'salainen'
  }
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

  
    describe.only('When logged in', function() {
      beforeEach(function() {
        cy.login({ username: user.username, password: user.password })
      })
  
      it('A blog can be created', function() {
        cy.contains('new blog').click()
        cy.get('#title').type('A blog created by cypress')
        cy.get('#author').type('cypress')
        cy.get('#url').type('http://cypress.com')

        cy.get('#create').click()

        cy.contains('A blog created by cypress')
      })
    })
  
})
