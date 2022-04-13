let arrayProductsInCart = JSON.parse(localStorage.getItem("products"))
const cartItems = document.querySelector("#cart__items")

//si arrayProductsInCart existe, alors je récupère l'intégralité des données sur ce produit à partir de l'api

if (arrayProductsInCart) {
    for (let cartContent of arrayProductsInCart) {
        fetch(`http://localhost:3000/api/products/${cartContent.cartId}`).then((response) =>
            response.json().then((data) => {
                displayCart(cartContent, data)
                totalArticles(arrayProductsInCart)
                const button = document.querySelector("#order")
                button.onclick = order
            }))
    }
}

//Implémentation des différents éléments html dans la page

function displayCart(cartContent, data) {
    let cartItem = document.createElement("article"); //création des variables contenant mes éléments html
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
    cartItem.className = "cart__item"; //création du contenu des éléments html
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
    cartItems.append(cartItem); //placement des éléments dans le html
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

//Fonction pour supprimer un élément du panier

function deletingItem(event) {
    let arrayProductsInCart = JSON.parse(localStorage.getItem("products"))
    const productToDelete = event.target
    const closestArticle = productToDelete.closest("article");
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

//Fonction pour modifier la quantité d'un élément

function changeQuantity(event) {
    let arrayProductsInCart = JSON.parse(localStorage.getItem("products"))
    const productQuantity = parseInt(event.target.value)
    const closestArticle = event.target.closest("article")
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

//calcul des totaux prix/quantité dans le panier

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

function order(event) {
    event.preventDefault() //empêcher le comportement par défaut(recharger la page ou rediriger) du bouton
    const pouetRegex = /^[A-zÀ-ú' -]+$/
    const addressRegex = /^([0-9]{1,}) ?([A-zÀ-ú,' .-]+$)/
    const emailRegex = /^[A-z0-9-_.]{1,}[@][A-z-]{2,}[.][A-z]{2,}$/g
    const firstNameInput = document.querySelector("#firstName").value
    const lastNameInput = document.querySelector("#lastName").value
    const addressInput = document.querySelector("#address").value
    const cityInput = document.querySelector("#city").value
    const emailInput = document.querySelector("#email").value
    const firstNameError = document.querySelector("#firstNameErrorMsg")
    const lastNameError = document.querySelector("#lastNameErrorMsg")
    const addressError = document.querySelector("#addressErrorMsg")
    const cityError = document.querySelector("#cityErrorMsg")
    const emailError = document.querySelector("#emailErrorMsg")
    let checkingInputs = true
    if (firstNameInput.match(pouetRegex)) {     //si il y a match
        firstNameError.textContent = ""         //Je vide le champ d'erreur
    }
    else {
        checkingInputs = false                  //Sinon, je signale l'erreur
        firstNameError.textContent = "Le champ n'est pas rempli correctement" //et je le signale a l'utilisateur
    }
    if (lastNameInput.match(pouetRegex)) {
        lastNameError.textContent = ""
    }
    else {
        checkingInputs = false
        lastNameError.textContent = "Le champ n'est pas rempli correctement"
    }
    if (addressInput.match(addressRegex)) {
        addressError.textContent = ""
    }
    else {
        checkingInputs = false
        addressError.textContent = "Le champ n'est pas rempli correctement"
    }
    if (cityInput.match(pouetRegex)) {
        cityError.textContent = ""
    }
    else {
        checkingInputs = false
        cityError.textContent = "Le champ n'est pas rempli correctement"
    }
    if (emailInput.match(emailRegex)) {
        emailError.textContent = ""
    }
    else {
        checkingInputs = false
        emailError.textContent = "Le champ n'est pas rempli correctement"
    }
    if (checkingInputs == false) {
        return
    }
    let contact = {                     //créer l'objet contact
        firstName: firstNameInput,
        lastName: lastNameInput,
        address: addressInput,
        city: cityInput,
        email: emailInput
    }
    let products = []
    let arrayProductsInCart = JSON.parse(localStorage.getItem("products"))
    for (let product of arrayProductsInCart) {
        products.push(product.cartId)
    }
    fetch("http://localhost:3000/api/products/order", {
        method: "POST",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ products, contact })
    }).then((response) =>
        response.json().then((data) => {
            localStorage.clear()
            location.href = `./confirmation.html?order=${data.orderId}`
        }))
}