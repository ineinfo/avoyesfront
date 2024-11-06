import axios from 'axios';

const fetchBanner = async () => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/banner/bottom`);
    return response.data; 
  } catch (error) {
    console.error("Error fetching events", error);
    return { status: false, message: "Error fetching events data" };
  }
};



const fetchTopBanner = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/banner/top`);
      console.log("banner",process.env.NEXT_PUBLIC_NEXTAUTH_URL);

      return response.data; 
    } catch (error) {
      console.error("Error fetching events", error);
      return { status: false, message: "Error fetching events data" };
    }
  };
  


  
export { fetchTopBanner,fetchBanner };