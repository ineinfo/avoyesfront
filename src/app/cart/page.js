import Cart from '@/components/Cart'
import React from 'react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const page = () => {
    return (
        <div>
            <ToastContainer />
           
            <Cart />
        </div>
    )
}

export default page
