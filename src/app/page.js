import LoadingSpinner from '@/components/Loading';
import dynamic from 'next/dynamic';

const CustomComponent = dynamic(() => import('@/components/Home'), {
  ssr: false,
  loading: () => <div><LoadingSpinner /></div>
});
export const metadata = {
  title: 'Avöyes ',
  icons: {
    icon: "/icon.png",
  }
};
const Page = () => {
  return (
    <>
      <CustomComponent />
    </>
  );
};

export default Page;
