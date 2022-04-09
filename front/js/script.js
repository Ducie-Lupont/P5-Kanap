let apiUrl="http://localhost:3000/api/products";//définir l'url de l'api
fetch(apiUrl).then((response) =>
  response.json().then((data) =>{
    const items = document.querySelector("#items");
    //création des objets html
    for (let products of data){
      let productLink = document.createElement("a");
      productLink.href = `./product.html?id=${products._id}`;
      items.append(productLink);
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
