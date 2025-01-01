import dynamic from 'next/dynamic';
import React from 'react';

// Dynamically import ProductDetails with SSR disabled
const ProductDetails = dynamic(() => import('@/components/ProductDetails'), {
    ssr: false,
});

const Page = () => {
    return (
        <div>
            <ProductDetails />
        </div>
    );
};

export default Page;
