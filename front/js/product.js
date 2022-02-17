//URL RECOVERY
const queryString_url_id = window.location.search;

//EXTRACT ID
const productId = queryString_url_id.split('/')[1];

//PRODUCTS RECOVERY (API REQUEST)
const getProduct = async () => {
    let rep = {};
    await fetch(`http://localhost:3000/api/products/${productId}`).then(function (a) {
        return a.json();
    })
    .then(function (json) {
        rep = json;
    });
    return rep;
};

//PRODUCTS DISPLAY
async function renderProduct(){
getProduct().then((value) => {
    console.log(value);
    document.getElementById("title").innerHTML = value.name;
    document.getElementById("description").innerHTML = value.description;
    document.querySelector(".item__img").innerHTML = `<img src=${value.imageUrl} alt=${value.altTxt}>`;
    document.getElementById("price").innerHTML = value.price;
    let sel = document.getElementById('colors');
        value.colors.forEach( function(color){
          let opt = document.createElement('option');
          opt.value=color;
          opt.innerHTML += color
          sel.appendChild(opt);
        });
    addToCart();
});
}
renderProduct();

//PRODUCT QUANTITY

// ----------------------------------------------------------------------------------
//CART BUTTON
function addToCart(){
    const btn_sendInCart = document.getElementById("addToCart");
    btn_sendInCart.addEventListener("click", (event) => {
        event.preventDefault();

        //ADD PRODUCT IN HTML
        const productColor = document.getElementById("colors").value;
        const productQuantity = document.getElementById("quantity").value;
            if(productColor == ""){
                alert("Veuillez sélectionnez une couleur");
                return;
            }else if(productQuantity >= 1 && productQuantity <= 100){
            }else{
                alert("Veuillez sélectionnez une quantité entre 0 et 100");
                return;
            }

            //PRODUCT INFORMATION
            const infoProduct = {
                id : productId,
                color : productColor,
                quantity : parseInt(productQuantity)
            };

            //ADD TO CART CONFIRMATION (POPUP)
            const confirmation = () => {
                location.reload();
            }

            //IF LOCALSTORAGE EXISTS
            if (JSON.parse(localStorage.getItem("product")) !== null){
                const items = JSON.parse(localStorage.getItem("product"));

                //RECOVERY OF VALUES
                for (let article = 0; article < items.length; article++){
                    const valueId = items[article].id;
                    const valueColor = items[article].color;
                    const valueQuantity = items[article].quantity;

                //IF JSON CHECK
                if(valueId && valueColor && valueQuantity){

                    //SAME PRODUCT
                    if((valueId === infoProduct.id) && (valueColor === infoProduct.color)){
                        items[article].quantity = parseInt(valueQuantity) + parseInt(infoProduct.quantity);
                        localStorage.setItem("product", JSON.stringify(items));

                        //CONFIRMATION
                        confirmation();
                break;
                
                //IF NEW PRODUCT
                }else{
                    if (article === items.length - 1){
                        items.push(infoProduct);
                        localStorage.setItem("product", JSON.stringify(items));
                        confirmation();
                break;
                }
                    }
                }else{
                    console.log("Bad localstorage");
                }
                }

            //CREATE LOCALSTORAGE
            }else{
                const items = [];
                items.push(infoProduct);
                    localStorage.setItem("product", JSON.stringify(items));
                    confirmation();
            }
    })
};