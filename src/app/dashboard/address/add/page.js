import AddressForm from "@/components/dashboard/AddressForm";
import React from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const page = () => {
  return (
    <div>
      <ToastContainer/>
      <AddressForm />
    </div>
  );
};

export default page;
