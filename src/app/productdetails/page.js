import dynamic from 'next/dynamic';
import React from 'react';

// Dynamically import ProductDetails and ToastContainer with SSR disabled
const ProductDetails = dynamic(() => import('@/components/ProductDetails'), {
    ssr: false,
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
