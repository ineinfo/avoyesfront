import localFont from "next/font/local";
import "./globals.css";
import "../assets/css/responsive.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import React from "react";
import RootLayoutClient from "@/components/RootLayout";

// Ensure the fonts are correctly loaded
const geistSans = localFont({
  src: "/fonts/GeistVF.woff", // Path should be relative to the public folder
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "/fonts/GeistMonoVF.woff", // Path should be relative to the public folder
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <RootLayoutClient>{children}</RootLayoutClient>
      </body>
    </html>
  );
}
