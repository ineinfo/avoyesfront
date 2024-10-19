import ContactUs from '@/components/ContactUs'
import React from 'react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const page = () => {
    return (
        <div>
            <ToastContainer />
            <ContactUs />
        </div>
    )
}

export default page
