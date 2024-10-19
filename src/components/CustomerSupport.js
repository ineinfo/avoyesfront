

"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios'; // Import axios
import "../assets/css/style.css";
import "../assets/css/responsive.css";

const CustomerSupport = () => {
    const [faqs, setFaqs] = useState([]); 
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFAQs = async () => {
            try {
                const response = await axios.get("http://localhost:3002/api/faqs/"); // Use axios for the API call
                
                if (Array.isArray(response.data.data)) {
                    setFaqs(response.data.data);
                } else {
                    console.error("Unexpected data format:", response.data);
                }
            } catch (error) {
                console.error("Error fetching FAQs:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchFAQs();
    }, []);

    if (loading) {
        return <div>Loading...</div>; 
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
                                <p className="m-0">/ customer support</p>
                            </div>
                            <h1>customer support</h1>
                        </div>
                    </div>
                </div>
            </div>

            <div className="customer-support">
                <div className="container">
                    <div className="search-bar">
                        <input type="text" className="form-control" placeholder="Search FAQs..." />
                    </div>

                    <div className="accordion" id="accordionExample">
                        {faqs.map((faq, index) => (
                            <div className="accordion-item" key={faq.id || index}>
                                <h2 className="accordion-header" id={`heading${index}`}>
                                    <button
                                        className="accordion-button"
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target={`#collapse${index}`}
                                        aria-expanded="false"
                                        aria-controls={`collapse${index}`}
                                    >
                                        {faq.title}
                                    </button>
                                </h2>
                                <div
                                    id={`collapse${index}`}
                                    className="accordion-collapse collapse"
                                    aria-labelledby={`heading${index}`}
                                    data-bs-parent="#accordionExample"
                                >
                                    <div className="accordion-body">
                                        {faq.description}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default CustomerSupport;
