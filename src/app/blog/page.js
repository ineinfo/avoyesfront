import Blog from '@/components/Blog'
import React from 'react'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const metadata = {
    title: "Blog- Avoyes",
    description: " Blog Page",
  
  };

const page = () => {
    return (
        <>
            <ToastContainer />
            <Blog />
        </>
    )
}

export default page
