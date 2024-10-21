import Checkout from '@/components/Checkout'
import { AuthProvider } from '@/utils/Guard'
import React from 'react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const page = () => {
    return (
        <>
        
        <ToastContainer />
            <Checkout />
        
        </>
      
       
    )
}

export default page
