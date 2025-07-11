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