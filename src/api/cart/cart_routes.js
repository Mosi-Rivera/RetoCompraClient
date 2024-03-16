import {ORIGIN_URL} from '../environment';
export const getCart = async () => {
    const response = await fetch(ORIGIN_URL + '/api/cart', {
        credentials: 'include'
    });
    if (response.ok)
        return response.json();
    else
        return Promise.reject(response);
}
