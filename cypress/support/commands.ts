/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
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
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
declare global {
  namespace Cypress {
    interface Chainable {
      login(username: string, password: string): Chainable<void>;
      loginWithoutSession(username: string, password: string): Chainable<void>;
    }
  }
}

Cypress.Commands.add("login", (username: string, password: string) => {
  cy.session("LogIn", () => {
    cy.visit("http://localhost:3000");
    cy.get(`input[name="username"]`).type(username);
    cy.get(`input[name="password"]`).type(password);
    cy.get(`button[name="logInBtn"]`).click();
  });
});

Cypress.Commands.add(
  "loginWithoutSession",
  (username: string, password: string) => {
    if (username === "" && password === "") {
      cy.get(`input[name="username"]`)
        .clear()
        .type(" ", { force: true })
        .type("{backspace}");
      cy.get(`input[name="password"]`)
        .clear()
        .type(" ", { force: true })
        .type("{backspace}");
    } else if (username === "") {
      cy.get(`input[name="username"]`)
        .clear()
        .type(" ", { force: true })
        .type("{backspace}");
      cy.get(`input[name="password"]`).type(password);
    } else if (password === "") {
      cy.get(`input[name="username"]`).type(username);
      cy.get(`input[name="password"]`)
        .clear()
        .type(" ", { force: true })
        .type("{backspace}");
    } else {
      cy.get(`input[name="username"]`).type(username);
      cy.get(`input[name="password"]`).type(password);
    }

    cy.get(`button[name="logInBtn"]`).click();
  }
);

export {};
