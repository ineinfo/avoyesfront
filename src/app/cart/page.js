import dynamic from 'next/dynamic';

const ToastContainer = dynamic(
    () => import('react-toastify').then((mod) => mod.ToastContainer),
    { ssr: false }
);

const Cart = dynamic(() => import('@/components/Cart'), { ssr: false });

const page = () => {
    return (
        <div>
            <ToastContainer />
            <Cart />
        </div>
    );
};

export default page;
