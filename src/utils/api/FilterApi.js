// api.js
import axios from 'axios';

// Fetch categories
export const fetchCategories = async () => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/product-category`);
        return response.data.data;
    } catch (err) {
        console.error('Failed to fetch categories:', err);
        throw err;
    }
};

// Fetch prices
export const fetchPrices = async () => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/prices`);
        return response.data;
    } catch (err) {
        console.error('Failed to fetch prices:', err);
        throw err;
    }
};

// Fetch Ratings
export const fetchRatings = async () => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/ratings`);
        return response.data.data;
    } catch (err) {
        console.error('Failed to fetch prices:', err);
        throw err;
    }
};

// Fetch Types
export const fetchTypes = async () => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/product-type`);
        return response.data.data;
    } catch (err) {
        console.error('Failed to fetch prices:', err);
        throw err;
    }
};

// Fetch BestFor
export const fetchBestFor = async () => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/best`);
        return response.data.data;
    } catch (err) {
        console.error('Failed to fetch prices:', err);
        throw err;
    }
};