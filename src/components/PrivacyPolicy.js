"use client"; 

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';

const PrivacyPolicy = () => {
    const [privacyData, setPrivacyData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPrivacyData = async () => {
            try {
                const response = await axios.get("http://localhost:3002/api/pages/1");
                console.log(response.data); // Log the fetched data
                
                if (response.data.status) {
                    setPrivacyData(response.data.data);
                } else {
                    console.error("Failed to fetch privacy data:", response.data.message);
                }
            } catch (error) {
                console.error("Error fetching privacy data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPrivacyData();
    }, []);

    if (loading) {
        return <div>Loading...</div>; // Optional loading state
    }

    if (!privacyData) {
        return <div>No privacy policy data available.</div>; // Handle case if privacyData is null
    }

    // Split description into paragraphs
    const paragraphs = privacyData.description.split(/<\/p>\s*<p>/).map(para => para.replace(/<\/?p>/g, ''));

    return (
        <>
            <div className="breadcrumb-marketplace py-5">
                <div className="img">
                    <img src="" alt="" />
                    <div className="container">
                        <div className="bread-head text-end">
                            <div className="link d-flex align-items-center justify-content-end">
                                <Link href="/" className="text-decoration-none me-1">HOME</Link>
                                <Link href="/privacy-policy" className="text-decoration-none me-1">/ PRIVACY POLICY</Link>
                            </div>
                            <h1>{privacyData.title || "Privacy Policy"}</h1> {/* Static title */}
                        </div>
                    </div>
                </div>
            </div>

            <div className="privacy-policy py-5 my-4">
                <div className="container">
                    <ol className="list-group list-group-numbered">
                        {paragraphs.map((paragraph, index) => (
                            <li key={index} className="list-group-item d-flex justify-content-between align-items-start">
                                <div className="ms-2 me-auto">
                                    <div className="pp-head">{privacyData.title}</div> {/* Dynamic title from API */}
                                    <p className="pp-para" dangerouslySetInnerHTML={{ __html: paragraph }}></p> {/* Dynamic description */}
                                </div>
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        </>
    );
}

export default PrivacyPolicy;
