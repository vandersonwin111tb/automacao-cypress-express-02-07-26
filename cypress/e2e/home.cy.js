describe('webapp deve estar online', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000')

    cy.title().should('eq', 'Gerencie suas tarefas com Mark V')
  })
})