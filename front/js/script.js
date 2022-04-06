let apiUrl="http://localhost:3000/api/products";//définir l'url de l'api
fetch(apiUrl).then((response) =>
  response.json().then((data) =>{
    let affichage ="";
    for (let products of data){
      affichage += `
        <a href='./product.html?id=${products._id}'>
          <article>
            <img src="${products.imageUrl}" alt="${products.altTxt}">
            <h3 class="productName">${products.name}</h3>
            <p class="productDescription">${products.description}</p>
          </article>
        </a>
      `;
    }
    document.querySelector("#items").innerHTML = affichage;
  })
);
