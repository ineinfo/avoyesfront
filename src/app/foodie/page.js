import dynamic from 'next/dynamic';
import React from 'react';

// Dynamically import Foodie with SSR disabled
const Foodie = dynamic(() => import('@/components/Foodie'), {
    ssr: false,
});

const Page = () => {
    return (
        <>
            <Foodie />
        </>
    );
};

export default Page;
