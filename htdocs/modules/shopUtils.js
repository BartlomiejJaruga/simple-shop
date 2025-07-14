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