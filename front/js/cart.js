let addProduct = JSON.parse(URLSearchParams.getItem("product"));

console.log(addProduct);

const cartDisplay = async () => {
    console.log();
    if(addProduct){
        await addProduct;
        console.log(addProduct)

        cart__order.classList.add("display-none");

        continueCommand.addEventListener("click", () => {
            cart__order.classList.remove("display-none")
        });

        bloc
    };
};