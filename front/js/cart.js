//LOCAL STORAGE
let items = JSON.parse(localStorage.getItem("product"));

//DISPLAY CART
function getCart() {

    //EMPTY CART
    if(items === null || items == 0) {
        const statusCart = document.getElementById("cart__items");
        const emptyCart = `<p>LE PANIER EST VIDE</p>`;
        statusCart.innerHTML = emptyCart;
        document.querySelector(".cart__order__form").hidden = true;
        document.getElementById("totalQuantity").innerHTML = 0;
        document.getElementById("totalPrice").innerHTML = 0;
        return false;
    //ELSE
    } else {
        return true;
    }
};

//DISPLAY PRODUCT(S) IN CART
async function displayInCart(){
    let totalPrice = 0;
    let totalQuantity = 0;
    let cartContent = "";
    for(let product of items){
        await fetch(`http://localhost:3000/api/products/${product.id}`)
            .then(result => result.json())
            .then(article => {
                totalPrice += parseInt(article.price) * parseInt(product.quantity);
                totalQuantity += parseInt(product.quantity);
                cartContent += 
                `<article class='cart__item' data-id='${product.id}' data-color='${product.color}'>
                <div class='cart__item__img'>
                  <img src='${article.imageUrl}' alt='${article.altTxt}'>
                </div>
                <div class='cart__item__content'>
                <div class='cart__item__content__description'>
                  <h2>${article.name}</h2>
                  <p>${product.color}</p>
                  <p>${article.price * product.quantity} €</p>
                </div>
                <div class='cart__item__content__settings'>
                    <div class='cart__item__content__settings__quantity'>
                      <p>Qté : </p>
                      <input type='number' class='itemQuantity' name='itemQuantity' min='1' max='100' value='${product.quantity}'>
                    </div>
                    <div class='cart__item__content__settings__delete'>
                      <p class='deleteItem'>Supprimer</p>
                    </div>
                  </div>
                </div>
              </article>`;
            })
            .catch(error => {
                console.log(error);
            });
    };

    document.getElementById("cart__items").innerHTML = cartContent;
    document.getElementById("totalQuantity").innerHTML = totalQuantity;
    document.getElementById("totalPrice").innerHTML = totalPrice;

RemoveProductOfCart();
changeQuantity();
};

//REMOVE PRODUCT(S) OF CART
function RemoveProductOfCart(){

    //SEARCH IN LOCALSTORAGE
    const btn_remove = document.querySelectorAll(".deleteItem");
      for(let article = 0; article < items.length; article++) {
        btn_remove[article].addEventListener("click", (event) => {
          event.preventDefault();
    
          let valueId = btn_remove[article].closest("article").dataset.id;
          let valueColor = btn_remove[article].closest("article").dataset.color;
          if((valueId && valueColor)){
              if(items.length > 1){
                items.splice(article,1);
                localStorage.setItem("product", JSON.stringify(items));  
              }else{
                  localStorage.removeItem("product");
                }
              location.reload();
              window.location.hash = "cart__items";
              alert("Article supprimé du panier");
            }

            if(items === null || items === 0){
              localStorage.removeItem("product");
            }
        })
      }
    };

//MODIFY THE QUANTITY OF THE PRODUCT(S) IN THE CART
function changeQuantity(){
  const min = 1;
  const max = 100;
  let btn_quantity = document.querySelectorAll(".itemQuantity");
  for(let article = 0; article < items.length; article++){
    btn_quantity[article].addEventListener("change", (event) => {
      event.preventDefault();

      let valueId = btn_quantity[article].closest("article").dataset.id;
      let valueColor = btn_quantity[article].closest("article").dataset.color;

      if((valueId && valueColor)){
        let valueNewQuantity = event.target.value;

        if(valueNewQuantity < min) {
          alert("Veuillez choisir au moins " + min + " article");
        }else if(valueNewQuantity > max){
          alert("Veuillez de ne pas dépasser " + max + " articles");
        }else{
          if((items[article].id === valueId) && (items[article].color === valueColor)) {
            items[article].quantity = parseInt(valueNewQuantity);
            localStorage.setItem("product", JSON.stringify(items));
            location.reload();
            window.location.hash = "cart__items";
          }else{
            location.reload();
            window.location.hash = "cart__items";
            alert("Panier non à jour. Rechargement.");
          }
        }
      }
     });
  }
};

//CHECK THE FORM
function formCheck(){

  //FIRST NAME CHECK
  const firstNameCheck = () => {
      const firstName = document.getElementById("firstName");
      const firstNameErrorMsg = document.getElementById("firstNameErrorMsg");
      if (/^[A-Za-z-éèêëï]+[a-zéèêëï]$/.test(firstName.value)) {
          firstNameErrorMsg.innerHTML = "";
          return true;
      }else{
          firstNameErrorMsg.innerHTML = "Veuillez renseigner un prénom valide.";
      }
  };

  //NAME CHECK
  const lastNameCheck = () => {
      const lastName = document.getElementById("lastName");
      const lastNameErrorMsg = document.getElementById("lastNameErrorMsg");
      if(/^[A-Za-z- 'éèêëï]+[a-z- 'éèêëï]$/.test(lastName.value)){
          lastNameErrorMsg.innerHTML = "";
          return true;
      }else{
          lastNameErrorMsg.innerHTML = "Veuillez renseigner un nom valide.";
      }
  };

  //ADDRESS CHECK
  const addressCheck = () => {
      const address = document.getElementById("address");
      const addressErrorMsg = document.getElementById("addressErrorMsg");
      if(/^[0-9A-Za-z- '.éèêëïà]+[0-9A-Za-z- '.éèêëïà]$/.test(address.value)){
          addressErrorMsg.innerHTML = "";
          return true;
      }else{
          addressErrorMsg.innerHTML = "Veuillez renseigner une adresse valide (exemple : 6 Chemin des Hortensias).";
      }
  };

  //CITY CHECK
  const cityCheck = () => {
      const city = document.getElementById("city");
      const cityErrorMsg = document.getElementById("cityErrorMsg");
      if(/^[A-Za-z- 'éèêëïà]+[A-Za-zéèêëïà]$/.test(city.value)){
          cityErrorMsg.innerHTML = "";
          return true;
      }else{
          cityErrorMsg.innerHTML = "Veuillez renseigner une ville valide.";
      }
  };

  //EMAIL CHECK
  const emailCheck = () => {
      const email = document.getElementById("email");
      const emailErrorMsg = document.getElementById("emailErrorMsg");
      if(/^[\w\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email.value)){
          emailErrorMsg.innerHTML = "";
          return true;
      }else{
        emailErrorMsg.innerHTML = "Veuillez renseigner une adresse email valide (exemple : kanapfrance@kanap.fr).";
      }
  };

  //ALL CHECK
  if(firstNameCheck() &&
      lastNameCheck() &&
      addressCheck() &&
      cityCheck() &&
      emailCheck()) {
      return true;
  }else {
      return false;
  }
}

//SEND THE ORDER
function orderSend(){
    const btn_sendOrder = document.getElementById("order");
    btn_sendOrder.addEventListener("click", (event) => {
        event.preventDefault();
        if (formCheck()) {
            let contact = {
                firstName: document.getElementById("firstName").value,
                lastName: document.getElementById("lastName").value,
                address: document.getElementById("address").value,
                city: document.getElementById("city").value,
                email: document.getElementById("email").value,
            };

            let products = [];
            items.forEach(product => {
                products.push(product.id)
            });
            let user = {
                contact,
                products
            };

            fetch('http://localhost:3000/api/products/order', {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
            })
                .then(result => {
                  return result.json();
                })
                .then(result => {
                    window.location.href = `./confirmation.html?id=${result.orderId}`;
                    localStorage.clear();
                })
                .catch(error => {
                    console.log("error");
                });
        }else{
            alert("Veuillez vérifiez que vos informations soit correctes.");
        }
    });
};

//CONFIRM THE ORDER
function confirmOrder() {
  const orderConfirmId = url.searchParams.get("id");
  document.getElementById("orderId").innerHTML = orderConfirmId;
}

//RECOVERY DATA IN LOCALSTORAGE
let url = new URL(window.location.href);

if(url.pathname.match(/\/cart\.html/)) {
  getCart();
  displayInCart();
  orderSend();
}else if(url.pathname.match(/\/confirmation\.html/)) {
  confirmOrder();
}