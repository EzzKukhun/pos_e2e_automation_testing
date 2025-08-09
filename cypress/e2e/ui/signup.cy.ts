
import { signUpSelectors } from "../../fixtures/selectors";
const signUpData = ["Test User", "testuser", "testpassword", "testpassword"];
const validSignUpData = ["Moammad Ahmad", "mohammad2025", "1234", "1234"];


describe("signup test suit", () => {
  beforeEach("visit sign up form", () => {
    cy.visit("http://localhost:3000");
    cy.get(`div[class="reg_regestrationContainer__WBY0z"]`)
      .find(`a`)
      .contains("Sign Up")
      .click();
  });


  it("Checking sign up if we have any two fields are empty", () => {
    cy.get(`div[class="reg_logIn__nX3fA"]`)
      .find("input")
      .then((inputs) => {
        const combinations = [];
        const totalFields = inputs.length;

        // Prepare all 2-field-empty combinations [i, j]
        for (let i = totalFields - 2; i >= 0; i--) {
          for (let j = totalFields - 1; j >= i + 1; j--) {
            combinations.push([i, j]);
          }
        }

        cy.wrap(combinations).each((_, index) => {
          const [firstNonEmptyIndex, secondNonEmptyIndex] = combinations[index];
          cy.wrap(inputs[firstNonEmptyIndex]).type(
            signUpData[firstNonEmptyIndex]
          );
          cy.wrap(inputs[secondNonEmptyIndex]).type(
            signUpData[secondNonEmptyIndex]
          );
          cy.contains("Sign Up").click();
          cy.wait(500)
          cy.get(`div[class="reg_errorMessageBox__G4I4q"]`)
            .eq(0)
            .should("be.visible");
          cy.get(`div[class="reg_errorMessageBox__G4I4q"]`)
            .eq(1)
            .should("be.visible");
          cy.wait(1000);
          cy.wrap(inputs[firstNonEmptyIndex])
            .clear()
            .type(" ", { force: true })
            .type("{backspace}");
          cy.wrap(inputs[secondNonEmptyIndex])
            .clear()
            .type(" ", { force: true })
            .type("{backspace}");
        });

      });
  });

  it(`Checking sign up if all fields are empty`, () => {
    cy.get(signUpSelectors.inputs).find(`input`).each((input) => {
      cy.wrap(input).clear().type(" ", { force: true }).type("{backspace}");
    });
    cy.contains("Sign Up").click();
    cy.get(signUpSelectors.errorMsgs).should("be.visible");
  });

  it.only ("Full sign up and log in scenario", () => {
    cy.get(signUpSelectors.inputs).find(`input`).each((input, index) => {
      cy.wrap(input).type(validSignUpData[index])
  })
  cy.contains("Sign Up").click();
  cy.wait(1000)
  cy.contains("Log In").click()
  cy.loginWithoutSession(validSignUpData[1], validSignUpData[2]);
  cy.wait(1000)
  cy.url().then(url => {
   expect(url).to.contain("/cashier");
  })
});


})