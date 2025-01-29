import React from 'react';
import dynamic from 'next/dynamic';

// Dynamically import ActivityDetails with ssr: false
const ActivityDetails = dynamic(() => import('@/components/ActivityDetails'), { ssr: true });

// Dynamically import ToastContainer with ssr: false
const ToastContainer = dynamic(() => import('react-toastify').then((mod) => mod.ToastContainer), {
    ssr: false
});
import 'react-toastify/dist/ReactToastify.css'; // Import the toastify CSS

export const metadata = {
    title: "Activity-Detail - Avöyes ",
};

const page = () => {
    return (
        <div>
            <ToastContainer /> {/* Add the ToastContainer dynamically */}
            <ActivityDetails /> {/* Add the ActivityDetails dynamically */}
        </div>
    );
};

export default page;
