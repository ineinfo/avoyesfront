"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios'; // Import axios
import "../assets/css/style.css";
import "../assets/css/responsive.css";
import LoadingSpinner from './Loading';

const CustomerSupport = () => {
    const [faqs, setFaqs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState(""); // Add state for search term

    useEffect(() => {
        const fetchFAQs = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/faqs/`);

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

    const filteredFaqs = faqs.filter(faq =>
        (faq.title && faq.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (faq.description && faq.description.toLowerCase().includes(searchTerm.toLowerCase()))
    ); // Filter FAQs based on search term with null checks

    if (loading) {
        return <LoadingSpinner />;
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
                        <input 
                            type="text" 
                            className="form-control" 
                            placeholder="Search FAQs..." 
                            value={searchTerm} 
                            onChange={(e) => setSearchTerm(e.target.value)} // Update search term on input change
                        />
                    </div>

                    {filteredFaqs.length === 0 ? (
                        <div className="centered-message mt-4">
                            No Search available for this.
                        </div>
                    ) : (
                        <div className="accordion" id="accordionExample">
                            {filteredFaqs.map((faq, index) => (
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
                                            <span dangerouslySetInnerHTML={{ __html: faq.description }}></span>
                                            {/* {faq.description} */}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default CustomerSupport;
