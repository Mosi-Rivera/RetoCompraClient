import { ORIGIN_URL } from "../environment"

/**
@param {Object} params - Object to be turned into search params
@param {String=} params.sort - "new" | "popular" | "high" | "low"
@param {String=} params.color - Product color.
@param {String=} params.brand - Product brand.
@param {string=} params.sections - "MEN" | "WOMEN"
@param {Number=} params.page - pagination page number.
@param {Number=} params.limit - Product x page limit.
*/
export const getProducts = async (params) => {
    try
    {
        const query_str = '?' + (new URLSearchParams(params)).toString();
        const response = await fetch(ORIGIN_URL + '/api/products' + query_str);
        if (response.ok)
            return response.json();
        else
            Promise.reject(response);
    }
    catch(err)
    {
        console.log(err);
    }
}