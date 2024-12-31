import dynamic from 'next/dynamic';
import React from 'react';
import 'react-toastify/dist/ReactToastify.css';

// Dynamically import ProductDetails with SSR disabled
const ProductDetails = dynamic(() => import('@/components/ProductDetails'), {
    ssr: false,  // Disable SSR for ProductDetails
});
const ToastContainer = dynamic(() => import('react-toastify').then((mod) => mod.ToastContainer), {
    ssr: false,
});
const Page = () => {
    return (
        <div>
            <ToastContainer />
            <ProductDetails />
        </div>
    );
};

export default Page;
