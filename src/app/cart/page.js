import dynamic from 'next/dynamic';
import Cart from '@/components/Cart';

const ToastContainer = dynamic(
    () => import('react-toastify').then((mod) => mod.ToastContainer),
    { ssr: false }
);

const page = () => {
    return (
        <div>
            <ToastContainer />
            <Cart />
        </div>
    );
};

export default page;
