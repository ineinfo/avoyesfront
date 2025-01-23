
import axios from 'axios';
import Cookies from 'js-cookie';

export const fetchFoodTypes = async () => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/food-type`);
    return Array.isArray(response.data.data) ? response.data.data : [];
  } catch (error) {
    console.error("Error fetching food types:", error);
    return [];
  }
};

export const fetchFoodPlaces = async () => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/food-place`);
    return Array.isArray(response.data.data) ? response.data.data : [];
  } catch (error) {
    console.error("Error fetching food places:", error);
    return [];
  }
};

export const fetchFoodBlogs = async () => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/blog`);
    return response.data;
  } catch (error) {
    console.error("Error fetching blogs:", error);
    throw error;
  }
};

export const fetchPlaceDetails = async (id) => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/food-place/${id}`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching place details:', error);
    return null;
  }
};

export const fetchPopularDish = async (id) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/popular-dishes/foodplace/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch slider data');
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching slider data:', error);
    return [];
  }
};


export const getUserData = async () => {
  const userId = Cookies.get('id');
  const token = Cookies.get('accessToken');

  if (!userId || !token) {
    throw new Error('User ID or Token not found');
  }

  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};

export const fetchTimes = async () => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/time`);
    // Return the 'data' field of the response
    return response.data.data || []; // Ensure it defaults to an empty array if data is undefined
  } catch (error) {
    console.error("Error fetching times:", error);
    return []; // In case of an error, return an empty array
  }
};

export const makeReservation = async ({ time_id, food_place_id, people, date }) => {
  const token = Cookies.get('accessToken');

  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/reservation`,
      {
        time_id,
        food_place_id,
        people,
        date
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("===", response.data);
    return response.data;
  } catch (error) {
    console.error("Failed to make reservation", error);
    throw error;
  }
};


export const fetchReservations = async () => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/reservation`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching reservation:", error);
    throw error;
  }
};