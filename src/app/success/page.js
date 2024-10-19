import PaymentSuccess from '@/components/PaymentSuccess'
import React from 'react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const page = () => {
    return (
        <>
            <ToastContainer />
            <PaymentSuccess />
        </>
    )
}

export default page
