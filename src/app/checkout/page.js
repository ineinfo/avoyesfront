import dynamic from 'next/dynamic';
import React from 'react';
const Checkout = dynamic(() => import('@/components/Checkout'), {
    ssr: false,
});

const page = () => {
    return (
        <>
            <Checkout />
        </>
    );
};

export default page;
