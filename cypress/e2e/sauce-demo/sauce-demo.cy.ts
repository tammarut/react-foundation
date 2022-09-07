describe('Sauce demo', () => {
  beforeEach(() => {
    // Cypress starts out with a blank slate for each test
    // so we must tell it to visit our website with the `cy.visit()` command.
    // Since we want to visit the same URL at the start of all our tests,
    // we include it in our beforeEach function so that it runs before each test
    cy.visit('https://www.saucedemo.com/')
  })

  it('should login successfully', () => {
    // Arrange
    const username = 'standard_user'
    const password = 'secret_sauce'
    // Act
    cy.get('input[placeholder*="Username"]').type(username)
    cy.get('#password').type(password)
    cy.get('#login-button').click()
    // Assert
    cy.url().should('eql', 'https://www.saucedemo.com/inventory.html')
  })

  it('should login succesfully with custom command', () => {
    // Arrange
    const username = 'standard_user'
    const password = 'secret_sauce'
    // Act
    cy.login(username, password)
    // Assert
    cy.url().should('eql', 'https://www.saucedemo.com/inventory.html')
  })
})
