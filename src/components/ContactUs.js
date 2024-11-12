

"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios"; // Import axios
import LoadingSpinner from "./Loading";

const ContactUs = () => {
  const [contactInfo, setContactInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" }); // State for form data
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/contactus`);
        console.log("d");

        if (response.data.status) {
          setContactInfo(response.data.data);
        } else {
          console.error("Failed to fetch contact information:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching contact information:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchContactInfo();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/contact-inquiry`, formData);
      if (response.data.status) {
        alert("Your inquiry has been submitted successfully!");
        setFormData({ name: "", email: "", phone: "", message: "" }); // Reset form
      } else {
        setError("Failed to submit inquiry: " + response.data.message);
      }
    } catch (error) {
      console.error("Error submitting contact inquiry:", error.response?.data || error);
      setError("An error occurred while submitting your inquiry: " + (error.response?.data.message || "Unknown error"));
    }
  };


  if (loading) {
    return <LoadingSpinner />;
  }

  if (!contactInfo) {
    return <div>No contact information available.</div>;
  }

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
                <Link href="/marketplace" className="text-decoration-none me-1">
                  / CONTACT US
                </Link>{" "}
              </div>
              <h1>Contact Us</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="contact-us-main py-5">
        <div className="container">
          <div className="contact-us-box">
            <div className="row">
              <div className="col-md-5 contact-col-bg-color">
                <div className="contact-info">
                  <div className="mail d-flex align-items-center">
                    <i className="bi bi-envelope" style={{ backgroundColor: "#1C1C1C" }}></i>
                    <p className="m-0">{contactInfo.email}</p>
                  </div>
                  <div className="phone d-flex align-items-center">
                    <i className="bi bi-phone-vibrate" style={{ backgroundColor: "#1C1C1C" }}></i>
                    <p className="m-0">{contactInfo.phone}</p>
                  </div>
                  <div className="location d-flex align-items-center">
                    <i className="bi bi-geo-alt" style={{ backgroundColor: "#1C1C1C" }}></i>
                    <p className="m-0">{contactInfo.address}</p>
                  </div>
                  <div className="contact-map">
                    <iframe
                      src={contactInfo.google_map}
                      width="100%"
                      height="225px"
                      style={{ border: 0 }}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                  </div>
                </div>
              </div>
              <div className="col-md-7 get-in-touch-sec">
                <div className="get-in-touch">
                  <div className="head">
                    <h3>
                      <span>GET</span> In Touch
                    </h3>
                    <p>
                      Please fill out the form below and we will get back to you as soon as possible
                    </p>
                    {error && <div className="alert alert-danger">{error}</div>}
                  </div>
                  <form onSubmit={handleSubmit}> {/* Form submission  */}
                    <div className="row contact-form">
                      <div className="col-md-6">
                        <div className="input-group login-field">
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="form-control login profile-input"
                            placeholder="Name"
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row contact-form-2">
                      <div className="col-md-6">
                        <div className="input-group login-field">
                          <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="form-control login profile-input"
                            placeholder="Phone"
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="input-group login-field">
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="form-control login profile-input"
                            placeholder="Email"
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12">
                        <div className="contact-textarea">
                          <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            id="contact-message"
                            placeholder="Message"
                            rows="5"
                            required
                          ></textarea>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="contact-us-btn">
                        <button type="submit" style={{ backgroundColor: "#1C1C1C" }}>
                          SUBMIT
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
