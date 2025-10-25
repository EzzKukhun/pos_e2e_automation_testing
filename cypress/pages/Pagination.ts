export class Pagination {

  

  public getProductsPerPage(selector: string, element: string): Cypress.Chainable<JQuery<HTMLTableRowElement>> {
    return cy.get(selector).find(element);
  }

  public moveToNextPage(selector: string) {
    return cy.get(`button[aria-label="Next"]`).eq(1).click();
  }
}
