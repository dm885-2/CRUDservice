// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
Cypress.Commands.add('register', (userName, password) => {
    cy.request({
        method:'POST', 
        url:'/auth/register',
        retryOnStatusCodeFailure: true,
        retryOnNetworkFailure: true,
        body: {
            "username": userName,
            "password": password,
            "passwordRepeat": password
        }
        })
        .as('registerResponse')
        .then((response) => {
            return response;
        })
        .its('status')
        .should('eq', 200);
})

Cypress.Commands.add('login', (userName, password) => {
    cy.request({
        method:'POST', 
        url:'/auth/login',
        body: {
          username: userName,
          password: password
        }
      })
      .as('loginResponse')
      .then((response) => {
        Cypress.env('rtoken', response.body.refreshToken); 
        return response;
      })
      .its('status')
      .should('eq', 200);
  })

  Cypress.Commands.add('getAT', () => {
    const token = Cypress.env('rtoken');
    cy.request({
        method:'POST', 
        url:'/auth/accessToken',
        body: {
          refreshToken : token
        }
      })
      .as('loginResponse')
      .then((response) => {
        Cypress.env('token', response.body.accessToken);
        return response;
      })
      .its('status')
      .should('eq', 200);
  })

Cypress.Commands.add("addFile", (name) => {
    const token = Cypress.env('rtoken');
        cy.request({
          method: "POST",
          url: "/files",
          headers: {
              "Content-Type": "application/json",
              "Authorization": "Bearer " + Cypress.env("token")
          },
          body: {
              filename: name,
              filetype: "mzn",
              data : "file content"
          }
      }).as('addFileResponse')
      .then((response) => {
        return response;
      })
      .its('status')
      .should('eq', 200);
})