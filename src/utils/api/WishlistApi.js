import React from 'react'


import axios from 'axios';

const WishlistApi = async (data, token) => {
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/wishlist`, data, {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });
    console.log("API Response:", response.data); 
    return response.data; 
  } catch (error) {
    console.error('Error updating wishlist:', error);
    return { status: false, message: "Failed to update wishlist" }; 
  }
};

export default WishlistApi;
