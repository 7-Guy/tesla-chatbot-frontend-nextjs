describe('My First Test', () => {
    it('clicking the tabs navigates to the respective URLs', () => {
        cy.visit('/')

        cy.contains('History').click()
        cy.location('pathname').should('eq', '/history')

        cy.contains('AI Models').click()
        cy.location('pathname').should('eq', '/ai-models')

        cy.contains('Prompt Management').click()
        cy.location('pathname').should('eq', '/prompt-management')

        cy.contains('Exhibit Management').click()
        cy.location('pathname').should('eq', '/exhibit-management')

        cy.contains('Chat').click()
        cy.location('pathname').should('eq', '/')
    })
})