import { Cashier } from "../../pages/Cashier";
const cashier = new Cashier();

describe("cashier test suite", () => {
  beforeEach("visit cashier page", () => {
    cy.visit("http://localhost:3000");
    cy.loginWithoutSession("ezzo123", "1234");
    cy.wait(1000);
  });

  it("test find product function", () => {
    cashier
      .getProductsPerPage(
        ".pos_items__aZSKv",
        `div[class='pos_item__EMtW2']`
      )
      .then((products) => {
        cashier.findProduct(products, 'Eggplant', '.pos_items__aZSKv', `div[class='pos_item__EMtW2']`,1)
      });
  });

  it.only ('move to next page', () =>{
   cashier
      .getProductsPerPage(
        ".pos_items__aZSKv",
        `div[class='pos_item__EMtW2']`
      )
      .then((products) => {
        cashier.findProduct(products, 'Potato', '.pos_items__aZSKv', `div[class='pos_item__EMtW2']`,1)
      });

  })
});
