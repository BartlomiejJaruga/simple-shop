export const loadProductsFromFile = async (filepath) => {
    try {
        const response = await fetch(filepath);
        if(!response.ok){
            throw new Error('Failed to load products from file :' + filepath);
        }
        const data = await response.json();
        return data;
    }
    catch(error){
        console.error('Error occured: ', error);
        return null;
    }
}

export const generateNoProductsInformation = () => {
    const informationContainer = document.createElement("div");
    informationContainer.className = "products_list_loading_products_error_information";
    informationContainer.innerHTML = "<i class='fa-solid fa-ghost fa-2x'></i><p>There are currently no products available.</p>";

    return informationContainer;
}

export const generateErrorWhileLoadingProductsInformation = () => {
    const informationContainer = document.createElement("div");
    informationContainer.className = "products_list_loading_products_error_information";
    informationContainer.innerHTML = "<i class='fa-solid fa-file-excel fa-2x'></i><p>Failed to load products, please try again later.</p>";

    return informationContainer;
}

export const generateUnexpectedErrorWhileLoadingProductsInformation = () => {
    const informationContainer = document.createElement("div");
    informationContainer.className = "products_list_loading_products_error_information";
    informationContainer.innerHTML = "<i class='fa-solid fa-exclamation fa-2x'></i><p>Something unexpected happened while loading products, please try again later.</p>";

    return informationContainer;
}

export const generateNoProductsFoundInformation = () => {
    const informationContainer = document.createElement("div");
    informationContainer.id = "products_list_searching_products_no_products_information";
    informationContainer.innerHTML = "<i class='fa-solid fa-ghost fa-2x'></i><p>No products with searched term found.</p>";

    return informationContainer;
}

export const removeNoProductsFoundInformation = () => {
    const informationContainer = document.getElementById("products_list_searching_products_no_products_information");
    
    if(informationContainer){
        informationContainer.remove();
    }
}

export const setupSearchBarListeners = (productsList, renderProductsFunction) => {
    let searchTerm = "";

    const searchBar = document.getElementById("search_bar");
    searchBar.addEventListener('input', (e) => {
        searchTerm = e.target.value;
    });
    searchBar.addEventListener('keydown', (e) => {
        if(e.code === "Enter"){
            const searchButton = document.getElementById("search_bar_button");
            if(searchButton){
                searchButton.click();
            }
        }
    });

    const searchButton = document.getElementById("search_bar_button");
    searchButton.addEventListener('click', () => {
        searchTerm = searchTerm.trim().toLowerCase();
        const matchingProducts = productsList.filter(product => product.name.trim().toLowerCase().includes(searchTerm) || product.manufacturer.trim().toLowerCase().includes(searchTerm));
        
        const productsListContainer = document.getElementById("products_list");
        const aside = document.querySelector(".main_container aside");

        if(!productsListContainer || !aside) return;

        productsListContainer.replaceChildren();
        
        if(matchingProducts?.length > 0){
            removeNoProductsFoundInformation();

            productsListContainer.style.removeProperty("justify-content");
            productsListContainer.style.removeProperty("align-items");
            productsListContainer.style.display = "grid";
            aside.style.width = "70%";

            renderProductsFunction(matchingProducts);
        }
        else{
            const existingInfo = productsListContainer.querySelector("#products_list_searching_products_no_products_information");
            if (existingInfo) return;

            productsListContainer.style.display = "flex";
            productsListContainer.style.justifyContent = "center";
            productsListContainer.style.alignItems = "center";
            aside.style.width = "30%";

            const noProductsFoundInformation = generateNoProductsFoundInformation();
            productsListContainer.appendChild(noProductsFoundInformation);
        }
    });
}