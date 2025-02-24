import { useEffect, useState } from "react";
import { Modal, Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { fetchOverlayBanner } from "@/utils/api/BannerApi";
import Link from "next/link";
import { motion } from "framer-motion";

const FullScreenOverlay = () => {
    const [visible, setVisible] = useState(true);
    const [data, setData] = useState({});

    const fetchBanner = async () => {
        const res = await fetchOverlayBanner();
        setData(res.data);
    };

    useEffect(() => {
        fetchBanner();
    }, []);

    if (!visible) return null;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                backgroundColor: "rgba(0, 0, 0, 0.8)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 9999,
            }}
        >
            <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                style={{
                    position: "relative",
                    width: "90%",
                    maxWidth: "400px",
                    background: "white",
                    backdropFilter: "blur(15px)",
                    padding: "30px",
                    borderRadius: "20px",
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    boxShadow: "0px 10px 25px rgba(0, 0, 255, 0.2)",
                    border: "2px solid rgba(255, 255, 255, 0.2)",
                }}
            >
                {/* Close Button */}
                <motion.div
                    whileHover={{ rotate: 90, scale: 1.2 }}
                    transition={{ duration: 0.3 }}
                    style={{
                        position: "absolute",
                        top: "10px",
                        right: "10px",
                        cursor: "pointer",
                        color: "#ff4d4f",
                        fontSize: "18px",
                    }}
                >
                    <CloseOutlined onClick={() => setVisible(false)} />
                </motion.div>

                {/* Image with Animation */}
                <motion.img
                    src={data?.image_url || "/default-image.jpg"}
                    alt="Advertisement"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    style={{
                        width: "100%",
                        maxWidth: "350px",
                        borderRadius: "12px",
                        boxShadow: "0px 4px 10px rgba(0, 0, 255, 0.1)",
                        marginBottom: "15px",
                    }}
                />

                {/* Title */}
                <motion.h3
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    style={{
                        color: "black",
                        fontSize: "22px",
                        fontWeight: "bold",
                        // textShadow: "0px 4px 10px rgba(0, 255, 255, 0.7)",
                    }}
                >
                    {data?.title || "Exclusive Offer!"}
                </motion.h3>

                {/* Description */}
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    style={{
                        color: "black",
                        fontSize: "16px",
                        marginBottom: "15px",
                    }}
                >
                    Don&apos;t miss out on this amazing deal. Click below to explore!
                </motion.p>

                {/* Call-to-Action Button */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                >
                    <Link href={data?.view_url || "#"} passHref>
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            style={{
                                background: "linear-gradient(45deg, #007BFF, #00D4FF)",
                                color: "#fff",
                                padding: "12px 24px",
                                fontSize: "16px",
                                fontWeight: "bold",
                                borderRadius: "30px",
                                border: "none",
                                cursor: "pointer",
                                transition: "all 0.3s ease",
                                // boxShadow: "0px 5px 15px rgba(0, 255, 255, 0.4)",
                            }}
                        >
                            Explore Now
                        </motion.button>
                    </Link>
                </motion.div>
            </motion.div>
        </motion.div>
    );
};

export default FullScreenOverlay;
