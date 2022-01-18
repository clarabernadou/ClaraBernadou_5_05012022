console.log("coucou");

//LOCAL STORAGE
let productSaveInLS = JSON.parse(localStorage.getItem("product"));
console.log(productSaveInLS);

//CART
const cartDisplay = document.querySelector("#cartAndFormContainer");
console.log(cartDisplay);

//CART IS EMPTY
if(productSaveInLS === null || productSaveInLS == 0){
const cartEmpty = `
    <div class="cartAndFormContainer">
        <div>Le panier est vide</div>
    </div>
`;
cartDisplay.innerHTML = cartEmpty;
}else{
    let structureCart = [];

//DISPLAY PRODUCT(S) IN CART
for(k = 0; k < productSaveInLS.length; k++){
    structureCart = structureCart + `
<article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
    <div class="cart__item__img">
    <img src="${productSaveInLS[k].imageUrl}" alt="${productSaveInLS[k].altTxt}">
    </div>
    <div class="cart__item__content">
    <div class="cart__item__content__description">
        <h2>${productSaveInLS[k].nameProduct}</h2>
        <p>${productSaveInLS[k].optionsProduct}</p>
        <p>${productSaveInLS[k].priceProduct} €</p>
    </div>
    <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
        <p>Quantité : ${productSaveInLS[k].quantityProduct}</p>
        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
        </div>
        <div class="cart__item__content__settings__delete">
        <p class="deleteItem">Supprimer</p>
        </div>
    </div>
    </div>
</article>
    `;
}
if(k == productSaveInLS.length){
    cartDisplay.innerHTML = structureCart;
}
}

//DELETE PRODUCT IN CART
let deleteProduct = document.querySelectorAll("deleteProduct");
console.log(deleteProduct);

for(let l = 0; l < deleteProduct.length; l++){
    deleteProduct[1].addEventListener(("click") , (event) =>{
        event.preventDefault();
    
        let id_selectDelete = productSaveInLS[l].id_ProductSelect
        console.log("id_selectDelete");
        console.log(id_selectDelete);

        productSaveInLS = productSaveInLS.filter( element => element.id_ProductSelect !== id_selectDelete);
        console.log(productSaveInLS);

        localStorage.setItem("product", JSON.stringify(productSaveInLS));

        alert("Ce produit a été supprimé du panier");
        window.location.href = "cart.html"
    });
}

//CALCULATE THE PRICE OF THE PRODUCTS IN THE CART
let totalPriceInCart = [];
for (let m = 0; m < productSaveInLS.length; m++){
    let priceProductsInCart = productSaveInLS[m].price;

    totalPriceInCart.push(priceProductsInCart)
    console.log(totalPriceInCart);
}

//ADD THE PRICES
const reducer = (accumulator, currentValue) => accumulator + currentValue;
const totalPrice = priceProductsInCart.reduce(reducer,0);
console.log(totalPrice);

//PRICE DISPLAY ON HTML
const priceDisplay = `
<span id="totalPrice">${totalPrice}</span>
`

//FORM
const displayForm = () =>{
const positionElement = document.querySelector("#cartAndFormContainer");

const structureForm = `
<div class="cart__order">
<form method="get" class="cart__order__form">
  <div class="cart__order__form__question">
    <label for="firstName">Prénom: </label>
    <input type="text" name="firstName" id="firstName" required>
    <p id="firstNameErrorMsg"><!-- ci est un message d'erreur --></p>
  </div>
  <div class="cart__order__form__question">
    <label for="lastName">Nom: </label>
    <input type="text" name="lastName" id="lastName" required>
    <p id="lastNameErrorMsg"></p>
  </div>
  <div class="cart__order__form__question">
    <label for="address">Adresse: </label>
    <input type="text" name="address" id="address" required>
    <p id="addressErrorMsg"></p>
  </div>
  <div class="cart__order__form__question">
    <label for="city">Ville: </label>
    <input type="text" name="city" id="city" required>
    <p id="cityErrorMsg"></p>
  </div>
  <div class="cart__order__form__question">
    <label for="email">Email: </label>
    <input type="email" name="email" id="email" required>
    <p id="emailErrorMsg"></p>
  </div>
  <div class="cart__order__form__submit">
    <input type="submit" value="Commander !" id="order">
  </div>
</form>
</div>
`;
    positionElement.insertAdjacentHTML("afterend", structureForm);
};

displayForm();
