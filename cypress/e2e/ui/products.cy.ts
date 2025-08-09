describe('admin product page scenarios', () => {
    beforeEach('visit admin products page', () => {
        cy.visit('http://localhost:3000');
        cy.login('admin', '1234')
    })
    
})