import Reservation from '@/components/Reservation';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Page = ({ params }) => {
    const { id } = params;

    return (
        <div>
            <ToastContainer />
            <Reservation id={id} />
        </div>
    );
};

export default Page;
