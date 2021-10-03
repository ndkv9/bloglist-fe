/// <reference types='cypress' />

describe('Blog App', () => {
  beforeEach(() => {
    cy.request('POST', 'http://localhost:3001/api/test/reset')
    cy.visit('/')
  })

  it('can display the home page', () => {
    cy.contains('h2', 'log in to application')
  })
})
