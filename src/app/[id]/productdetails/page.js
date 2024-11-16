
import ProductDetails from '@/components/ProductDetails'
import React from 'react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const page = () => {
    return (
        <div>
            <ToastContainer />
            <ProductDetails />
        </div>
    )
}

export default page
