import axios from "axios";
import Cookies from "js-cookie";

export const placeOrder = async (data) => {
    const accessToken = Cookies.get("accessToken");
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/orders`, data, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });

        return response.data;
    } catch (err) {
        console.error('Failed to post address:', err);
        throw err;
    }
};

export const getOrder = async () => {
    const accessToken = Cookies.get("accessToken");

    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/orders`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return response.data.data;
    } catch (err) {
        console.error('Failed to fetch address:', err);
        throw err;
    }
}

export const fetchOrderDetails = async (id) => {
    const accessToken = Cookies.get("accessToken");

    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/orders/${id}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return response.data.data;
    } catch (err) {
        console.error('Failed to fetch address:', err);
        throw err;
    }
}