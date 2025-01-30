import dynamic from 'next/dynamic';

const Activity = dynamic(() => import('@/components/Activity'));

export const metadata = {
    title: "Activity - Avöyes ",
};

const page = () => {

    return <div><Activity /></div>;
}

export default page;
