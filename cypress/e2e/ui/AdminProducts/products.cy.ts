import { Product } from "../../../pages/Products";
import { productTableSelectors } from "../../../fixtures/selectors";
import {
  findElement,
  deleteElement,
  getProductsPerPage,
  getProductsCountAtCurrentPage,
} from "./utils";
const testProduct = new Product();
const newProduct = new Product();
let productsCounter = 1;

describe("admin product page scenarios", () => {
  beforeEach("visit admin products page", () => {
    cy.visit("http://localhost:3000");
    cy.login("admin", "1234");
    cy.visit("http://localhost:3000/admin/newProduct");
    cy.wait(1000);
  });

  it.skip("add 50 products to the database from json file", () => {
    cy.fixture("products.json").then((products: Product[]) => {
      products.forEach((product: Product) => {
        newProduct.setProduct(
          product.productName,
          product.productCode,
          product.productCategory,
          product.productQuantity,
          product.productCost,
          product.productPrice,
          product.productDescription,
          product.productImageName
        );
        newProduct.addProduct();
      });
    });
  });

  it("delete one product when the number of rows per page is 10", () => {
    getProductsPerPage().then((productRows) => {
      findElement(productRows, "Orange Juice", productsCounter, 10);
    });
  });

  it("delete one product when the number of rows per page is 15", () => {
    cy.dropdownSelect("Range", "15").then(() => {
      getProductsPerPage().then((productRows) => {
        findElement(productRows, "Ground Beef", productsCounter, 15);
      });
    });
  });

  it("search for a product and delete it", () => {
    cy.findByLabelText("Search")
      .type("red apple")
      .then(() => {
        cy.get("td")
          .eq(8)
          .then((deleteBtn) => {
            deleteElement(deleteBtn);
          });
      });
  });

  it("search for a product that does not exist", () => {
    cy.findByLabelText("Search")
      .type("banana")
      .then(() => {
        getProductsCountAtCurrentPage().then((productsCount) => {
          expect(productsCount).to.eq(0);
        });
      });
  });
 
  it('update a product successfully without using search bar', () => {

  })

  it ('update a product with missing one of the required fields', () => {

  })

  it ('update the descriptor image for a product', () => {

  })

  it('search for a product and update it successfully', () => {

  })

  it('add a product and check if it is already added to cashier account', () => {

  })

  it('delete a product and check if it is already deleted at cashier account', () => {

  })
 
  it('update a product and check if it is already updated at cashier account', () => {

  })
});
