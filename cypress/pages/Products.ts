import { Product } from "../support/types";
import {productFormSelectors} from "../fixtures/selectors";

class Products {
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
    cy.contains(productFormSelectors.addNewProductBtnText).click()
    cy.get(productFormSelectors.productName).type(this.productName)
    cy.get(productFormSelectors.productCode).type(this.productCode)
    cy.get(productFormSelectors.productCategory).contains(this.productName).click()
    cy.get(productFormSelectors.productQuantity).type(String(this.productQuantity))
    cy.get(productFormSelectors.productPrice).type(this.productPrice.toString())
    cy.get(productFormSelectors.productCost).type(this.productCost.toString())
    cy.get(productFormSelectors.productDesc).type(this.productDesc)
  }
}
