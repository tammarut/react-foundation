describe('Note module', () => {
  beforeEach(() => {
    // Cypress starts out with a blank slate for each test
    // so we must tell it to visit our website with the `cy.visit()` command.
    // Since we want to visit the same URL at the start of all our tests,
    // we include it in our beforeEach function so that it runs before each test
    cy.visit('http://localhost:3000/')
  })

  it('should create a new note successfully', () => {
    // Arrange
    const title = 'Do homework'
    const content = 'Math and history'

    // Act
    // Click on <input> #title
    cy.get('#title').click()

    // Fill "Do homework" on <input> #title
    cy.get('#title').type(title)

    // Click on <textarea> #content
    cy.get('#content').click()

    // Fill "Math and history" on <textarea> #content
    cy.get('#content').type(content)

    // Click on <button> "Save"
    cy.get('button:nth-child(3)').click()

    // Assert
    // Click on <p> "Do homework"
    cy.get('div:nth-child(1) > p:nth-child(1)').should('have.text', 'Do homework')
    // Click on <p> "Math and history"
    cy.get('div:nth-child(1) > p:nth-child(2)').should('have.text', 'Math and history')
    cy.get('[role="list"] [role="listitem"]').should('have.length.gt', 1)
  })

  it('should delete a note successfully', () => {
    // Arrange
    const title = 'Take a nap'
    const content = 'Yoyo well'

    // Act
    cy.get('#title').click()

    // Fill "Take a nap" on <input> #title
    cy.get('#title').type(title)

    // Click on <textarea> #content
    cy.get('#content').click()

    // Fill "Yoyo well" on <textarea> #content
    cy.get('#content').type(content)

    // Click on <button> "Save"
    cy.get('button:nth-child(3)').click()

    // Click on <button> "Delete"
    cy.get('div:nth-child(1) > div > button:nth-child(2)').click()

    // Assert
    cy.get('[role="list"] [role="listitem"]').should('have.length', 1)
  })

  it('should edit a note successfully', () => {
    // Arrange
    const wrongTitle = 'Take a naz'
    const wrongContent = 'Well well9'
    const correctTitle = 'Take a nap'
    const correctContent = 'Well well'

    // Act
    // Click on <input> #title
    cy.get('#title').click()

    // Fill "Take a nazzzz2" on <input> #title
    cy.get('#title').type(wrongTitle)

    // Click on <textarea> #content
    cy.get('#content').click()

    // Fill "Well well 99" on <textarea> #content
    cy.get('#content').type(wrongContent)

    // Click on <button> "Save"
    cy.get('button:nth-child(3)').click()

    // Click on <button> "Edit"
    cy.get('div:nth-child(1) > div > button:nth-child(1)').click()

    // Click on <input> #title
    cy.get('#title').click()

    // Fill "Take a nap" on <input> #title
    cy.get('#title').type('{backspace}p')

    // Click on <textarea> #content
    cy.get('#content').click()

    // Fill "Well well" on <textarea> #content
    cy.get('#content').type('{backspace}')

    // Click on <button> "Save"
    cy.get('button:nth-child(3)').click()

    // Assert
    // Click on <p> "Take a nap"
    cy.get('div:nth-child(1) > p:nth-child(1)').should('have.text', correctTitle)
    // Click on <p> "Well well"
    cy.get('div:nth-child(1) > p:nth-child(2)').should('have.text', correctContent)
    cy.get('#title').should('have.value', '')
    cy.get('#content').should('have.value', '')
  })

  it('should undo title correctly', () => {
    // Arrange
    // Act
    // Click on <input> #title
    cy.get('#title').click()

    // Fill "Drink wine" on <input> #title
    cy.get('#title').type('Drink wine')

    // Click on <button> "Undo"
    cy.get('div:nth-child(6) > button:nth-child(1)').click()
    cy.get('div:nth-child(6) > button:nth-child(1)').click()

    // Assert
    cy.get('#title').should('have.value', 'Drink wi')
  })

  it('should redo title correctly', () => {
    // Arrange
    // Act
    // Click on <input> #title
    cy.get('#title').click()

    // Fill "Drink wine" on <input> #title
    cy.get('#title').type('Drink wine')

    // Click on <button> "Undo"
    cy.get('div:nth-child(6) > button:nth-child(1)').click()
    cy.get('div:nth-child(6) > button:nth-child(1)').click()
    // // Click on <button> "Redo"
    cy.get('div:nth-child(6) > button:nth-child(2)').click()

    // Assert
    cy.get('#title').should('have.value', 'Drink win')
  })
})
