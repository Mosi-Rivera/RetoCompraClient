export const SIGN_IN = async (userInfo) => {
    try {
        const response = await fetch("http://localhost:4800/login", {
            method: "POST",
            credentials: "include",
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userInfo)
        })
        const result = await response.json();
        console.log(result)
    } catch (error) {
        console.log("Error ", error)
    }
}