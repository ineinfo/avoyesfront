import axios from 'axios';
import Cookies from 'js-cookie';

export const fetchCountries = async () => {
    const Token = Cookies.get("accessToken");

    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/countries`, {
            headers: {
                Authorization: `Bearer ${Token}`
            }
        });
        return response.data.data;
    } catch (err) {
        console.error('Failed to fetch prices:', err);
        throw err;
    }
};

export const fetchStates = async (id) => {
    const Token = Cookies.get("accessToken");
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/state/${id}`, {
            headers: {
                Authorization: `Bearer ${Token}`
            }
        });
        return response.data.data;
    } catch (err) {
        console.error('Failed to fetch prices:', err);
        throw err;
    }
};

export const fetchCities = async (id) => {
    const Token = Cookies.get("accessToken");

    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/cities/${id}`, {
            headers: {
                Authorization: `Bearer ${Token}`
            }
        });
        return response.data.data;
    } catch (err) {
        console.error('Failed to fetch prices:', err);
        throw err;
    }
};

export const fetchSizes = async () => {
    const Token = Cookies.get("accessToken");

    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/product-size`, {
            headers: {
                Authorization: `Bearer ${Token}`
            }
        });
        return response.data.data;
    } catch (err) {
        console.error('Failed to fetch prices:', err);
        throw err;
    }
};

export const fetchColors = async () => {
    const Token = Cookies.get("accessToken");

    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/product-colors`, {
            headers: {
                Authorization: `Bearer ${Token}`
            }
        });
        return response.data.data;
    } catch (err) {
        console.error('Failed to fetch prices:', err);
        throw err;
    }
}

export const fetchUserDetails = async () => {
    const Token = Cookies.get("accessToken");
    const userId = Cookies.get('id');

    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/users/${userId}`, {
            headers: {
                Authorization: `Bearer ${Token}`
            }
        });
        return response.data.data;
    } catch (err) {
        console.error('Failed to fetch prices:', err);
        throw err;
    }
}