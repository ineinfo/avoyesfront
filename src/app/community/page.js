import Community from '@/components/Community'
import React from 'react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const page = () => {
    return (
        <div>
            <ToastContainer />
            <Community />
        </div>
    )
}

export default page
