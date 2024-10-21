import Otp from '@/components/Otp'
import React from 'react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const page = () => {
    return (
        <div>
            <ToastContainer/>
            <Otp />
        </div>
    )
}

export default page
