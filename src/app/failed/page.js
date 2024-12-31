import dynamic from 'next/dynamic';
import React from 'react';

// Dynamically import the PaymentFailed component with SSR disabled
const PaymentFailed = dynamic(() => import('@/components/PaymentFailed'), {
    ssr: false,
});

const Page = () => {
    return (
        <div>
            <PaymentFailed />
        </div>
    );
};

export default Page;
