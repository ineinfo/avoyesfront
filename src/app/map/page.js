// import Map from '@/components/Map'
// import React from 'react'

// const page = () => {
//     return (
//         <div>
//             <Map />
//         </div>
//     )
// }

// export default page
 

import dynamic from "next/dynamic";

const Map = dynamic(() => import('@/components/Map'), { ssr: false });

const page = () => {
    return (
        <div>
            <Map />
        </div>
    );
};

export default page;
