import Profile from "@/components/dashboard/Profile";
import React from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const page = () => {
  return (
    <div>
        <ToastContainer /> 
      <Profile />
    </div>
  );
};

export default page;
