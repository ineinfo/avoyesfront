import ManageAddress from "@/components/dashboard/ManageAddress";
import React from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const page = () => {
  return (
    <div>
      <ToastContainer/>
      <ManageAddress />
    </div>
  );
};

export default page;
