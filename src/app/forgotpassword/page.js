import ForgotPassword from '@/components/ForgotPassword'
import React from 'react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const page = () => {
    return (
        <div>
            <ToastContainer/>
            <ForgotPassword />
        </div>
    )
}

export default page
