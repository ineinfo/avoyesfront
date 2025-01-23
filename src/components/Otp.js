"use client";
import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie'; // Import js-cookie
import { toast } from 'react-toastify';
import { Grid } from 'antd';

const {useBreakpoint} = Grid
const Otp = () => {
    const [otp, setOtp] = useState(["", "", "", "", "", ""]); // State for 6-digit OTP
    const inputRefs = useRef([]);
    const router = useRouter();
    const email = Cookies.get('email'); // Retrieve email from cookies
    const screens = useBreakpoint()
    // Handle input change
    const handleChange = (e, index) => {
        const { value } = e.target;
        if (isNaN(value) || value.length > 1) return; // Prevent non-numeric input

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Move focus to the next input if a digit is entered
        if (value && index < inputRefs.current.length - 1) {
            inputRefs.current[index + 1].focus();
        }

        // Check if all OTP digits are filled
        if (newOtp.every(val => val !== "")) {
            handleVerify(newOtp.join("")); // Verify when all fields are filled
        }
    };

    // Handle key down for backspace
    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    // Handle OTP verification
    // const handleVerify = async (enteredOtp) => {
    //     try {
    //         const response = await axios.post("/users/otp", {
    //             email: email, // Use email from cookies
    //             otp: enteredOtp, // Send the OTP
    //         });

    //         if (response.status === 200) {
    //             console.log("OTP verified successfully");
    //             // Redirect to new password page
    //             router.push("/new-password");
    //         }
    //     } catch (err) {
    //         console.error(err);
    //         if (err.response && err.response.data) {
    //             alert(err.response.data.message || "Invalid OTP. Please try again.");
    //         } else {
    //             alert("An unexpected error occurred. Please try again.");
    //         }
    //     }
    // };



    const handleVerify = async (enteredOtp) => {
        // Validate OTP input
        if (enteredOtp.length < 6) {
            toast.error("Please enter a valid 6-digit OTP.");
            return;
        }

        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/users/otp`, {
                email: email,
                otp: enteredOtp,
            });

            if (response.status === 200) {
                toast.success("OTP verified successfully!");
                setTimeout(() => {
                    router.push("/new-password");
                }, 3000);

                router.push("/new-password");
            }
        } catch (err) {
            const message = err.response && err.response.data
                ? err.response.data.message
                : "An unexpected error occurred. Please try again.";
            toast.error(message);
        }
    };


    return (
        <section>
            <div className="register">
                <div className="container-fluid">
                    <div className="row align-items-center">
                        <div className="col-md-7 ps-0">
                        <div className="register-img" style={{display: screens.sm ? 'block' : 'none'}}>
                                <img src="/auth-img-1.png" alt="Auth Image" />
                            </div>
                        </div>
                        <div className="col-md-5">
                            <div className="register-logo text-center">
                                <Link href={'/'}> <img src="/logo.png" alt="" /></Link>
                            </div>
                            <div className="register-text">
                                <h2>OTP</h2>
                                <p>ENTER THE OTP SENT TO YOUR EMAIL</p>
                            </div>
                            <div className="register-login-fields">
                                <div className="otp-container">
                                    {otp.map((digit, index) => (
                                        <input
                                            key={index}
                                            type="text"
                                            className="otp-box"
                                            maxLength="1"
                                            value={digit}
                                            onChange={(e) => handleChange(e, index)}
                                            onKeyDown={(e) => handleKeyDown(e, index)}
                                            ref={el => inputRefs.current[index] = el}
                                        />
                                    ))}
                                </div>

                                <div className="register-page-btn">
                                    <button type="button" onClick={() => handleVerify(otp.join(""))}>VERIFY</button>
                                </div>

                                <div className="line-container-register">
                                    <div className="line-register"></div>
                                    <span className="text">Or</span>
                                    <div className="line-register"></div>
                                </div>

                                <div className="already-acc">
                                    <p className="text-center">Didn’t Get OTP? Click on <Link href="#" className="text-decoration-none">Resend Now</Link></p>
                                </div>
                                <div className="already-acc-2">
                                    <p className="text-center">Back To <Link href="/login" className="text-decoration-none">Login</Link></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Otp;
