import axios from 'axios';

// Fetch activities
export const fetchActivities = async () => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/activities`);
    
    return response.data;
  } catch (error) {
    console.error("Error fetching activities:", error);
    throw error;
  }
};

// Fetch countries
export const fetchCountries = async () => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/countries`);
    console.log("country", response.data); 
    return response.data; 
  } catch (error) {
    console.error("Error fetching countries:", error);
    throw error;
  }
};

// Fetch activity categories
export const fetchActivityCategories = async () => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/activitycategory`);
    console.log("activity categories", response.data); 
    return response.data; 
  } catch (error) {
    console.error("Error fetching activity categories:", error);
    throw error;
  }
};
