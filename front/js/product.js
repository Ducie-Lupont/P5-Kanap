let params = new URL(document.location).searchParams; //obtention de l'id produit nécessaire
let id = params.get("id");
let productUrl = `http://localhost:3000/api/products/${id}`;
fetch(productUrl).then((response) => //récupération des données du produit
  response.json().then((data) =>{
        document.title = data.name; //Placement des différentes données dans la page
        document.querySelector(".item__img").innerHTML = `<img src="${data.imageUrl}" alt="${data.altTxt}">`;
        document.querySelector("#title").innerHTML = data.name;
        document.querySelector("#price").innerHTML = data.price;
        document.querySelector("#description").innerHTML = data.description;
        for (let colors of data.colors){
            document.querySelector("#colors").innerHTML += `<option value=${colors}>${colors}</options>`
        }
        pouet(); //addToCart
}))
function pouet() { //addToCart---Fonction pour ajouter le produit au panier
    let itemQuantity = document.querySelector("#quantity");
    document.querySelector("#addToCart").addEventListener("click", () =>{
        if (itemQuantity.value > 0 && itemQuantity.value < 101){
            let addedProduct ={
                cartId: id,
                cartColor:document.querySelector("#colors").value,
                cartQuantity:parseInt(document.querySelector("#quantity").value),
            }
            let arrayProductsInCart = []; //Gestion du localStorage
            if (localStorage.getItem("products") !== null) { //Si le localStorage existe, on récupère le contenu, on l'insère dans le tableau, puis on le renvoie avec le nouveau contenu
                arrayProductsInCart = JSON.parse(localStorage.getItem("products"));
            }
            arrayProductsInCart.push(addedProduct); //Si le localStorage n'existe pas, on le crée contenant le produit ajouté.
            localStorage.setItem("products", JSON.stringify(arrayProductsInCart));
            console.log(addedProduct);
            //confirmation d'ajout au panier
            alert(`Vous avez ajouté ${addedProduct.cartQuantity} Kanap de couleur ${addedProduct.cartColor} à votre panier!`);
        }
        
    })
}
