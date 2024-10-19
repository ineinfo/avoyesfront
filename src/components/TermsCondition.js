"use client";



import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import axios from 'axios'; 

const TermsCondition = () => {
    const [termsData, setTermsData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTermsData = async () => {
            try {
                const response = await axios.get("http://localhost:3002/api/pages/2"); // Use axios for the API call
                console.log(response.data); // Log the fetched data to the console

                if (response.data.status) {
                    setTermsData(response.data.data);
                } else {
                    console.error("Failed to fetch terms data:", response.data.message);
                }
            } catch (error) {
                console.error("Error fetching terms data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTermsData();
    }, []);

    if (loading) {
        return <div>Loading...</div>; // Optional loading state
    }

    if (!termsData) {
        return <div>No terms data available.</div>; // Handle case if termsData is null
    }

    return (
        <>
            <div className="breadcrumb-marketplace py-5">
                <div className="img">
                    <img src="" alt="" />
                    <div className="container">
                        <div className="bread-head text-end">
                            <div className="link d-flex align-items-center justify-content-end">
                                <Link href="/" className="text-decoration-none me-1">HOME</Link>
                                <Link href="/terms-and-conditions" className="text-decoration-none me-1">/ TERMS & CONDITIONS</Link>
                            </div>
                            <h1>{termsData.title}</h1> {/* Fetch title from the API */}
                        </div>
                    </div>
                </div>
            </div>

            <div className="tc-page-main py-5">
                <div className="container">
                    <div className="tandcpara">
                        <p>{termsData.description}</p> {/* Fetch description from the API */}
                    </div>
                </div>
            </div>
        </>
    );
}

export default TermsCondition;
