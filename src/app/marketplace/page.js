import dynamic from 'next/dynamic';
import React from 'react';

// Dynamically import MarketPlace with SSR disabled
const MarketPlace = dynamic(() => import('@/components/MarketPlace'), {
    ssr: false,
});

const Page = () => {
    return (
        <>
            <MarketPlace />
        </>
    );
};

export default Page;
