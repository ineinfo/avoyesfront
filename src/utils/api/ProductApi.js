import React from 'react'
import axios from 'axios';

const fetchProducts = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/products`);
      return response.data; 
    } catch (error) {
      console.error("Error fetching events", error);
      return { status: false, message: "Error fetching events data" };
    }
  };

export default fetchProducts;
