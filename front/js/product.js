//URL RECOVERY
const queryString_url_id = window.location.search;

//EXTRACT ID
const id = queryString_url_id.split('/')[1];

//PRODUCT DISPLAY with find()
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
    document.getElementById("title").innerHTML = value.name;
});

//PLACE TO PUT THE CODE
const positionElement = document.querySelector(".item");




//
const structureProduct = ``
