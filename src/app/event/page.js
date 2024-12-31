import dynamic from 'next/dynamic';
import React from 'react';

// Dynamically import Event with SSR disabled
const Event = dynamic(() => import('@/components/Event'), {
    ssr: false,
});

export const metadata = {
    title: "Event - Avoyes",
    description: "Event page",
};

const Page = () => {
    return (
        <div>
            <Event />
        </div>
    );
};

export default Page;
