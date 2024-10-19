import Register from '@/components/Register'
import React from 'react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const page = () => {
    return (
        <div>
            <ToastContainer />
            <Register />
        </div>
    )
}

export default page
