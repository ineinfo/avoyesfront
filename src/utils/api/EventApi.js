import axios from 'axios';

const fetchEvents = async () => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/events`);
    return response.data; 
  } catch (error) {
    console.error("Error fetching events", error);
    return { status: false, message: "Error fetching events data" };
  }
};

const fetchEventsFeatured = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/events/featured`);
      return response.data; 
    } catch (error) {
      console.error("Error fetching events", error);
      return { status: false, message: "Error fetching events data" };
    }
  };

  const fetchEventsVideo = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/events/eventvideo`);
      return response.data; 
    } catch (error) {
      console.error("Error fetching events", error);
      return { status: false, message: "Error fetching events data" };
    }
  };

  // const fetchCategories = async () => {
  //   try {

  //     const response = await axios.get(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/eventcategory`);
  //     console.log("daharaa3",response.data.data)

  //     return response.data.data;
  //   } catch (error) {
  //     console.error("Error fetching categories", error);
  //     return { status: false, message: "Error fetching categories data" };
  //   }
  // };



  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/eventcategory`);
      console.log("daharaa3", response.data.data);
      return { status: true, data: response.data.data };  // Return with `status: true`
    } catch (error) {
      console.error("Error fetching categories", error);
      return { status: false, message: "Error fetching categories data" };
    }
  };
  
  
  const fetchSpeakers = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/eventspeaker`);
      return response.data; 
    } catch (error) {
      console.error("Error fetching speakers", error);
      return { status: false, message: "Error fetching speakers data" };
    }
  };

  // New fetchEventDetails function
const fetchEventDetails = async (id) => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/events/${id}`);
    return response.data.data; 
  } catch (error) {
    console.error(`Error fetching event details for ID ${id}`, error);
    return { status: false, message: `Error fetching event details for ID ${id}` };
  }
};
  

export { fetchEvents,fetchEventsFeatured  , fetchEventsVideo,fetchCategories,fetchSpeakers,fetchEventDetails};
