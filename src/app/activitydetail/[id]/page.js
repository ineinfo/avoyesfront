import ActivityDetails from '@/components/ActivityDetails'
import React from 'react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const metadata = {
    title: "Activity-Detail - Avoyes",
    
  };
const page = () => {
    return (
        <div>
            <ToastContainer/>
            <ActivityDetails />
        </div>
    )
}

export default page
