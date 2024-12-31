import dynamic from 'next/dynamic';

const CustomComponent = dynamic(() => import('@/components/Home'), {
  ssr: false,
  loading: () => <div>Loading...</div>
});

const Page = () => {
  return (
    <div>
      <CustomComponent />
    </div>
  );
};

export default Page;
