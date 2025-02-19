import dynamic from 'next/dynamic';
import React from 'react';

const Cart = dynamic(() => import('@/components/Cart'), { ssr: false });

const page = () => {
    return (
        <div>
            <Cart />
        </div>
    );
};

export default page;
