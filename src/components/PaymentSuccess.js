"use client"
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const PaymentSuccess = () => {
    const [seconds, setSeconds] = useState(10);
    const router = useRouter();

    const [orderId, setOrderId] = useState('');

    useEffect(() => {
        const { searchParams } = new URL(window.location.href);
        const idFromUrl = searchParams.get('id');
        if (idFromUrl) {
            setOrderId(idFromUrl);  // URL se id ko orderId me set karte hain
        }
    }, []);

    useEffect(() => {
        const countdown = setInterval(() => {
            setSeconds((prev) => prev - 1);
        }, 1000);

        // Redirect after 10 seconds
        if (seconds === 0) {
            router.push('/');
        }

        return () => clearInterval(countdown);
    }, [seconds, router]);



    return (
        <>
            <div className="breadcrumb-marketplace py-5">
                <div className="img">
                    <img src="" alt="" />
                    <div className="container">
                        <div className="bread-head text-end">
                            <div className="link d-flex align-items-center justify-content-end">
                                <Link href="/" className="text-decoration-none me-1">HOME</Link>
                                <p className="m-0">/ payment successful</p>
                            </div>
                            <h1>Payment Successful</h1>
                        </div>
                    </div>
                </div>
            </div>

            <div
                className="success-payment container d-flex flex-column align-items-center justify-content-center min-vh-100 text-center">
                <img src="/payment-successfull.png" alt="Success Image" className="img-fluid mb-4" />

                <h2 className="mb-3">Payment Successful</h2>

                <p className="mb-0">Thank you! Your order is confirmed.</p>
                <p>A confirmation email has been sent. For any questions, contact support and provide your Order ID: &nbsp;
                    <span className="order-id">{orderId}</span>.
                </p>

                <div className="d-flex align-items-center gap-5 justify-content-center mt-5" >
                    <Link style={{
                        textTransform: "uppercase",
                        padding: "13px 50px",
                        borderRadius: "7px",
                        backgroundColor: "#0000FF",
                        color: "#fff",
                        fontSize: "15px",
                        fontFamily: "lato",
                        border: "none",
                    }} href="/" >Go to Home</Link> <span >Or</span>
                    <div style={{
                        textTransform: "uppercase",
                        padding: "13px 50px",
                        borderRadius: "7px",
                        backgroundColor: "#0000FF",
                        color: "#fff",
                        fontSize: "15px",
                        fontFamily: "lato",
                        border: "none",
                    }}>Redirecting in {seconds} seconds...</div>
                </div>
            </div>
        </>
    )
}

export default PaymentSuccess;
