
const loginToFirecloud = (email, password, expectedProfileName) => {
    cy.get('#username').type(email)
    cy.get('#password').type(password)
    cy.get('#kc-login').click()
    cy.url().should('include', '/u/home/dashboard')
    cy.get('.basic-profile-wrapper').should('contain.text', expectedProfileName)
}
const sessionName = user.screenName + ' ' + orgName

cy.session(sessionName, () => {
  cy.visit(url) // You will be redirect to keycloak page
  cy.signInBy(user.email, user.screenName)
})
cy.visit(url) // You got it session then visit again will be on crosswired
cy.logCwNode(user.email)

describe('Visit to Firecloud in uat', () => {
    context('Org Firecloud user login', () => {
        beforeEach(() => {
            cy.visit('https://uat-connect.firecloud.zone/')
        });

        it('user login to firecloud', () => {
           
        });

        it('user login to firecloud', () => {
            loginToFirecloud(
                'firecloud.amy@mail.com', 
                'Welcome.01',
                'Amy Admin')
        });
        it.only('user login to firecloud as premium user', () => {
            //User login to Firecloud
            loginToFirecloud(
                'au.cworg@mail.com', 
                'Welcome.01',
                'Au_cw OrgInvite')
        });
    });
});