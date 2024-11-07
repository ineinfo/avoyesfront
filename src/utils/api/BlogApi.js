import axios from 'axios';
import Cookies from 'js-cookie';

const fetchBlogs = async () => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/blog`);
    return response.data; 
  } catch (error) {
    console.error("Error fetching events", error);
    return { status: false, message: "Error fetching Blog data" };
  }
};

const fetchBlogCategory = async () => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/blog-category`);
    return response.data; 
  } catch (error) {
    console.error("Error fetching events", error);
    return { status: false, message: "Error fetching Blog Category  data" };
  }
};

const fetchBlogTags = async () => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/blog-tags`);
    return response.data; 
  } catch (error) {
    console.error("Error fetching events", error);
    return { status: false, message: "Error fetching blog tags data" };
  }
};



const fetchBlogById = async (id) => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/blog/${id}`);
    return response; 
  } catch (error) {
    console.error("Error fetching blog by ID", error);
    return { status: false, message: "Error fetching blog data" };
  }
};


const fetchBlogComments = async () => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/blog-comments`);
    return response.data; 
    
  } catch (error) {
    console.error("Error fetching events", error);
    return { status: false, message: "Error fetching blog comments data" };
  }

};

 const addBlogComment = async (blog_id, comment) => {
  const user_id = Cookies.get('id');
  const accessToken = Cookies.get('accessToken');

  try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/blog-comments`, {
          blog_id,
          user_id,
          comment,
      }, {
          headers: {
              Authorization: `Bearer ${accessToken}`
          }
      });

      return response.data.data; 
  } catch (error) {
      throw new Error("Failed to submit comment");
  }
};




export { fetchBlogs,fetchBlogCategory,fetchBlogTags,fetchBlogComments,fetchBlogById ,addBlogComment};
