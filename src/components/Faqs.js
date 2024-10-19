"use client"

import React, { useEffect, useState } from "react";
import Link from "next/link";
import "../assets/css/style.css";
import "../assets/css/responsive.css";


const Faqs = () => {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const response = await fetch("http://localhost:3002/api/faqs/");
        const data = await response.json();
        console.log(data);
        if (Array.isArray(data.data)) {
          setFaqs(data.data); 
        } else {
          setFaqs([]); 
        }
      } catch (error) {
        console.error("Error fetching FAQs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFaqs();
  }, []);

  return (
    <>
      <div className="breadcrumb-marketplace py-5">
        <div className="img">
          <img src="" alt="" />
          <div className="container">
            <div className="bread-head text-end">
              <div className="link d-flex align-items-center justify-content-end">
                <Link href="/" className="text-decoration-none me-1">
                  HOME
                </Link>{" "}
                <Link href="Market-Place" className="text-decoration-none me-1">
                  / FAQs
                </Link>{" "}
              </div>
              <h1>FAQs</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="faqs-main py-5">
        <div className="container">
          <div className="row">
            <div className="col-md-7">
              {loading ? (
                <p>Loading FAQs...</p>
              ) : (
                <div className="accordion" id="faqaccordion">
                  {Array.isArray(faqs) && faqs.length > 0 ? (
                    faqs.map((faq, index) => (
                      <div className="accordion-item-2" key={faq.id}>
                        <h2 className="accordion-header mb-3" id={`heading${index}`}>
                          <button
                            className="accordion-button faq-acrdn-btn justify-content-between"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target={`#collapse${index}`}
                            aria-expanded="false"
                            aria-controls={`collapse${index}`}
                          >
                            <p className="mb-0">{faq.title}</p>
                          </button>
                        </h2>
                        <div
                          id={`collapse${index}`}
                          className="accordion-collapse collapse"
                          aria-labelledby={`heading${index}`}
                          data-bs-parent="#faqaccordion"
                        >
                          <div className="accordion-body acrdn-bdy-2">
                            {faq.description}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>No FAQs available.</p>
                  )}
                </div>
              )}
            </div>
            <div className="col-md-5">
              <div className="faq-img">
                <img src="/faq-img.png" alt="" />
              </div>
              <div className="any-que">
                <h3>Any Question?</h3>
                <p>You can ask anything</p>
              </div>
              <div className="faq-input text-center">
                <input type="text" className="empty-input" placeholder="" />
              </div>
              <div className="sent-faq-btn text-center">
                <Link href="#">
                  <button type="button">SENT</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};


export default Faqs;
