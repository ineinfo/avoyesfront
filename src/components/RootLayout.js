"use client";

import React, { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import Footer from "@/components/Footer";

// Dynamically import Bootstrap only on the client-side
import "bootstrap/dist/css/bootstrap.min.css";

const Header = dynamic(() => import("@/components/Header"), { ssr: false });

export default function RootLayoutClient({ children }) {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const popupRef = useRef(null);

    // Dynamically import Bootstrap only on the client-side
    useEffect(() => {
        if (typeof window !== "undefined") {
            import("bootstrap/dist/js/bootstrap.bundle.min.js");
        }
    }, []);

    const togglePopup = () => setIsPopupOpen((prev) => !prev);
    const closePopup = () => setIsPopupOpen(false);

    useEffect(() => {
        // Ensure the code runs only on the client side
        if (typeof document !== "undefined") {
            const handleClickOutside = (event) => {
                if (popupRef.current && !popupRef.current.contains(event.target)) {
                    closePopup();
                }
            };

            document.addEventListener("mousedown", handleClickOutside);

            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }
    }, [closePopup]);

    return (
        <>
            <Header isPopupOpen={isPopupOpen} togglePopup={togglePopup} popupRef={popupRef} />
            <div onClick={() => closePopup()}>{children}</div>
            <Footer />
        </>
    );
}
