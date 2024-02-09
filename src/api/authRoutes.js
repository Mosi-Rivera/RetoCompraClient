
import { ORIGIN_URL } from "./environment";

export const SIGN_IN = async (userInfo) => {
  try{
    const response = await fetch( ORIGIN_URL + "/api/auth/login", {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userInfo)
    })
        const result = await response.json();
        console.log(result)
    } catch(error) {
        console.log("Error " + error);
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

