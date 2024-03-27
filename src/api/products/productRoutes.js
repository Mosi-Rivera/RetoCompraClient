import { ORIGIN_URL } from "../environment"

/**
@param {Object} params - Object to be turned into search params
@param {String=} params.sort - "new" | "popular" | "high" | "low"
@param {String=} params.color - Product color.
@param {String=} params.brand - Product brand.
@param {string=} params.section - "men" | "women"
@param {Number=} params.page - pagination page number.
@param {Number=} params.limit - Product x page limit.
@param {Number=} params.minPrice - Minimum price of products to return
@param {Number=} params.maxPrice - Maximum price of products to return
*/
export const getProducts = async (params) => {
    try {
        const queryStr = '?' + (new URLSearchParams(params)).toString();
        const response = await fetch(ORIGIN_URL + '/api/products' + queryStr);
        if (response.ok)
            return response.json();
        else
            return Promise.reject(response);
    }
    catch (err) {
        console.log(err);
    }
}

export const getSearchedProduct = async (params, searchText) => {
    const queryStr = '?' + (new URLSearchParams(params)).toString();
    const response = await fetch(ORIGIN_URL + '/api/products/search/' + searchText + queryStr);
    if (response.ok)
        return response.json();
    else
        return Promise.reject(response);
}



export const getProductInfo = async (productInfo) => { 
    const response = await fetch(ORIGIN_URL + '/api/products/productInfo/' + productInfo);
    if (response.ok)
        return response.json();
    else
        return Promise.reject(response);
}
