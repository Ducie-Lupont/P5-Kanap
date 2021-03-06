let apiUrl = "http://localhost:3000/api/products";//définir l'url de l'api
fetch(apiUrl).then((response) =>
  response.json().then((data) => {
    const items = document.querySelector("#items");
    //création et insertion des objets html
    for (let products of data) {
      let productLink = document.createElement("a");              //création de l'élément hmtl
      productLink.href = `./product.html?id=${products._id}`;     //définition de son contenu
      items.append(productLink);                                  //Placement dans la page
      let productArticle = document.createElement("article");
      productLink.append(productArticle);
      let productImgUrl = document.createElement("img");
      productImgUrl.src = products.imageUrl;
      productImgUrl.alt = products.altTxt;
      productArticle.append(productImgUrl);
      let productTitle = document.createElement("h3");
      productTitle.textContent = products.name;
      productArticle.append(productTitle);
      let productDesc = document.createElement("p");
      productDesc.textContent = products.description;
      productArticle.append(productDesc);
    }
  })
);
