let arrayProductsInCart = JSON.parse(localStorage.getItem("products"))
console.log(arrayProductsInCart)
const cartItems = document.querySelector("#cart__items")


if (arrayProductsInCart) {
    for (let cartContent of arrayProductsInCart) {
        fetch(`http://localhost:3000/api/products/${cartContent.cartId}`).then((response) =>
            response.json().then((data) => {
                displayCart(cartContent, data)
            }))
    }
}


function displayCart(cartContent, data) {
    let cartItem = document.createElement("article");
    let cartItemDivImg = document.createElement("div");
    let cartItemImg = document.createElement("img");
    let cartItemDivContent = document.createElement("div");
    let cartItemDivContentDesc = document.createElement("div");
    let cartItemProductName = document.createElement("h2");
    let cartItemProductColor = document.createElement("p");
    let cartItemProductPrice = document.createElement("p");
    let DivContentSettings = document.createElement("div");
    let DivContentSettingsQuantity = document.createElement("div");
    let ContentSettingsQuantityValue = document.createElement("p");
    let ContentSettingsQuantityInput = document.createElement("input");
    let ContentSettingsDelete = document.createElement("div");
    let ContentSettingsDeleteItem = document.createElement("p");
    
}