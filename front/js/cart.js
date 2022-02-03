//LOCAL STORAGE
let items = JSON.parse(localStorage.getItem("product"));

//CART DISPLAY
function getCart(){
    if(items === null || items == 0){
        this.cart = [];
    }else{
        this.cart = JSON.parse(cart);
    
    }
}
        saveCart(){
            localStorage.setItem("cart", JSON.stringify(this.cart));
        }

//TRY TO FIND THE PRODUCT IN THE CART
addCart(product){
let foundProduct = this.cart.find(p => p.id == product.id);

    //IF THE PRODUCT IS NOT FOUND, ADD THE PRODUCT TO THE CART   
        if(foundProduct != undefined){
            foundProduct.quantity++;
        }

    //OR ELSE, ADD 1 TO QUANTITY
        else{
            product.quantity =1;
            cart.push(product)
        }
        saveCart();
}

//DELETE THE PRODUCT FROM THE CART
removeFromCart = ("click",(event) =>{
    localStorage.clear();
    document.location.reload();
});

//CHANGE THE QUANTITY IN THE CART
changeQuantity(product, quantity){
let foundProduct = this.cart.find(p => p.id == product.id);
    if(foundProduct != undefined){
        foundProduct.quantity += quantity;
        if(foundProduct.quantity <= 0){
            removeFromCart(foundProduct);
        }else{
            saveCart();
        }
    }   
}

//CALCULATE THE TOTAL OF PRODUCTS IN THE CART
getNumberProduct(){
let number = 0;
    for(let product of this.cart){
        number += product.quantity;
    }
        return number;
}
    
//CALCULATE THE TOTAL OF PRICE IN THE CART
getTotalPrice(){
let total = 0;
    for(let product of this.cart){
        number += product.quantity * product.price;
    }
        return total;
}
}

//FORM IN CART
document.querySelector(`.cart__order__form input[type="submit"]`).addEventListener("click", (e) => {
    e.preventDefault();
    let fields = document.querySelectorAll('.cart__order__form input, .cart__order__form select, .cart__order__form textarea');
    let valid = true;
        for (let field of fields){
            valid &= check(field);
        if(!valid){
            break;
        }
}

//FORM VALIDATION
if (valid) {
    console.log("Le formulaire est bien remplis");
}
});

//FORM ERRORS
function check(input){
    input.setCustomValidity("");
    if(input.validity.valueMissing){
        input.setCustomValidity("Veuillez remplir ce champ avec une information valide.");
    }
        return input.reportValidity();
}

//CONFIRMATION PAGE
const responseId = localStorage.getItem("responseId");
console.log(`responseId : ${responseId}`)