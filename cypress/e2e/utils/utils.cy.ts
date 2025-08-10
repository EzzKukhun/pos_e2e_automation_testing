const dropdownValidation = (label: string, optionValue: string) => {
  cy.contains(label, optionValue)
    .parent() // go to the container div
    .find('[role="button"]') // MUI select root
    .click();
  cy.get('ul[role="listbox"] li')
    .contains(optionValue) // the option text
    .click();
  cy.contains(label, optionValue)
    .parent()
    .find('[role="button"]')
    .should("contain.text", optionValue);
};

