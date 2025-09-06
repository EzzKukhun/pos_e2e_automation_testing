export const signUpSelectors = {
  inputs: 'div[class="reg_logIn__nX3fA"]',
  errorMsgs: `div[class="reg_errorMessageBox__G4I4q"]`,
};

export const productFormSelectors = {
    productName: `input[name="productName"]`,
    productCode: `input[name="productCode"]`, 
    productCategory: `input[name="productCategory"]`, 
    productQuantity: `input[name="productQuantity"]`, 
    productCost: `input[name="productCost"]`, 
    productPrice: `input[name="productPrice"]`, 
    productDescription: `textarea[name="productDesc"]`,
    productImageFile: `input[name='file']`,
    addNewProductBtnText: `Add New Product`
}

export const productTableSelectors = {
  productTableBody: `tbody[class="table_tableBody__FOB0D"]`,

}
module.exports = {signUpSelectors, productFormSelectors, productTableSelectors};