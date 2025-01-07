import BlogDetails from '@/components/BlogDetails'
import React from 'react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const metadata = {
    title: "Blog-Detail - Avoyes",

};
const page = () => {
    return (
        <>

            <ToastContainer />
            <BlogDetails />
        </>
    )
}

export default page
