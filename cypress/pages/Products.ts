import { productFormSelectors } from "../fixtures/selectors";

export class Product {
  productName: string;
  productCode: string;
  productCategory: string;
  productQuantity: number;
  productCost: number;
  productPrice: number;
  productDescription: string;
  productImageName: string;

  

  public setProduct (
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
    cy.get(productFormSelectors.productDescription).type(this.productDescription);
    cy.uploadFile(productFormSelectors.productImageFile, this.productImageName);
    cy.contains("button", "Save").click();
    cy.wait(200);
    cy.get(`div[class="swal-modal"]`).find("div").contains("Good Job!");
    cy.wait(200)
    cy.get(`div[class="swal-modal"]`).find("button").contains("OK").click();
    cy.wait(200)
  }
}
