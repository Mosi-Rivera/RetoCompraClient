export const signIn = async (userInfo) => {
    try {
        const response = await fetch("http://localhost:4800/api/auth/login", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userInfo)
        })
        const result = await response.json();
        console.log(result)
    } catch (error) {
        console.log("Error " + error)
    }
}
