import BrandPartner from '@/components/BrandPartner'
import React from 'react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const page = () => {
    return (
        <div>
            <ToastContainer />
            <BrandPartner />
        </div>
    )
}

export default page
