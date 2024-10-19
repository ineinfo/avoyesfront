
"use client"
import React, { useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import { toast } from 'react-toastify';
 
const ChangePassword = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleChangePassword = async () => {
        if (!currentPassword || !newPassword || !confirmPassword) {
            toast.error('All fields are required.');
            return;
        }
    
        if (newPassword !== confirmPassword) {
            toast.error('New password and confirm password do not match.');
            return;
        }
    
        try {
            const token = Cookies.get('accessToken'); 
            const userId = Cookies.get('id');
    
            const requestData = {
                current_password: currentPassword, 
                new_password: newPassword,       
                confirm_password: confirmPassword, 
            };
    
            console.log('Request Data:', requestData); 
    
            const response = await axios.put('http://localhost:3002/api/users/changepassword', requestData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
    
            toast.success('Password changed successfully!');
        } catch (error) {
            if (error.response && error.response.data) {
                console.error('Error Response:', error.response.data); 
          
                toast.error(error.response.data.error || 'An unexpected error occurred.');
            } else {
                toast.error('An unexpected error occurred.');
            }
        }
    };
    
    

    return (
        <>
            <div className="my-order-head">
                <h2><span>CHANGE </span>Password</h2>
            </div>
            <div className="row">
                <div className="col-xl-6">
                    <div className="change-pwd-main">
                        <input 
                            type="password" 
                            className="form-control login profile-input" 
                            placeholder="Current Password" 
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                        />
                        <input 
                            type="password" 
                            className="form-control login profile-input" 
                            placeholder="New Password" 
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                        <input 
                            type="password" 
                            className="form-control login profile-input" 
                            placeholder="Confirm Password" 
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        {error && <div className="error-message">{error}</div>}
                        <div className="pwd-update">
                            <button type="button" onClick={handleChangePassword}>UPDATE</button>
                        </div>
                    </div>
                </div>
                <div className="col-xl-6"></div>
            </div>
        </>
    );
};

export default ChangePassword;
