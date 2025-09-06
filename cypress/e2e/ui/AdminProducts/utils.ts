import { productTableSelectors } from "../../../fixtures/selectors";
let productsCounter  =1; 

export function findElement(
  productRows,
  productName: string,
  productsCounter: number,
  productsPerPageNumber: number
) {
  cy.wrap(productRows).each((row) => {
    cy.wrap(row)
      .find("td")
      .then((cells) => {
        if (productsCounter % productsPerPageNumber === 0) {
          if (cells[1].innerText === productName) {
            deleteElement(cells[8])
            return;
          } else {
            moveToNextPage().then(() => {
              getProductsPerPage().then((productRows) => {
                findElement(
                  productRows,
                  productName,
                  (productsCounter += 1),
                  productsPerPageNumber
                );
              });
            });
          }
        } else if (cells[1].innerText === productName) {
          deleteElement(cells[8])       
        } else {
          productsCounter++;
        }
      });
  });
}

export function deleteElement(deleteBtn: HTMLTableCellElement | JQuery<HTMLElement>) {
  cy.wrap(deleteBtn)
    .click()
    .get(`div[class="swal-modal"]`)
    .find("button")
    .contains("OK")
    .click()
    .then(() => {
      productsCounter = 1;
      return;
    });
}

export function getProductsPerPage(): Cypress.Chainable<JQuery<HTMLTableRowElement>> {
  return cy.get(productTableSelectors.productTableBody).find("tr");
}

export function getProductsCountAtCurrentPage () {
  return cy.get(productTableSelectors.productTableBody).then((tableBody) => {
    const rows = tableBody.find("tr"); // this is a jQuery command since it is requested by yielded subject
    return rows.length
  })
}

function moveToNextPage() {
  return cy.get(`button[aria-label="Next"]`).eq(1).click();
}
