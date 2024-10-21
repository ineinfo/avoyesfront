import CustomerSupport from '@/components/CustomerSupport'
import React from 'react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const page = () => {
    return (
        <div>
            <ToastContainer />
            <CustomerSupport />
        </div>
    )
}

export default page
