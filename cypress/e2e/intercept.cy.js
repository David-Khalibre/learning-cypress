const loginToFirecloud = (email, password, expectedProfileName) => {
    cy.get('#username').type(email)
    cy.get('#password').type(password)
    cy.get('#kc-login').click()
    cy.url().should('include', '/u/home/dashboard')
}

describe('Non-cw user forgot password', () => {
    context('Login to Firecloud', () => {
        beforeEach(() => {
            Cypress.on('uncaught:exception', () => false)
            const url = 'https://uat-connect.firecloud.zone/'
            const sessionName = 'amy firecloud'

            cy.session(sessionName, () => {
                cy.visit(url) // You will be redirect to keycloak page
                loginToFirecloud (
                    'firecloud.amy@mail.com',
                    'Welcome.01',
                    'Amy Admin'
                )
            })
            cy.visit(url);
        });
        it('Login to Firecloud', () => {
            cy.intercept
            cy.url().should('include', 'u/home/dashboard')
        })

    });
});