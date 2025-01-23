

"use client";
import React, { useState } from 'react';
import "../assets/css/style.css";
import "../assets/css/responsive.css";
import Link from 'next/link';
import axios from 'axios';
import Cookies from 'js-cookie'; // Import the cookies package
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for Toastify
import { Grid } from 'antd';

const {useBreakpoint} = Grid
const NewPassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const router = useRouter();
    const screens = useBreakpoint()
    const handleChangePassword = async () => {
        if (!newPassword || !confirmPassword) {
            toast.error("Both password fields are required."); // Show error toast
            return;
        }

        if (newPassword !== confirmPassword) {
            toast.error("Passwords do not match."); // Show error toast
            return;
        }

        // Get email from cookies
        const email = Cookies.get('email');

        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/users/newpassword`, {
                new_password: newPassword,
                confirm_password: confirmPassword,
                email 
            });

            if (response.status === 200) {
                toast.success("Password changed successfully!"); 
                Cookies.remove('email');
                router.push('/login');
            }
        } catch (err) {
            if (err.response && err.response.data) {
                toast.error(err.response.data.error || "An error occurred, please try again."); 
            } else {
                toast.error("An unexpected error occurred.");
            }
        }
    };

    return (
        <>
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
                                    <h2>NEW PASSWORD</h2>
                                    <p>GREAT TO HAVE YOU BACK!</p>
                                </div>
                                <div className="register-login-fields">
                                    <div className="input-group newpwd-field-1">
                                        <input 
                                            type="password" 
                                            className="form-control login register-input" 
                                            placeholder="Password" 
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                        />
                                    </div>
                                    <div className="input-group newpwd-field-2">
                                        <input 
                                            type="password" 
                                            className="form-control login register-input" 
                                            placeholder="Confirm Password" 
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                        />
                                    </div>
                                    <div className="register-page-btn">
                                        <button type="button" onClick={handleChangePassword}>CHANGE PASSWORD</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <ToastContainer /> {/* Include ToastContainer to render toasts */}
        </>
    );
}

export default NewPassword;
