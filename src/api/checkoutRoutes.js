import { ORIGIN_URL } from "./environment";

export const checkout = async (userDeliveryInfo) => {
    const response = await fetch(ORIGIN_URL + "/api/order/checkout", {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userDeliveryInfo)
    })
    if (!response.ok)
        return Promise.reject(response);
    return response.json();
}