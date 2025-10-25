/// <reference types="cypress" />
import "cypress-file-upload";
import "@testing-library/cypress/add-commands";

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
      logout(): Chainable<void>;
      loginWithoutSession(username: string, password: string): Chainable<void>;
      dropdownSelect(label: string, optionValue: string): Chainable<void>;
      uploadFile(selector: string, fileName: string): Chainable<void>;
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

Cypress.Commands.add("dropdownSelect", (label: string, optionValue: string) => {
  cy.contains("label", label)
    .parent() // go to the container div
    .find('[role="button"]') // MUI select root
    .click();
  cy.get('ul[role="listbox"] li')
    .contains(optionValue) // the option text
    .click();
  cy.contains("label", label)
    .parent()
    .find('[role="button"]')
    .should("contain.text", optionValue);
});

Cypress.Commands.add("logout", () => {
  cy.contains("LogOut")
    .click()
    .then(() => {
      cy.contains("OK").click();
    });
});

Cypress.Commands.add("uploadFile", (selector: string, fileName: string) => {
  cy.get(selector).attachFile(`product_imgs/${fileName}`);
});

export {};
