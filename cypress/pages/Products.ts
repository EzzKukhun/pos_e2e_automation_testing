import { Product } from "../support/types";
import { productFormSelectors } from "../fixtures/selectors";

export class Products {
  productName: string;
  productCode: string;
  productCategory: string;
  productQuantity: number;
  productCost: number;
  productPrice: number;
  productDesc: string;
  productImage: string;

  constructor(
    productName,
    productCode,
    productCategory,
    productQuantity,
    productCost,
    productPrice,
    productDesc,
    productImage
  ) {
    this.productName = productName;
    this.productCode = productCode;
    this.productCategory = productCategory;
    this.productQuantity = productQuantity;
    this.productCost = productCost;
    this.productPrice = productPrice;
    this.productDesc = productDesc;
    this.productImage = productImage;
  }

  public addProduct() {
    cy.contains("button", productFormSelectors.addNewProductBtnText).click();
    cy.get(productFormSelectors.productName).type(this.productName);
    cy.get(productFormSelectors.productCode).type(this.productCode);
    cy.dropdownSelect('Category', this.productCategory);

    cy.get(productFormSelectors.productQuantity).type(
      this.productQuantity.toString()
    );
    cy.get(productFormSelectors.productPrice).type(
      this.productPrice.toString()
    );
    cy.get(productFormSelectors.productCost).type(this.productCost.toString());
    cy.get(productFormSelectors.productDesc).type(this.productDesc);
    cy.uploadFile(productFormSelectors.productImageFile, 'test.png')
  }
}
