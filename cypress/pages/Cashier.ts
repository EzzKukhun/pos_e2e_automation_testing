import { Pagination } from "./Pagination";

export class Cashier extends Pagination {
  foundElement: JQuery<HTMLTableCellElement> | JQuery<HTMLElement> = null;

  public findProduct(
    products: any,
    productName: string,
    selector: string,
    element: string,
    productsCounter: number
  ) {
    return cy
      .wrap(products)
      .each((product) => {
        cy.wrap(product)
          .find("h3")
          .then((title) => {
            const cardTitle = title.text();
            if (`` + cardTitle === productName) {
              this.foundElement = product;
              console.log(cardTitle);
              return;
            } else if (productsCounter == products.length) {
              this.getTotalPagesNumber()
              this.moveToNextPage().then(() => {
                this.getProductsPerPage(selector, element).then(
                  (productRows) => {
                    this.findProduct(
                      productRows,
                      productName,
                      selector,
                      element,
                      (productsCounter = 1)
                    );
                  }
                );
              });
            } else {
              productsCounter++;
            }
          });
      })
      .then(() => {
        return this.foundElement;
      });
  }
  public moveToNextPage() {
    return cy.get(`button[aria-label="Next"]`).click();
  }

  public getTotalPagesNumber(): Cypress.Chainable<number> {
     return cy.get(`.pos_productsListFooter__Ts2BE`)
      .find("h4")
      .invoke("text")
      .then((expression) => {
        const expressionTokens = expression.split("of");
        const totalPagesNumber = parseInt(expressionTokens[1]);
        return totalPagesNumber
      })
  }
}
