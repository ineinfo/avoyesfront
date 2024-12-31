import dynamic from 'next/dynamic';

const Challenges = dynamic(() => import('@/components/Challenges'), { ssr: false });

const Page = () => {
    return (
        <div>
            <Challenges />
        </div>
    );
};

export default Page;
