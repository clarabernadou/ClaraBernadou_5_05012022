var removeCartIdemButtons = document.getElementsByClassName('cart__item__content__settings__delete')
console.log(removeCartIdemButtons)
for (var i = 0; i < removeCartIdemButtons.length; i++)
    var button = removeCartIdemButtons[i]
    button.addEventListener('click', function(event) {
            var buttonClicked event
            buttonClicked.parentElement.remove()
    })
}

function updateCartTotal() {
    var cartIdemContainer = document.getElementsByClassName('cart__item')[0]
    var cart = cartIdemContainer.getElementsByClassName('cart')
    for (var i = 0; i < cart.length; i++) {
        var cart = cart[i]
        var priceElement = cart.getElementsByClassName('cart__price')[0]
        var quantityElement = cart.getElementsByClassName('cart__item__content__settings__quantity')[0]
        console.log(priceElement, quantityElement)
    }

}