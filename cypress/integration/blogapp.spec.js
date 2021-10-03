/// <reference types='cypress' />

describe('Blog App', () => {
  beforeEach(() => {
    cy.request('POST', 'http://localhost:3001/api/test/reset')
    cy.request('POST', 'http://localhost:3001/api/users', {
      name: 'piccolo',
      username: 'namekian1',
      password: 'itsasecret',
    })
    cy.visit('/')
  })

  it('can display the home page', () => {
    cy.contains('h2', 'log in to application')
  })

  describe('login functionality', () => {
    it('succeeds with correct credentials', () => {
      cy.contains('username').find('input').type('namekian1')
      cy.contains('password').find('input').type('itsasecret')
      cy.contains('button', 'login').click()

      cy.get('html').should('contain', 'piccolo logged in')
    })

    it('fails with wrong credentials', () => {
      cy.contains('username').find('input').type('namekian1')
      cy.contains('password').find('input').type('itsasecrett')
      cy.contains('button', 'login').click()

      cy.get('html').should('contain', 'invalid credentials')
    })
  })

  describe('when logged in', () => {
    beforeEach(() => {
      cy.login({ username: 'namekian1', password: 'itsasecret' })
    })

    it.only('a blog can be created', () => {
      cy.contains('button', 'new blog').click()
      cy.contains('title').find('input').type('a new blog with Cypress')
      cy.contains('author').find('input').type('itsme')
      cy.contains('url').find('input').type('www.me.dev')
      cy.contains('button', 'create').click()
    })
  })
})
