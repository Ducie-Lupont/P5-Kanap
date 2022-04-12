let arrayProductsInCart = JSON.parse(localStorage.getItem("products"))
console.log(arrayProductsInCart)
const cartItems = document.querySelector("#cart__items")


if (arrayProductsInCart) {
    for (let cartContent of arrayProductsInCart) {
        fetch(`http://localhost:3000/api/products/${cartContent.cartId}`).then((response) =>
            response.json().then((data) => {
                displayCart(cartContent, data)
                totalArticles(arrayProductsInCart)
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
    let divContentSettings = document.createElement("div");
    let divContentSettingsQuantity = document.createElement("div");
    let contentSettingsQuantityValue = document.createElement("p");
    let contentSettingsQuantityInput = document.createElement("input");
    let contentSettingsDelete = document.createElement("div");
    let contentSettingsDeleteItem = document.createElement("p");
    cartItem.className = "cart__item";
    cartItem.dataset.id = cartContent.cartId;
    cartItem.dataset.color = cartContent.cartColor;
    cartItemDivImg.className = "cart__item__img";
    cartItemImg.src = data.imageUrl;
    cartItemImg.alt = data.altTxt;
    cartItemDivContent.className = "cart__item__content";
    cartItemDivContentDesc.className = "cart__item__content__description";
    cartItemProductName.textContent = data.name;
    cartItemProductColor.textContent = cartContent.cartColor;
    cartItemProductPrice.textContent = data.price + " €";
    divContentSettings.className = "cart__item__content__settings";
    divContentSettingsQuantity.className = "cart__item__content__settings__quantity";
    contentSettingsQuantityValue.textContent = "Qté : ";
    contentSettingsQuantityInput.type = "number";
    contentSettingsQuantityInput.className = "itemQuantity";
    contentSettingsQuantityInput.name = "itemQuantity";
    contentSettingsQuantityInput.min = "1";
    contentSettingsQuantityInput.max = "101";
    contentSettingsQuantityInput.value = cartContent.cartQuantity;
    contentSettingsQuantityInput.onchange = changeQuantity;
    contentSettingsDelete.className = "cart__item__content__settings__delete";
    contentSettingsDeleteItem.className = "deleteItem";
    contentSettingsDeleteItem.textContent = "Supprimer";
    contentSettingsDeleteItem.onclick = deletingItem;
    cartItems.append(cartItem);
    cartItem.append(cartItemDivImg);
    cartItemDivImg.append(cartItemImg);
    cartItem.append(cartItemDivContent);
    cartItemDivContent.append(cartItemDivContentDesc);
    cartItemDivContentDesc.append(cartItemProductName);
    cartItemDivContentDesc.append(cartItemProductColor);
    cartItemDivContentDesc.append(cartItemProductPrice);
    cartItemDivContent.append(divContentSettings);
    divContentSettings.append(divContentSettingsQuantity);
    divContentSettingsQuantity.append(contentSettingsQuantityValue);
    divContentSettingsQuantity.append(contentSettingsQuantityInput);
    divContentSettings.append(contentSettingsDelete);
    contentSettingsDelete.append(contentSettingsDeleteItem);
}

function deletingItem(event) {
    let arrayProductsInCart = JSON.parse(localStorage.getItem("products"))
    const productToDelete = event.target
    const closestArticle = productToDelete.closest("article");//récupérer l'arcle à supprimer
    const articleId = closestArticle.dataset.id;
    const articleColor = closestArticle.dataset.color;
    if (confirm("Voulez-vous vraiment supprimer cet article de votre panier?")) {
        closestArticle.remove()
        const filteredArray = arrayProductsInCart.filter(kanap => kanap.cartId != articleId || kanap.cartColor != articleColor)
        localStorage.setItem("products", JSON.stringify(filteredArray))
        totalArticles(filteredArray)
        alert("Produit supprimé de votre panier!")
    }
}

function changeQuantity(event) {
    let arrayProductsInCart = JSON.parse(localStorage.getItem("products"))
    const productQuantity = parseInt(event.target.value)
    const closestArticle = event.target.closest("article")//récupérer l'arcle à supprimer
    const articleId = closestArticle.dataset.id
    const articleColor = closestArticle.dataset.color

    const sofa = arrayProductsInCart.find(product =>
        articleId === product.cartId && articleColor === product.cartColor)
    if (sofa) {
        sofa.cartQuantity = productQuantity
        localStorage.setItem("products", JSON.stringify(arrayProductsInCart))
        totalArticles(arrayProductsInCart)
    }
}

function totalArticles(cart) {
    let totalPrice = 0
    let totalQuantity = 0
    for (const kanap of cart) {
        fetch(`http://localhost:3000/api/products/${kanap.cartId}`).then((response) =>
            response.json().then((data) => {
                totalPrice += data.price * kanap.cartQuantity
                totalQuantity += kanap.cartQuantity
                const priceDiv = document.querySelector("#totalPrice")
                const quantityDiv = document.querySelector("#totalQuantity")
                priceDiv.textContent = totalPrice
                quantityDiv.textContent = totalQuantity
            }))
    }
    if (!cart) {
        const priceDiv = document.querySelector("#totalPrice")
        const quantityDiv = document.querySelector("#totalQuantity")
        priceDiv.textContent = totalPrice
        quantityDiv.textContent = totalQuantity
    }
}