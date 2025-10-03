import { productFormSelectors } from "../fixtures/selectors";
import { productTableSelectors } from "../fixtures/selectors";
let productsCounter = 1;

export class Product {
  productName: string;
  productCode: string;
  productCategory: string;
  productQuantity: number;
  productCost: number;
  productPrice: number;
  productDescription: string;
  productImageName: string;

  public setProduct(
    productName,
    productCode,
    productCategory,
    productQuantity,
    productCost,
    productPrice,
    productDescription,
    productImageName
  ) {
    this.productName = productName;
    this.productCode = productCode;
    this.productCategory = productCategory;
    this.productQuantity = productQuantity;
    this.productCost = productCost;
    this.productPrice = productPrice;
    this.productDescription = productDescription;
    this.productImageName = productImageName;
  }

  public addProduct() {
    cy.contains("button", productFormSelectors.addNewProductBtnText).click();
    cy.get(productFormSelectors.productName).type(this.productName);
    cy.get(productFormSelectors.productCode).type(this.productCode);
    cy.dropdownSelect("Category", this.productCategory);
    cy.get(productFormSelectors.productQuantity).type(
      this.productQuantity.toString()
    );
    cy.get(productFormSelectors.productPrice).type(
      this.productPrice.toString()
    );
    cy.get(productFormSelectors.productCost).type(this.productCost.toString());
    cy.get(productFormSelectors.productDescription).type(
      this.productDescription
    );
    cy.uploadFile(productFormSelectors.productImageFile, this.productImageName);
    cy.contains("button", "Save").click();
    cy.wait(200);
    cy.get(`div[class="swal-modal"]`).find("div").contains("Good Job!");
    cy.wait(200);
    cy.get(`div[class="swal-modal"]`).find("button").contains("OK").click();
    cy.wait(200);
  }

  public findElementToBeDeleted(
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
              this.deleteElement(cells[8]);
              return;
            } else {
              this.moveToNextPage().then(() => {
                this.getProductsPerPage().then((productRows) => {
                  this.findElementToBeDeleted(
                    productRows,
                    productName,
                    (productsCounter += 1),
                    productsPerPageNumber
                  );
                });
              });
            }
          } else if (cells[1].innerText === productName) {
            this.deleteElement(cells[8]);
          } else {
            productsCounter++;
          }
        });
    });
  }

  public deleteElement(deleteBtn: HTMLTableCellElement | JQuery<HTMLElement>) {
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

  public getProductsPerPage(): Cypress.Chainable<JQuery<HTMLTableRowElement>> {
    return cy.get(productTableSelectors.productTableBody).find("tr");
  }

  public getProductsCountAtCurrentPage() {
    return cy.get(productTableSelectors.productTableBody).then((tableBody) => {
      const rows = tableBody.find("tr"); // this is a jQuery command since it is requested by yielded subject
      return rows.length;
    });
  }

  public findElementToBeUpdated(
    productRows,
    productName: string,
    productsCounter: number,
    productsPerPageNumber: number,
    elementsToBeUpdated: any[]
  ) {
    cy.wrap(productRows).each((row) => {
      cy.wrap(row)
        .find("td")
        .then((cells) => {
          if (productsCounter % productsPerPageNumber === 0) {
            if (cells[1].innerText === productName) {
              cy.wrap(cells[7]).click();
              this.updateProduct(elementsToBeUpdated);
              return;
            } else {
              this.moveToNextPage().then(() => {
                this.getProductsPerPage().then((productRows) => {
                  this.findElementToBeUpdated(
                    productRows,
                    productName,
                    (productsCounter += 1),
                    productsPerPageNumber,
                    elementsToBeUpdated
                  );
                });
              });
            }
          } else if (cells[1].innerText === productName) {
            cy.wrap(cells[7]).click();
            this.updateProduct(elementsToBeUpdated);
          } else {
            productsCounter++;
          }
        });
    });
  }

  public updateProduct(elementsToBeUpdated: any[]) {
    cy.wrap(elementsToBeUpdated)
      .each((element) => {
        const [key, value] = Object.entries(element)[0];
        if (`` + key === "productCategory") {
          cy.dropdownSelect("Category", `` + value);
        } else if (`` + key === "productDescription") {
          cy.get(`textarea[name='productDesc']`).type(
            "{selectall}{backspace}" + value
          );
        } else {
          cy.get(`input[name='${key}']`).type("{selectall}{backspace}" + value);
        }
      })
      .then(() => {
        cy.contains("button", "Save").click();
      });
  }

  public moveToNextPage() {
    return cy.get(`button[aria-label="Next"]`).eq(1).click();
  }
}
