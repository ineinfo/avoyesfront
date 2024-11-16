import axios from 'axios';

const fetchBanner = async () => {
  try {
    const response1 = await axios.get(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/banner/1`);
    const response2 = await axios.get(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/banner/2`);
    const response3 = await axios.get(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/banner/3`);
    // const response1 = await axios.get(`http://192.168.1.5:3002/api/banner/1`);
    // const response2 = await axios.get(`http://192.168.1.5:3002/api/banner/2`);
    // const response3 = await axios.get(`http://192.168.1.5:3002/api/banner/3`);

    const response = [
      response1.data.data,
      response2.data.data,
      response3.data.data,
    ]
    console.log('RESULT', response);

    return response;
  } catch (error) {
    console.error("Error fetching events", error);
    return { status: false, message: "Error fetching events data" };
  }
};



const fetchTopBanner = async () => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/banner/top`);
    console.log("banner", process.env.NEXT_PUBLIC_NEXTAUTH_URL);

    return response.data;
  } catch (error) {
    console.error("Error fetching events", error);
    return { status: false, message: "Error fetching events data" };
  }
};




export { fetchTopBanner, fetchBanner };