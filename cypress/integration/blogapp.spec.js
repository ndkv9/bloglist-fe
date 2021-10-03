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

  describe('Login', () => {
    it.only('succeeds with correct credentials', () => {
      cy.contains('username').find('input').type('namekian1')
      cy.contains('password').find('input').type('itsasecret')
      cy.contains('button', 'login').click()

      cy.get('html').should('contain', 'piccolo logged in')
    })
  })
})
