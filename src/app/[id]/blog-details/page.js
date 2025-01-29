import BlogDetails from '@/components/BlogDetails'
import React from 'react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const metadata = {
    title: "Blog-Detail - Avöyes ",

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
