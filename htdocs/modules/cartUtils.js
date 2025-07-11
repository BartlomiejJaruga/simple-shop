export const findManufacturerInCart = (cart, manufacturerName) => {
    return cart.reduce((acc, manufacturer) => {
        if(manufacturer.manufacturerName === manufacturerName){
            acc = manufacturer;
            return acc;
        }

        return acc;
    }, null);
}

export const findProductInCart = (cart, productData) => {
    return cart.reduce((acc, manufacturer) => {
        if(manufacturer.manufacturerName === productData.manufacturer){
            manufacturer.products.forEach(product => {
                if(product.product.id === productData.id){
                    acc = product;
                    return acc;
                }
            });
        }

        return acc;
    }, null);
}

export const recountCartTotalPrice = (cart) => {
    const totalPrice = cart.reduce((acc, manufacturer) => {
        manufacturer.products.forEach(product => {
            if(product.isChecked){
                acc += product.quantity * parseFloat(product.product.price).toFixed(2);
            }
        });

        return acc;
    }, 0);

    const cartTotalPriceContainer = document.getElementById('cart_total_price');
    cartTotalPriceContainer.textContent = "Grand total: " + totalPrice.toFixed(2) + "$";
}

export const recountManufacturerTotalPrice = (cart, manufacturerName) => {
    const foundManufacturer = findManufacturerInCart(cart, manufacturerName);

    if(foundManufacturer){
        const totalPrice = foundManufacturer.products.reduce((acc, product) => {
            if(product.isChecked){
                acc += product.quantity * parseFloat(product.product.price).toFixed(2);
            }

            return acc;
        }, 0);

        const manufacturerTotalPriceContainer = document.getElementById(foundManufacturer.manufacturerId).nextElementSibling;
        manufacturerTotalPriceContainer.textContent = "Total: " + totalPrice.toFixed(2) + "$";

        recountCartTotalPrice(cart);
    }
    else {
        console.log("[ERROR recountManufacturerTotalPrice] Failed to find manufacturer in cart object.");
    }
}

export const checkIfCartEmpty = (cart) => {
    if(cart.length === 0){
        const cartContainer = document.getElementById("cart_container");

        if(cartContainer){
            const cartIsEmptyInformationContainer = generateCartIsEmptyInformation();

            cartContainer.appendChild(cartIsEmptyInformationContainer);
        }
        else{
            console.log("[ERROR checkIfCartEmpty] Failed to found cart_container.");
        }

        return true;
    }

    return false;
}

export const generateCartIsEmptyInformation = () => {
    const cartIsEmptyInformationContainer = document.createElement("div");
    cartIsEmptyInformationContainer.id = "cart_is_empty_information_container";

    const cartIsEmptyHeader = document.createElement("h1");
    cartIsEmptyHeader.innerHTML = "Your Cart is empty!<br> Add new products via Shop (left panel).";

    cartIsEmptyInformationContainer.appendChild(cartIsEmptyHeader);

    return cartIsEmptyInformationContainer;
}

export const removeCartIsEmptyInformation = () => {
    const cartIsEmptyInformationContainer = document.getElementById('cart_is_empty_information_container');
    if(cartIsEmptyInformationContainer){
        cartIsEmptyInformationContainer.remove();
    }
}