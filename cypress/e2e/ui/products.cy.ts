import { Product } from "../../pages/Products";
import { productTableSelectors } from "../../fixtures/selectors";
import {
  findElementToBeDeleted,
  deleteElement,
  getProductsPerPage,
  getProductsCountAtCurrentPage,
  findElementToBeUpdated,
} from "./utils";
const testProduct = new Product();
const product = new Product();
const newProduct = new Product();
let productsCounter = 1;
let productToBeUpdated = [
  {
    "productName": "Pepper",
  },
  {
    "productCode": "VEG-020-1",
  },
  {
    "productDescription": "Fresh Pepper With Updated Code",
  },
  {
    'productQuantity': "200",
  },
  {
    "productCost": "150",
  }
];

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
    product.getProductsPerPage().then((productRows) => {
      product.findElementToBeDeleted(productRows, "Veal Cutlets", productsCounter, 10);
    });
  });

  it.only("delete one product when the number of rows per page is 15", () => {
    cy.dropdownSelect("Range", "15").then(() => {
      product.getProductsPerPage().then((productRows) => {
        product.findElementToBeDeleted(productRows, "Chicken Gizzards", productsCounter, 15);
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
            product.deleteElement(deleteBtn);
          });
      });
  });

  it("search for a product that does not exist", () => {
    cy.findByLabelText("Search")
      .type("banana")
      .then(() => {
        product.getProductsCountAtCurrentPage().then((productsCount) => {
          expect(productsCount).to.eq(0);
        });
      });
  });

  it("update a product successfully without using search bar", () => {
    product.getProductsPerPage().then((productRows) => {
      product.findElementToBeUpdated(
        productRows,
        "Bell Pepper",
        productsCounter,
        10,
        productToBeUpdated
      );
    });
  });

  it("update a product with missing one of the required fields", () => {});

  it("update the descriptor image for a product", () => {});

  it("search for a product and update it successfully", () => {});

  it("add a product and check if it is already added to cashier account", () => {});

  it("delete a product and check if it is already deleted at cashier account", () => {});

  it("update a product and check if it is already updated at cashier account", () => {});
});
