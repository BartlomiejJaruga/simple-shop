import { loadProductsFromFile } from "./modules/shopUtils.js";
import { 
    recountCartTotalPrice, 
    recountManufacturerTotalPrice, 
    findManufacturerInCart, 
    findProductInCart,
    removeCartIsEmptyInformation,
    checkIfCartEmpty
} from "./modules/cartUtils.js";
import { LoadingIndicator } from "./modules/common.js";



const DEFAULT_PRODUCT_QUANTITY = 1;
const DEFAULT_MIN_PRODUCT_QUANTITY = 1;
const DEFAULT_MAX_PRODUCT_QUANTITY = 99;
const DEFAULT_NEW_CART_PRODUCT_CHECKBOX_STATE = false;
const DEFAULT_NEW_CART_MANUFACTURER_CHECKBOX_STATE = false;



// --- WHOLE STORE ---

const generateStore = async (filepath) => {
    const loadingIndicator = new LoadingIndicator();
    const productsListLoadingIndicator = loadingIndicator.generateLoadingIndicator("Loading products...", "2rem");
    const productsList = document.getElementById("products_list");
    const aside = document.querySelector(".main_container aside");
    if(productsList && aside){
        productsList.style.display = "flex";
        productsList.style.justifyContent = "center";
        productsList.style.alignItems = "center";

        aside.style.width = "30%";

        productsList.appendChild(productsListLoadingIndicator);
    }
    else{
        console.log("[ERROR generateStore] Failed to find products_list and append loadingIndicator");
    }
    
    checkIfCartEmpty(cart);
    const productsData = await loadProductsFromFile(filepath);

    if(productsList && aside){
        loadingIndicator.removeLoadingIndicator();

        aside.style.width = "70%";

        productsList.style.removeProperty("justify-content");
        productsList.style.removeProperty("align-items");
        productsList.style.display = "grid";
    }

    generateProductList(productsData);
}

// --- SHOP ---

const generateProductList = (productsData) => {
    const productList = document.getElementById("products_list");

    productsData.forEach((product) => {
        const productContainer = document.createElement("div");
        productContainer.className = "products_list_item";

        const topSection = document.createElement("div");

        const productImage = document.createElement("img");
        productImage.src = "/assets/item_image_example.png";
        productImage.alt = "item image";
        productImage.className = "products_list_item_image";

        const productNameAndManufacturer = document.createElement("div");
        productNameAndManufacturer.className = "products_list_item_name";

        const productName = document.createElement("span");
        productName.textContent = product.name;
        const productManufacturer = document.createElement("span");
        productManufacturer.textContent = product.manufacturer;

        productNameAndManufacturer.appendChild(productName);
        productNameAndManufacturer.appendChild(productManufacturer);

        topSection.appendChild(productImage);
        topSection.appendChild(productNameAndManufacturer);


        const middleSection = document.createElement("div");
        middleSection.className = "item_description";
        middleSection.textContent = product.description;


        const bottomSection = document.createElement("div");

        const productPrice = document.createElement("span");
        productPrice.className = "products_list_item_price";
        productPrice.textContent = product.price + "$";

        const productQuantity = document.createElement("input");
        productQuantity.className = "products_list_item_quantity_input";
        productQuantity.type = "number";
        productQuantity.name = "productQuantity";
        productQuantity.value = DEFAULT_PRODUCT_QUANTITY;
        productQuantity.min = DEFAULT_MIN_PRODUCT_QUANTITY;
        productQuantity.max = DEFAULT_MAX_PRODUCT_QUANTITY;
        productQuantity.addEventListener("input", () => {
            let value = parseInt(productQuantity.value);
            if (isNaN(value) || value < DEFAULT_MIN_PRODUCT_QUANTITY) productQuantity.value = DEFAULT_MIN_PRODUCT_QUANTITY;
            if (value > DEFAULT_MAX_PRODUCT_QUANTITY) productQuantity.value = DEFAULT_MAX_PRODUCT_QUANTITY;
        });

        const productQuantityControls = document.createElement("div");
        productQuantityControls.className = "products_list_item_quantity_controls_container";

        const productIncreaseButton = document.createElement("span");
        productIncreaseButton.textContent = "+";
        productIncreaseButton.tabIndex = 0;
        productIncreaseButton.addEventListener("click", () => {
            let value = parseInt(productQuantity.value);
            if (value < DEFAULT_MAX_PRODUCT_QUANTITY) productQuantity.value = value + 1;
        });
        productIncreaseButton.addEventListener('keydown', (e) => {
            if(e.code === "Enter" || e.code === "Space"){
                e.preventDefault();
                productIncreaseButton.click();
            }
        });

        const productDecreaseButton = document.createElement("span");
        productDecreaseButton.textContent = "-";
        productDecreaseButton.tabIndex = 0;
        productDecreaseButton.addEventListener("click", () => {
            let value = parseInt(productQuantity.value);
            if (value > DEFAULT_MIN_PRODUCT_QUANTITY) productQuantity.value = value - 1;
        });
        productDecreaseButton.addEventListener('keydown', (e) => {
            if(e.code === "Enter" || e.code === "Space"){
                e.preventDefault();
                productDecreaseButton.click();
            }
        });

        productQuantityControls.appendChild(productIncreaseButton);
        productQuantityControls.appendChild(productDecreaseButton);

        const productAddToCartButton = document.createElement("button");
        productAddToCartButton.className = "products_list_item_add_to_cart_btn";
        productAddToCartButton.innerHTML = "<i class='fa-solid fa-cart-plus fa-2x'></i>";
        productAddToCartButton.addEventListener('click', () => {
            updateCart(product, parseInt(productQuantity.value));
            recountManufacturerTotalPrice(cart, product.manufacturer);
            removeCartIsEmptyInformation();
        });

        bottomSection.appendChild(productPrice);
        bottomSection.appendChild(productQuantity);
        bottomSection.appendChild(productQuantityControls);
        bottomSection.appendChild(productAddToCartButton);

        
        productContainer.appendChild(topSection);
        productContainer.appendChild(middleSection);
        productContainer.appendChild(bottomSection);

        productList.appendChild(productContainer);
    });
}

// --- CART ---

let manufacturerIdCounter = 0;
const cart = [];


const updateCart = (productData, quantity) => {
    console.log(cart);
    const foundManufacturer = cart.find(manufacturer => manufacturer.manufacturerName === productData.manufacturer);

    if(foundManufacturer){
        const foundProduct = foundManufacturer.products.find(item => item.product.id === productData.id);
        if(foundProduct){
            const quantityToAdd = Math.min(parseInt(quantity), DEFAULT_MAX_PRODUCT_QUANTITY - parseInt(foundProduct.quantity));
            foundProduct.quantity = parseInt(foundProduct.quantity) + quantityToAdd;
            
            const spans = foundProduct.productRef.querySelectorAll(".product_info span");
            const quantitySpan = spans[1];
            quantitySpan.textContent = foundProduct.quantity;
        }
        else{
            const manufacturerTile = document.getElementById(foundManufacturer.manufacturerId);
            const newProduct = generateNewCartProduct(productData, quantity);

            manufacturerTile.appendChild(newProduct);
            
            foundManufacturer.products.push({
                product: productData,
                quantity: quantity,
                isChecked: DEFAULT_NEW_CART_PRODUCT_CHECKBOX_STATE,
                productRef: newProduct,
            });
        }
    }
    else {
        const newManufacturerId = productData.manufacturer + '-' + manufacturerIdCounter++;
        const {newManufacturerTile, newProduct} = generateNewCartManufacturer(productData, quantity, newManufacturerId);
        const cartContainer = document.getElementById("cart_container");

        cartContainer.appendChild(newManufacturerTile);
        cart.push({
            manufacturerName: productData.manufacturer,
            manufacturerId: newManufacturerId,
            isChecked: DEFAULT_NEW_CART_MANUFACTURER_CHECKBOX_STATE,
            products: [
                { 
                    product: productData,
                    quantity: quantity,
                    isChecked: DEFAULT_NEW_CART_PRODUCT_CHECKBOX_STATE,
                    productRef: newProduct,
                }
            ]
        })
    }
}

const generateNewCartProduct = (productData, quantity) => {
    const cartProductContainer = document.createElement("div");
    cartProductContainer.className = "single_cart_product_container";

    const productWrapper = document.createElement("div");

    const productInfo = document.createElement("div");
    productInfo.className = "product_info";

    const productCheckboxContainer = document.createElement("div");
    productCheckboxContainer.className = "product_checkbox";

    const productCheckbox = document.createElement("input");
    productCheckbox.type = "checkbox";
    const productCheckboxId = 'checkbox' + '-' + productData.name.replace(/ /g, '') + '-' + productData.id;
    productCheckbox.id = productCheckboxId;
    productCheckbox.checked = DEFAULT_NEW_CART_PRODUCT_CHECKBOX_STATE;
    productCheckbox.addEventListener('change', () => {
        const foundProduct = findProductInCart(cart, productData);
        if(foundProduct){
            foundProduct.isChecked = !foundProduct.isChecked;
            
            const foundManufacturer = findManufacturerInCart(cart, productData.manufacturer);
            if(foundManufacturer){
                let areAllProductsSelected = true;
                foundManufacturer.products.forEach(product => {
                    if(!product.isChecked) areAllProductsSelected = false;
                });

                const manufacturerCheckbox = document.getElementById(foundManufacturer.manufacturerId).firstChild.firstChild;
                if(areAllProductsSelected){
                    foundManufacturer.isChecked = true;
                    manufacturerCheckbox.checked = true;
                }
                else{
                    foundManufacturer.isChecked = false;
                    manufacturerCheckbox.checked = false;
                }
            }
            else{
                console.log("[ERROR productCheckbox] Failed to find manufacturer in cart object.");
            }

            recountManufacturerTotalPrice(cart, productData.manufacturer);
        }
        else{
            console.log("[ERROR productCheckbox] Failed to find product in cart object.");
        }
    });

    const productCheckboxLabel = document.createElement("label");
    productCheckboxLabel.textContent = productData.name || "Product Name";
    productCheckboxLabel.htmlFor = productCheckboxId;

    productCheckboxContainer.appendChild(productCheckbox);
    productCheckboxContainer.appendChild(productCheckboxLabel);

    const productPrice = document.createElement("span");
    productPrice.textContent = productData.price + "$";

    const productQuantity = document.createElement("span");
    productQuantity.textContent = quantity || DEFAULT_MIN_PRODUCT_QUANTITY;

    productInfo.appendChild(productCheckboxContainer);
    productInfo.appendChild(productPrice);
    productInfo.appendChild(productQuantity);

    const productQuantityControls = document.createElement("div");
    productQuantityControls.className = "cart_product_quantity_controls";

    const productIncreaseButton = document.createElement("span");
        productIncreaseButton.textContent = "+";
        productIncreaseButton.tabIndex = 0;
        productIncreaseButton.addEventListener("click", () => {
            let currentQuantity = parseInt(productQuantity.textContent);
            if (currentQuantity < DEFAULT_MAX_PRODUCT_QUANTITY){
                productQuantity.textContent = currentQuantity + 1;

                const foundProduct = findProductInCart(cart, productData);
                if(foundProduct){
                    foundProduct.quantity = currentQuantity + 1;
                    console.log("Cart product quantity: ", foundProduct.quantity);
                }
                else{
                    console.log("[ERROR: productIncreaseButton] Failed to increase product's quantity in cart variable");
                }

                recountManufacturerTotalPrice(cart, productData.manufacturer);
            }
        });
        productIncreaseButton.addEventListener('keydown', (e) => {
            if(e.code === "Enter" || e.code === "Space"){
                e.preventDefault();
                productIncreaseButton.click();
            }
        });

        const productDecreaseButton = document.createElement("span");
        productDecreaseButton.textContent = "-";
        productDecreaseButton.tabIndex = 0;
        productDecreaseButton.addEventListener("click", () => {
            let currentQuantity = parseInt(productQuantity.textContent);
            if (currentQuantity > DEFAULT_MIN_PRODUCT_QUANTITY){
                productQuantity.textContent = currentQuantity - 1;

                const foundProduct = findProductInCart(cart, productData);
                if(foundProduct){
                    foundProduct.quantity = currentQuantity - 1;
                    console.log("Cart product quantity: ", foundProduct.quantity);
                }
                else{
                    console.log("[ERROR: productDecreaseButton] Failed to decrease product's quantity in cart variable");
                }

                recountManufacturerTotalPrice(cart, productData.manufacturer);
            }
        });
        productDecreaseButton.addEventListener('keydown', (e) => {
            if(e.code === "Enter" || e.code === "Space"){
                e.preventDefault();
                productDecreaseButton.click();
            }
        });

    productQuantityControls.appendChild(productIncreaseButton);
    productQuantityControls.appendChild(productDecreaseButton);

    productWrapper.appendChild(productInfo);
    productWrapper.appendChild(productQuantityControls);

    const productDeleteButton = document.createElement("button");
    productDeleteButton.className = "cart_product_delete_button";
    productDeleteButton.innerHTML = '<i class="fa-solid fa-trash-can fa-2x"></i>';
    productDeleteButton.addEventListener('click', () => {
        const foundManufacturer = findManufacturerInCart(cart, productData.manufacturer);
        if(foundManufacturer){
            const remainingProducts = foundManufacturer.products.filter(product => product.product.id !== productData.id);
            if(remainingProducts.length > 0){
                cartProductContainer.remove();
                foundManufacturer.products = remainingProducts;

                recountManufacturerTotalPrice(cart, productData.manufacturer);
            }
            else{
                cartProductContainer.closest('.cart_tile').remove();
                
                const manufacturerCartIndex = cart.findIndex(manufacturer => 
                    manufacturer.manufacturerId === foundManufacturer.manufacturerId
                );

                if(manufacturerCartIndex !== -1){
                    cart.splice(manufacturerCartIndex, 1);
                }
                else{
                    console.log("[ERROR productDeleteButton] Failed to delete manufacturer from cart");
                }

                recountCartTotalPrice(cart);

                checkIfCartEmpty(cart);
            }
        }
        else{
            console.log("[ERROR productDeleteButton] Failed to delete product from cart");
        }
    });

    cartProductContainer.appendChild(productWrapper);
    cartProductContainer.appendChild(productDeleteButton);

    return cartProductContainer;
}

const generateNewCartManufacturer = (productData, quantity, newManufacturerId) => {
    const cartTile = document.createElement("div");
    cartTile.className = "cart_tile";

    const manufacturerContainer = document.createElement("div");
    manufacturerContainer.className = "manufacturer_items";
    manufacturerContainer.id = newManufacturerId;

    const manufacturerCheckboxContainer = document.createElement("div");
    manufacturerCheckboxContainer.className = "manufacturer_checkbox";

    const manufacturerCheckbox = document.createElement("input");
    manufacturerCheckbox.type = "checkbox";
    const manufacturerCheckboxId = 'checkbox-' + newManufacturerId;
    manufacturerCheckbox.id = manufacturerCheckboxId;
    manufacturerCheckbox.checked = DEFAULT_NEW_CART_MANUFACTURER_CHECKBOX_STATE;
    manufacturerCheckbox.addEventListener('change', () => {
        const foundManufacturer = findManufacturerInCart(cart, productData.manufacturer);
        if(foundManufacturer){
            foundManufacturer.isChecked = !foundManufacturer.isChecked;

            foundManufacturer.products.forEach(product => {
                product.isChecked = foundManufacturer.isChecked;
            });

            const productCheckboxes = document.getElementById(foundManufacturer.manufacturerId).querySelectorAll(".product_checkbox");
            productCheckboxes.forEach(productCheckbox => {
                productCheckbox.firstChild.checked = foundManufacturer.isChecked;
            })

            recountManufacturerTotalPrice(cart, productData.manufacturer);
        }
    });

    const manufacturerCheckboxLabel = document.createElement("label");
    manufacturerCheckboxLabel.textContent = productData.manufacturer;
    manufacturerCheckboxLabel.htmlFor = manufacturerCheckboxId;

    manufacturerCheckboxContainer.appendChild(manufacturerCheckbox);
    manufacturerCheckboxContainer.appendChild(manufacturerCheckboxLabel);

    const newProduct = generateNewCartProduct(productData, quantity, newManufacturerId);

    manufacturerContainer.appendChild(manufacturerCheckboxContainer);
    manufacturerContainer.appendChild(newProduct);

    const totalManufacturerPrice = document.createElement("div");
    totalManufacturerPrice.className = "manufacturer_total_price";
    totalManufacturerPrice.textContent = "Total: " + 350 + "$";
    
    cartTile.appendChild(manufacturerContainer);
    cartTile.appendChild(totalManufacturerPrice);

    return {newManufacturerTile: cartTile, newProduct: newProduct};
}



// ===== GENERATING APP =====

window.addEventListener('load', () => {
    generateStore('/data/products.json');
});
