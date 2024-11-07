import BlogDetails from '@/components/BlogDetails'
import React from 'react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const metadata = {
    title: "Blog-Detail - Avoyes",
    
  };
const page = () => {
    return (
        <div>
            <ToastContainer/>
            <BlogDetails />
        </div>
    )
}

export default page
