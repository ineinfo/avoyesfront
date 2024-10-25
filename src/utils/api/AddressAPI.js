import axios from "axios";
import Cookies from "js-cookie";

export const fetchAddress = async () => {
    const userId = Cookies.get("id");
    const accessToken = Cookies.get("accessToken");

    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/address`, {
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

export const AddAddress = async (data) => {
    const userId = Cookies.get("id");
    const accessToken = Cookies.get("accessToken");

    try {
        const updatedData = {
            ...data,
            user_id: userId
        };

        const response = await axios.post(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/address`, updatedData, {
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
