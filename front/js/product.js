
const product = window.location.search.split("?").join("");
console.log(product);

let productData = [];

//API CONNECTION FOR PRODUCT RECOVERY IN API
const fetchProduct = async () => {
    await fetch(`http://localhost:3000/api/products${product}`)
    .then((res) => res.json())
    .then((promise) => {
        productData = promise
        console.log(productData);
    });
};

const productDisplay = async () => {
    await fetchProduct();

// ADD PRODUCT RECOVERY
document.getElementById("item").innerHTML = `
<section id="card${productData._id}" class="item">
    <article>
        <img class="item__img" src="${productData.imageUrl}" alt="image d'un canapé ${
            productData.name
        }" />
        <div class="item__content">
            <div class="item__content__titlePrice">
                <h3 class="title">${productData.name.toUpperCase()}</h3>
                <span id="price">${productData.price
                    .toString()
                    .replace(/0+$/, "")}Euro
                </span>
            </div>
            <div class="item__content__description">
                <p class="item__content__description__title">${productData.descriptionTitle}</p>
                <p id="description">${productData.description}</p>
            </div>
            <div class="item__content__settings">
                <div class="item__content__settings__color">
                    <label for="color-select">Choisir une couleur :</label>
                    <select name="color-select" id="colors">
                    </select>
                </div>
            </div>
            <div class="item__content__settings__quantity">
                  <label for="itemQuantity">Nombre d'article(s) (1-100) :</label>
                  <input type="number" name="itemQuantity" min="1" max="100" value="0" id="quantity">
            </div>
        </div>    
    </article>
    <div class="item__content__addButton">
        <button id="${productData._id} addToCart">Ajouter au panier</button>
    </div>
</section>
    `;

let select = document.getElementById("colors")
console.log(select);

// CHOOSE THE COLOR OF THE SOFAS
console.log(productData.coloured);
    productData.coloured.forEach((color) => {
        document.createElement("option"));
        let tagOption = document.createElement("option");

        tagOption.innerHTML = `${color}`;
        tagOption.value = `${color}`;

        select.appendChild(tagOption);
        console.log(tagOption)
    });   
};

productDisplay();