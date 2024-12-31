import dynamic from 'next/dynamic';
import Checkout from '@/components/Checkout';

const ToastContainer = dynamic(
    () => import('react-toastify').then((mod) => mod.ToastContainer),
    { ssr: false }
);

const page = () => {
    return (
        <>
            <ToastContainer />
            <Checkout />
        </>
    );
};

export default page;
