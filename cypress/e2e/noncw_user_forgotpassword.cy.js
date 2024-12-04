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
            cy.url().should('include', 'u/home/dashboard')
        })

        // it('Non-cw user log in to Firecloud', () => {
        //     cy.get('.authentication-contain').should('be.visible').as('authenticationContain')

        //     cy.get('@authenticationContain').within( ($content) => {
        //         cy.wrap($content)
        //             .should('contain.text', 'Reset password')
        //             .should('contain.text', 'Don’t worry! Just fill in your information and we’ll send you a link to reset your password.')

        //     })
            
        //     cy.get('@authenticationContain').within( () => {
        //         cy.get('input').focus().blur().type('noaccount@#@@@gmail.com')
        //         cy.get('.text-danger').contains('Invalid Email Format.')
        //     })

        //     cy.get('@authenticationContain').within( () => {
        //         cy.contains('a.text-black', 'Back to Sign in')
        //             .should('be.visible')
        //             .click()
        //             .then( () => {
        //                 cy.url().should('include' , 'realms/platform/login-actions')
        //             })
        //     })
        // });
    });
});