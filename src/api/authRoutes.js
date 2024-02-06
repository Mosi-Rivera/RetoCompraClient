import { ORIGIN_URL } from "./environment";

export const SIGN_IN = async (userInfo) => {
    const response = await fetch( ORIGIN_URL + "/signin", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userInfo)
    })
    if (response.ok) {
        // response.json() will return a json of all the products on the server side
        return response.json();
    } else {
        return Promise.reject(response);
    }
}

export const registerForm = async (userData) => {
    
    try {
        const response = await fetch( ORIGIN_URL + "api/auth/register", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });
    
        if (!response.ok) {
            return Promise.reject(response);
        }
        alert('Registration successful');
        return response.json();
    } catch (error) {
        console.error('Error:', error.message);
        alert('Registration failed');
    };
}