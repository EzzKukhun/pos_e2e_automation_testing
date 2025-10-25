import { Cashier } from "../../pages/Cashier";
import { Product } from "../../pages/Products";
const product = new Product();
const newProduct = new Product();
const cashier = new Cashier();

let productsCounter = 1;
const productToBeUpdatedWithoutUpdateImage = [
  {
    productCode: "VEG-020-1",
  },
  {
    productDescription: "Eggplant!",
  },
  {
    productQuantity: "200",
  },
  {
    productCost: "150",
  },
  {
    productImage: "red_pepper.jpeg",
  },
];

const productToBeUpdatedWithImage = [
  {
    productName: "Pepper",
  },
  {
    productImage: "red_pepper.jpg",
  },
];

const productToBeUpdated = [
  {
    productCode: "FRU-020-1",
  },
  {
    productDescription: "Fresh Apple!",
  },
  {
    productQuantity: "200",
  },
  {
    productCost: "150",
  },
  {
    productImage: "red_apple_1.jpg",
  },
];

describe("admin product page scenarios", () => {
  beforeEach("visit admin products page", () => {
    cy.visit("http://localhost:3000");
    cy.login("admin", "1234");
    cy.visit("http://localhost:3000/admin/newProduct");
    cy.wait(1000);
  });

  it("add 50 products to the database from json file", () => {
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
    product
      .getProductsPerPage()
      .then((productRows) => {
        product.findProduct(
          productRows,
          "Beef Tenderloin",
          productsCounter,
          10
        );
      })
      .then((element) => {
        product.deleteElement(element[8]);
      });
  });

  it("delete one product when the number of rows per page is 15", () => {
    cy.dropdownSelect("Range", "15")
      .then(() => {
        product.getProductsPerPage().then((productRows) => {
          product.findProduct(productRows, "Mango", productsCounter, 15);
        });
      })
      .then((element) => {
        product.deleteElement(element[8]);
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
      .type("Potato")
      .then(() => {
        product.getProductsCountAtCurrentPage().then((productsCount) => {
          expect(productsCount).to.eq(0);
        });
      });
  });

  it("update a product successfully without using search bar", () => {
    product
      .getProductsPerPage()
      .then((productRows) => {
        product.findProduct(productRows, "Eggplant", productsCounter, 10);
      })
      .then((element) => {
        cy.wrap(element[7])
          .click()
          .then(() => {
            product.updateProduct(productToBeUpdatedWithoutUpdateImage);
          });
      });
  });

  it("update the descriptor image for a product", () => {
    product
      .getProductsPerPage()
      .then((productRows) => {
        product.findProduct(productRows, "Pepper", productsCounter, 10);
      })
      .then((element) => {
        cy.wrap(element[7]).then(() => {
          product.updateProduct(productToBeUpdatedWithImage);
        });
      });
  });

  it("search for a product and update it successfully", () => {
    cy.findByLabelText("Search")
      .type("red apple")
      .then(() => {
        cy.get("td")
          .eq(7)
          .click()
          .then(() => {
            product.updateProduct(productToBeUpdated);
          });
      });
  });

  it("add a product and check if it is already added to cashier account", () => {
    product.setProduct(
      "Pepper",
      "VEG-10-20",
      "Vegetables",
      10,
      10,
      20,
      "This is a new product",
      "red_pepper.jpg"
    );
    product.addProduct().then(() => {
      cy.get(`div[class="swal-modal"]`).find("button").contains("OK").click();
      cy.wait(200);
      cy.contains("LogOut")
        .click()
        .then(() => {
          cy.contains("OK").click();
          cy.loginWithoutSession("ezzo123", "1234");
          cashier
            .getProductsPerPage(
              ".pos_items__aZSKv",
              `div[class='pos_item__EMtW2']`
            )
            .then((products) => {
              cashier.findProduct(
                products,
                "Pepper",
                ".pos_items__aZSKv",
                `div[class='pos_item__EMtW2']`,
                1
              );
            });
        });
    });
  });

  it.only("delete a product and check if it is already deleted at cashier account", () => {
    product.getProductsPerPage().then((products) => {
      product
        .findProduct(products, "Chicken Drumsticks", (productsCounter = 1), 10)
        .then((productToBeDeleted) => {
          product.deleteElement(productToBeDeleted[8]);
        })
        .then(() => {
          cy.logout().then(() => {
            cy.loginWithoutSession("ezzo123", "1234").then(() => {
              cashier
                .getProductsPerPage(
                  ".pos_items__aZSKv",
                  `div[class='pos_item__EMtW2']`
                )
                .then((products) => {
                  cashier
                    .findProduct(
                      products,
                      "Chicken Drumsticks",
                      ".pos_items__aZSKv",
                      `div[class='pos_item__EMtW2']`,
                      1
                    )
                    .then((product) => {
                      console.log(product);
                    });
                });
            });
          });
        });
    });
  });

  it("update a product and check if it is already updated at cashier account", () => {});
});
