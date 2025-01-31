import React from "react";
import { Button } from "antd";

const Banner = () => {
    return (
        <div
            style={{
                backgroundColor: "#004AAD", // Blue background
                color: "#FFFFFF", // White text
                padding: "50px 20px",
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-between",
                alignItems: "center",
                minHeight: "500px",
            }}
        >
            {/* Images Section */}
            <div
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "20px",
                    flex: "1",
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: "20px",
                }}
            >
                {/* Tilted Image 1 */}
                <div
                    style={{
                        position: "relative",
                        width: "300px",
                        transform: "rotate(-5deg)",
                        boxShadow: "5px 5px 20px rgba(0, 0, 0, 0.3)",
                        border: "5px solid #FFFFFF",
                        borderRadius: "10px",
                    }}
                >
                    <img
                        src="/blog-img-3.png"
                        alt="Tango Lessons"
                        style={{ width: "100%", borderRadius: "10px" }}
                    />
                    <div
                        style={{
                            position: "absolute",
                            bottom: "10px",
                            left: "10px",
                            backgroundColor: "rgba(255, 255, 255, 0.9)",
                            padding: "5px 15px",
                            borderRadius: "5px",
                            fontWeight: "bold",
                            color: "#004AAD",
                            fontSize: "14px",
                        }}
                    >
                        TANGO LESSONS
                    </div>
                </div>

                {/* Tilted Image 2 */}
                <div
                    style={{
                        position: "relative",
                        width: "300px",
                        transform: "rotate(5deg)",
                        boxShadow: "5px 5px 20px rgba(0, 0, 0, 0.3)",
                        border: "5px solid #FFFFFF",
                        borderRadius: "10px",
                    }}
                >
                    <img
                        src="/blog-img-3.png"
                        alt="Singles Speed Dating"
                        style={{ width: "100%", borderRadius: "10px" }}
                    />
                    <div
                        style={{
                            position: "absolute",
                            bottom: "10px",
                            left: "10px",
                            backgroundColor: "rgba(255, 255, 255, 0.9)",
                            padding: "5px 15px",
                            borderRadius: "5px",
                            fontWeight: "bold",
                            color: "#004AAD",
                            fontSize: "14px",
                        }}
                    >
                        SINGLES SPEED DATING
                    </div>
                </div>
            </div>

            {/* Text Section */}
            <div
                style={{
                    flex: "1",
                    textAlign: "center",
                    padding: "10px",
                }}
            >
                <h1
                    style={{
                        fontSize: "36px",
                        fontWeight: "bold",
                        lineHeight: "1.3",
                        textTransform: "uppercase",
                        letterSpacing: "2px",
                        marginBottom: "20px",
                    }}
                >
                    Soulmates or First Dates <br />
                    <span style={{ color: "#FFD700" }}>We&apos;ve Got Just the Thing.</span>
                </h1>
                <p
                    style={{
                        fontSize: "16px",
                        marginBottom: "20px",
                        lineHeight: "1.6",
                    }}
                >
                    Whether it&apos;s a romantic night or a fun experience, we have activities to make your
                    Valentine&apos;s Day unforgettable.
                </p>
                <Button
                    type="primary"
                    size="large"
                    style={{
                        backgroundColor: "#FFD700",
                        color: "#004AAD",
                        fontWeight: "bold",
                        border: "none",
                        borderRadius: "5px",
                        padding: "10px 20px",
                        boxShadow: "3px 3px 10px rgba(0, 0, 0, 0.3)",
                    }}
                >
                    Plan Valentine&apos;s Day
                </Button>
            </div>
        </div>
    );
};

export default Banner;
