import dynamic from 'next/dynamic';

const Activity = dynamic(() => import('@/components/Activity'));

const page = () => {

    return <div><Activity /></div>;
}

export default page;
