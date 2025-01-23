


"use client"
import React, { useState } from "react";
import "../assets/css/style.css";
import "../assets/css/responsive.css";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import Cookies from 'js-cookie'; // Import js-cookie
import { toast } from 'react-toastify';
import { Grid } from "antd";

const {useBreakpoint} = Grid
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const router = useRouter(); 
  const screens = useBreakpoint()


  const handleSubmit = async () => {
    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      toast.error("Please enter a valid email address."); // Use toast for error
      return;
    }

    try {
      const response = await axios.put(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/users/forgotpassword`, {
        email: email,
      });

      if (response.status === 200) {
        // Store email in cookies
        Cookies.set('email', email); // Store email in a cookie
        // Show success toast
        toast.success("Password reset link sent to your email!");
        setTimeout(() => {
          router.push("/otp");
      }, 6000);
        // Redirect to OTP page
        // router.push("/otp"); 
      }
    } catch (err) {
      if (err.response && err.response.data) {
        // Display the specific error message from the backend
        toast.error(err.response.data.error || "An error occurred, please try again."); // Use toast for error
      } else {
        toast.error("An unexpected error occurred."); // Use toast for unexpected error
      }
    }
  };


  return (
    <section>
      <div className="register">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-md-7 ps-0">
            <div className="register-img" style={{display: screens.sm ? 'block' : 'none'}}>
                <img src="/auth-img-1.png" alt="" />
              </div>
            </div>
            <div className="col-md-5">
              <div className="register-logo text-center">
                <Link href={'/'}> <img src="/logo.png" alt="" /></Link>
              </div>
              <div className="register-text">
                <h2>FORGOT PASSWORD?</h2>
                <p>GREAT TO HAVE YOU BACK!</p>
              </div>
              <div className="register-login-fields">
                <div className="input-group forgot-field">
                  <input
                    type="email"
                    className="form-control login register-input"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                {error && <div className="alert alert-danger">{error}</div>}
                <div className="register-page-btn">
                  <button type="button" onClick={handleSubmit}>SUBMIT</button>
                </div>
                <div className="line-container-register">
                  <div className="line-register"></div>
                  <span className="text">Or</span>
                  <div className="line-register"></div>
                </div>
                <div className="already-acc">
                  <p className="text-center">
                    Back To{" "}
                    <Link href="/register" className="text-decoration-none">
                      Register Now
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;
