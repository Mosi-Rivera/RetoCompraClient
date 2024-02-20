import { ORIGIN_URL } from "./environment";

export const signIn = async (userInfo) => {
    const response = await fetch( ORIGIN_URL + "/api/auth/login", {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userInfo)
    })
    if (!response.ok)
        return Promise.reject(response);
    return response.json();
}


export const registerForm = async (userData) => {
    console.log(userData)
    const response = await fetch( ORIGIN_URL + "/api/auth/register", {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    });
    console.log(response)

    if (!response.ok)
        return Promise.reject(response);
    return response.json();
}

export const logout = async () => {
    const response = await fetch(ORIGIN_URL + "/api/auth/logout", {
        method: 'GET',
        credentials: 'include'
    });
    if (!response.ok)
        return Promise.reject(response);
    return Promise.resolve(response.status);

}

export const whoAmI = async () => {
    const response = await fetch(ORIGIN_URL + "/api/auth/whoAmI", {
        method: 'GET',
        credentials: "include"
    });
    if (!response.ok)
        return Promise.reject(response);
    return response.json();
}
