import dynamic from 'next/dynamic';

const CustomComponent = dynamic(() => import('@/components/Home'), {
  ssr: false,
  loading: () => <div>Loading...</div>
});
export const metadata = {
  title: 'Avoyes',
};
const Page = () => {
  return (
    <div>
      <CustomComponent />
    </div>
  );
};

export default Page;
