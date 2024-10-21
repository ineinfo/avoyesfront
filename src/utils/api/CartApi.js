


import React from 'react';
import axios from 'axios';

const addToCart = async (token, productDetails) => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/cart`, productDetails, {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
      console.log("Add to Cart API Response:", response.data); 
      return response.data;
    } catch (error) {
      console.error('Error adding to cart:', error);
      return { status: false, message: "Failed to add to cart" }; 
    }
  };

// Fetch cart API call without passing userId



const fetchCart = async (userId, accessToken) => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/cart/cartuser/${userId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data; // Expect this to return the cart items
  } catch (error) {
    console.error("Error fetching cart", error);
    return { status: false, message: "Error fetching cart data" };
  }
};






const updateCart = async (id, quantity, token) => {
  try {
      const response = await axios.put(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/cart/${id}`, { quantity }, {
          headers: {
              Authorization: `Bearer ${token}`,
          },
      });
      return response.data;
  } catch (error) {
      console.error('Error updating cart item:', error);
      throw error; // Propagate error to be handled by the caller
  }
};

export const removeFromCart = async (cartItemId, token) => {
  try {
    const response = await axios.delete(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/cart/${cartItemId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Remove from Cart API Response:", response.data);
    return response.data; // Assuming the response includes status
  } catch (error) {
    console.error('Error removing item from cart:', error);
    return { status: false, message: "Failed to remove item from cart" };
  }
};


export { addToCart, fetchCart, updateCart };
