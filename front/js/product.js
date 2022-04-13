let params = new URL(document.location).searchParams; //obtention de l'id produit nécessaire
let id = params.get("id");
let productUrl = `http://localhost:3000/api/products/${id}`;
let arrayProductsInCart = []; //Gestion du localStorage

//récupération des données du produit

fetch(productUrl).then((response) =>
    response.json().then((data) => {

        //Placement des différentes données dans la page, en utilisant une autre méthode que dans script.js pour insérer le contenu.

        document.title = data.name;
        document.querySelector(".item__img").innerHTML = `<img src="${data.imageUrl}" alt="${data.altTxt}">`;
        document.querySelector("#title").innerHTML = data.name;
        document.querySelector("#price").innerHTML = data.price;
        document.querySelector("#description").innerHTML = data.description;
        for (let colors of data.colors) {
            document.querySelector("#colors").innerHTML += `<option value=${colors}>${colors}</options>`
        }
        addToCart();
    }))

//Fonction pour ajouter le produit au panier

function addToCart() {
    let itemQuantity = document.querySelector("#quantity");
    document.querySelector("#addToCart").addEventListener("click", () => {
        if (itemQuantity.value > 0 && itemQuantity.value < 101 && document.querySelector("#colors").value !== "") {
            var addedProduct = {
                cartId: id,
                cartColor: document.querySelector("#colors").value,
                cartQuantity: parseInt(document.querySelector("#quantity").value),
            }
            if (localStorage.getItem("products") !== null) { //Si le localStorage existe, on récupère le contenu.
                arrayProductsInCart = JSON.parse(localStorage.getItem("products"));
            }
            const findProduct = arrayProductsInCart.find(product =>                                         //Je recherches l'existence du produit dans mon panier en cherchant la couleur et le modèle de mon canapé dans le panier
                addedProduct.cartId === product.cartId && addedProduct.cartColor === product.cartColor)     //
            if (findProduct !== undefined) {                                //Si la recherche précédente a été fructueuse, j'ajoute la quantité du produit séléctionné au panier
                findProduct.cartQuantity += addedProduct.cartQuantity;      //
            }
            else {
                arrayProductsInCart.push(addedProduct);//Si le localStorage n'existe pas, on le crée contenant le produit ajouté.
            }
            localStorage.setItem("products", JSON.stringify(arrayProductsInCart));
            console.log(addedProduct);
            console.log(arrayProductsInCart);
            //confirmation d'ajout au panier
            alert(`Vous avez ajouté ${addedProduct.cartQuantity} Kanap de couleur ${addedProduct.cartColor} à votre panier!`);
        }
    })
}
