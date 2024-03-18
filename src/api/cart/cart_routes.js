import {ORIGIN_URL} from '../environment';
export const getCart = async () => {
    const response = await fetch(ORIGIN_URL + '/api/cart', {
        method: 'GET',
        credentials: 'include'
    });
    if (response.ok)
        return response.json();
    else
        return Promise.reject(response);
}

export const setItemQuantity = async (sku, size, quantity) => {
    console.log(sku, size, quantity)
    const response = await fetch(ORIGIN_URL + '/api/cart/setItemQuantity', {
        method: 'PATCH',
        credentials: 'include',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({sku, size, quantity})
    });
    if (!response.ok)
        return Promise.reject();
}

export const removeItem = async (sku, size) => {
    const response = await fetch(ORIGIN_URL + '/api/cart/removeItem', {
        method: 'DELETE',
        credentials: 'include',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({sku, size})
    });
    if (!response.ok)
        return Promise.reject();
}


export const addItem = async (sku, size, quantity) => {
    const response = await fetch(ORIGIN_URL + '/api/cart/addItem', {
        method: 'POST',
        credentials: 'include',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({sku, size, quantity})
    });
    if (!response.ok)
        return Promise.reject();
}

export const clearCart = async () => {
    const response = await fetch(ORIGIN_URL + '/api/cart/clearCart', {
        method: 'DELETE',
        credentials: 'include',
        headers: {'Content-Type': 'application/json'}
    });
    if (!response.ok)
        return Promise.reject();
}
