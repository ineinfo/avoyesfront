import React from 'react';
import dynamic from 'next/dynamic';

// Dynamically import ActivityList with ssr: false
const ActivityList = dynamic(() => import('@/components/ActivityList'), { ssr: true });

const page = () => {
    return (
        <div>
            <ActivityList /> {/* ActivityList rendered on the client side only */}
        </div>
    );
};

export default page;
