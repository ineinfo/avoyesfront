"use client"
import React, { useState } from "react";
import "../assets/css/style.css";
import "../assets/css/responsive.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import axios from "axios";
import Cookies from "js-cookie";
import { Grid } from "antd";

const { useBreakpoint } = Grid
const Footer = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');
  const screens = useBreakpoint();
  const pathname = usePathname(); // Get current path
  if (pathname === "/login" || pathname === "/otp" || pathname === "/forgotpassword" || pathname === "/new-password" || pathname === "/register") {
    return null;
  }
  const token = Cookies.get("accessToken");

  const handleInputChange = (event) => {
    setEmail(event.target.value);
    setError(false); // Input change hone par error reset karte hain
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setError(true);
      setResponseMessage('')
    } else {
      setError(false);

      try {
        // Axios POST request
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/subscribers`, // Replace with your API URL
          { email }, // Email data as payload
          {
            headers: {
              Authorization: `Bearer ${token}`, // Replace with your actual token
              'Content-Type': 'application/json',
            },
          }
        );

        // Set response message from API
        setResponseMessage(response.data.message ? 'Subscribed SuccessFully!' : '');
        setEmail(''); // Input box reset karte hain

      } catch (err) {
        console.error('API Error:', err);
        setResponseMessage('You Have Already Subscribed!');
      }
    }
  };


  return (
    <>
      <footer className="footer">
        <div className="container">
          <div className="row">
            <div className="col-md-3 mb-2" style={{marginTop: "-25px"}} >
              <div style={{ display: "flex", justifyContent: "left", alignItems: "center" }}>
                <div><img src="/logo-nobg.png" alt="Logo" height={"80px"} /></div>
                <div> <img src="/logo.png" alt="Logo" height={"50px"} /></div>
              </div>
              {/* <p className="ftr-para" style={screens.sm ? {} : { minWidth: "100%" }}>
                This company meets the highest standard of social and
                environmental performance transparency and accountability{" "}
              </p> */}
<ul className="ftr-para" style={screens.sm ? { minWidth: "40vw" } : { minWidth: "100%" }}>
  <li>
    <strong>Réservez vos restaurants coup de cœur avec</strong>{" "}
    <a href="/foodie" style={{ textDecoration: "underline", color: "black" }}>
      Foodies
    </a>
  </li>
  <li>
    <strong>Explorez des activités uniques grâce à</strong>{" "}
    <a href="/map" style={{ textDecoration: "underline", color: "black" }}>
      notre carte interactive
    </a>
  </li>
  <li>
    <strong>Ne manquez aucun événement incontournable avec</strong>{" "}
    <a href="/event" style={{ textDecoration: "underline", color: "black" }}>
      Sorties
    </a>
  </li>
  <li>
    <strong>Découvrez nos sélections pépites sur</strong>{" "}
    <a href="/marketplace" style={{ textDecoration: "underline", color: "black" }}>
      Marketplace
    </a>
  </li>
  <li>
    <strong>Relevez des défis bien-être excitants sur</strong>{" "}
    <a href="/challanges" style={{ textDecoration: "underline", color: "black" }}>
      Challenges
    </a>
  </li>
</ul>



              <div className="footer-social-icons">
                <Link href="#" className="social-icon">
                  <i className="bi bi-facebook"></i>
                </Link>{" "}
                <Link href="#" className="social-icon">
                  <i className="bi bi-twitter"></i>
                </Link>{" "}
                <Link href="#" className="social-icon">
                  <i className="bi bi-instagram"></i>
                </Link>{" "}
                <Link href="#" className="social-icon">
                  <i className="bi bi-tiktok"></i>
                </Link>{" "}
              </div>
            </div>

            <div className="col-md-2" style={screens.sm ? {width:"30%", display:"flex", flexDirection:"column", alignItems:"center"} : { width: "50%" }}>
              <h5 className="ftr-company-head">À découvrir</h5> 
              <div className="ftr-head-btm-border"></div>
              <ul className="list-unstyled ftr-links">
                <li>
                  <Link href="/marketplace" className="text-decoration-none">
                  Marketplace 
                  </Link>
                </li>
                <li>
                  <Link href="/event" className="text-decoration-none">
                  Sorties
                  </Link>
                </li>
                <li>
                  <Link href="/foodie" className="text-decoration-none">
                    Foodies
                  </Link>
                </li>
                <li>
                  <Link href="/activity" className="text-decoration-none">
                  Activités
                  </Link>
                </li>
              </ul>
            </div>

            <div className="col-md-2" style={screens.sm ? {} : { width: "50%" }}>
              <h5 className="ftr-help-head">Support </h5>
              <div className="ftr-head-btm-border"></div>
              <ul className="list-unstyled ftr-links">
                <li>
                  <Link href="/contact-us" className="text-decoration-none">
                  Support client

                  </Link>
                </li>
                <li>
                  <Link href="/faqs" className="text-decoration-none">
                  FAQs
                  </Link>
                </li>
                <li>
                  <Link
                    href="terms-and-conditions"
                    className="text-decoration-none"
                  >
                    {/* Terms & Conditions */}
                    Conditions générales
                  </Link>
                </li>
                <li>
                  <Link href="/privacy-policy" className="text-decoration-none">
                    {/* Privacy Policy */}
                    Politique de confidentialité
                  </Link>
                </li>
                <li>
                  <Link href="/customer-support" className="text-decoration-none">
                    {/* Customer Support */}
                    Devenir partenaire
                  </Link>
                </li>
              </ul>
            </div>

    

            <div className="col-md-3">
              <h5 className="ftr-join-head">Rejoignez notre communauté</h5>
              <div className="ftr-head-btm-border"></div>
              <form role="search" method="get" onSubmit={handleSubmit}>
                <div className="input-container">
                  <input
                    type="email"
                    className="search-input"
                    name="subscribe"
                    placeholder="Enter your email"
                    value={email}
                    onChange={handleInputChange}
                    style={screens.sm ? {} : { width: "100%" }}
                  />
                  <button type="submit" className="search-submit" name="submit" style={{ backgroundColor: "black" }}>
                    Send
                    {/* <i className="bi bi-arrow-right d-flex align-items-center"></i> */}
                  </button>
                </div>
              </form>

              {/* Error pop-up */}
              {error && (
                <div style={{ color: 'red', marginTop: '10px' }}>
                  Invalid email you have entered!
                </div>
              )}

              {/* API Response message */}
              {responseMessage && (
                <div style={{ color: 'blue', marginTop: '10px' }}>
                  {responseMessage}
                </div>
              )}
            </div>
          </div>
          <div className="border-bottom-footer"></div>
          <div className="footer-2 d-flex justify-content-between align-items-center">
            <div className="copyright">
              <p className="m-0">
                {/* @2024 Avoyes LIFE STYLE PRIVATE LIMITED All Rights Reserved */}
                © 2025 Avöyes LLC All rights reserved.
              </p>
            </div>
            <div className="ftr-2-icon">
              <img src="ftr-img.png" alt="" />
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
