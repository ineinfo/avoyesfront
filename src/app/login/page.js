import Login from '@/components/Login'
import React from 'react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const page = () => {
    return (
        <div>
             <ToastContainer /> 
            <Login />
        </div>
    )
}

export default page
