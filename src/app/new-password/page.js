import NewPassword from '@/components/NewPassword'
import React from 'react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const page = () => {
    return (
        <div>

            <ToastContainer/>
            <NewPassword />
        </div>
    )
}

export default page
