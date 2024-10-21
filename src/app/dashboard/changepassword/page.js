import ChangePassword from "@/components/dashboard/ChangePassword";
import React from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const page = () => {
  return (
    <div>
       <ToastContainer/>
      <ChangePassword />
    </div>
  );
};

export default page;
