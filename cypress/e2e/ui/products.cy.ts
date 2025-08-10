import { Products } from "../../pages/Products";
const product = new Products(
  "Test Product",
  "TP001",
  "Fruits",
  100,
  50,
  75,
  "This is a test product description.",
  "test-image.jpg"
);
describe("admin product page scenarios", () => {
  beforeEach("visit admin products page", () => {
    cy.visit("http://localhost:3000");
    cy.login("admin", "1234");
  });
  it("add new product", () => {
    cy.visit("http://localhost:3000/admin/newProduct").then(() => {
      product.addProduct();
    });
  });
});
