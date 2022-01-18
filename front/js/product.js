//URL RECOVERY
const queryString_url_id = window.location.search;

//EXTRACT ID
const id = queryString_url_id.split('/')[1];

//PRODUCT DISPLAY
const getProduct = async () => {
    let rep = {};
    await fetch(`http://localhost:3000/api/products/${id}`).then(function (a) {
        return a.json();
    })
    .then(function (json) {
        rep = json;
    });
    return rep;
};

getProduct().then((value) => {
    console.log(value);
    document.getElementById("title").innerHTML = value.name;
    document.getElementById("description").innerHTML = value.description;
    document.querySelector(".item__img").innerHTML = `<img src=${value.imageUrl} alt=${value.altTxt}>`;
    document.getElementById("price").innerHTML = value.price;
    document.querySelector(".item__content__settings__color").innerHTML = `
    <label for="color-select">Choisir une couleur :</label>
    <select name="color-select" id="colors">
        <option value="">--SVP, choisissez une couleur --</option>
        <option value="${value.colors[0]}">${value.colors[0]}</option>
    </select>
    `; 
    
});

//CART BUTTON
const btn_sendInCart = document.querySelector("#addToCart");
console.log(btn_sendInCart);

//ADD THE PRODUCT IN CART
btn_sendInCart.addEventListener("click", (event)=>{
event.preventDefault();
const choiceForm = idForm.value;

let optionsProduct = {
    title: queryString_url_id.name,
    id : queryString_url_id._id,
    item__content__settings__color : choiceForm,
    price : queryString_url_id.price /100
}

console.log(optionsProduct);

//LOCAL STORAGE
let productSaveInLS = JSON.parse(localStorage.getItem("product"));
});