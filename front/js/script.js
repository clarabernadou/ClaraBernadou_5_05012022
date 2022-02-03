//API CONNECTION FOR PRODUCTS RECOVERY
let meubleData = []; //create array
const fetchMeuble = async () => {
  await fetch("http://localhost:3000/api/products") //add api url
    .then((res) => res.json())
    .then((promise) => {
      meubleData = promise;
      console.log(meubleData);
    });
};

const meubleDisplay = async () => {
    await fetchMeuble();

//DISPLAY PRODUCT CARDS
    document.getElementById("items").innerHTML = meubleData.map(
        (meuble) => `
            <a id="items/${meuble._id}" >
                <article>
                    <h3 class="productName">${meuble.name.toUpperCase()}</h3>
                    <img src="${meuble.imageUrl}" alt="image du canapé ${
                        meuble.altTxt
                    }"></img>
                    <p class="productDescription">${meuble.description}</p>
                </article
            </a>
        `,
    ).join("");

//REDIRECTION TO THE PRODUCT PAGE
    let button = document.querySelectorAll("a")

    button.forEach(function(button) {
        button.addEventListener("click" , () => {
            console.log(button);
            window.location = `product.html?${button.id}`
        });
    });
};

meubleDisplay();