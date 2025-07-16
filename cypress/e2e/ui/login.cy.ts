describe ('login page', () => {
    beforeEach(`Visit the login page`, () => {
        cy.visit(`http://localhost:3000`)
    })

    it ('LogIn with valid credentials to the admin page', () => {
        cy.loginWithoutSession('admin', '1234')
        cy.wait(1500)
        cy.window().then((win) => {
            const userType = JSON.parse(win.localStorage.getItem('Data')).userType 
            userType === 'admin' ? cy.url().should('equal', 'http://localhost:3000/admin') : cy.url().should('equal', 'http://localhost:3000/cashier')           
        })    
    })

    it ('LogIn with valid credentials to the cashier page', () => {
        cy.loginWithoutSession('ezzo123', '1234')
        cy.wait(1500)
        cy.window().then((win) => {
            const userType = JSON.parse(win.localStorage.getItem('Data')).userType 
            userType === 'admin' ? cy.url().should('equal', 'http://localhost:3000/admin') : cy.url().should('equal', 'http://localhost:3000/cashier')           
        })      
        
    })

    it ('LogIn with invalid username', () => {
        cy.loginWithoutSession('invalid username', '123')
        cy.wait(500)
        cy.get(`div[class="swal-modal"]`).should('be.visible').then((swal) => {
            cy.wrap(swal).find(`div[class="swal-text"]`).should('have.text', `This account is doesn't exist!, Try to sure of enetered username..`)
        })
    })

    it ('LogIn with invalid password', () => {
        cy.loginWithoutSession('ezzo123', '12')
        cy.wait(500)
        cy.get(`div[class="swal-modal"]`).should('be.visible').then((swal) => {
            cy.wrap(swal).find(`div[class="swal-text"]`).should('have.text', `Password is Wrong!`)
        })
    })
  
    it ('LogIn with empty password field', () => {
        cy.loginWithoutSession('ezzo123', '')
        cy.wait (1000)
        cy.get(`.reg_errorMessageBox__G4I4q`).should('have.text', `Password is Required!`)

    })
    
    it ('LogIn with empty username field', () => {
        cy.loginWithoutSession('', '1234')
        cy.get(`.reg_errorMessageBox__G4I4q`).should('have.text', `Username is Required!`)

    })
    it ('LogIn with empty username and empty password', () => {
        cy.loginWithoutSession('', '')
        cy.get(`.reg_errorMessageBox__G4I4q`).eq(0).should('have.text', `Username is Required!`)
        cy.get(`.reg_errorMessageBox__G4I4q`).eq(1).should('have.text', `Password is Required!`)
    })
})