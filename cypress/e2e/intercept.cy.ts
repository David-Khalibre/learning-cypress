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
            const requestProfile = '/post/get_comment_profiles'
            cy.intercept(`*p_p_resource_id=${encodeURIComponent(this._name)}*`).as('profileGet')
            cy.url().should('include', 'u/home/dashboard')
            cy.wait('@profileGet').its('responve.statusCode').should('eq', 200)
        })

    });
});