import { useEffect, useState } from "react";
import { CloseOutlined } from "@ant-design/icons";
import { Grid } from "antd";
import { fetchOverlayBanner } from "@/utils/api/BannerApi";
import Link from "next/link";

const { useBreakpoint } = Grid;

const FullScreenOverlay = () => {
    const [visible, setVisible] = useState(true);
    const [data, setData] = useState({});
    const fetchBanner = async () => {
        const res = await fetchOverlayBanner()
        console.log("DataBBBBBB", res.data);

        setData(res.data)
    }
    useEffect(() => {
        fetchBanner()
    }, [])

    const screens = useBreakpoint()
    if (!visible) return null; // Agar overlay band hai to kuch mat dikhana

    return (
        <div
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                backgroundColor: "rgba(0, 0, 0, 0.7)", // Grey overlay
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 9999,
            }}
        >
            <div
                style={{
                    position: "relative",
                    width: screens.sm ? "30vw" : "100%",
                    height: "50vh",
                    backgroundColor: "White",
                    padding: "20px",
                    borderRadius: "10px",
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
                }}
            >
                <CloseOutlined
                    style={{
                        position: "absolute",
                        top: "10px",
                        right: "10px",
                        fontSize: "20px",
                        cursor: "pointer",
                        color: "blue",
                    }}
                    onClick={() => setVisible(false)}
                />
                <img
                    src={data?.image_url}
                    alt="adv"
                    style={{
                        width: "300px",
                        borderRadius: "10px",
                        marginBottom: "20px",
                    }}
                />
                <h3 style={{ margin: "0", color: "#fff" }}>{data?.title}</h3>
                <p style={{ color: "#ccc" }}>
                    <Link href={data?.view_url || "#"} style={{ fontWeight: "bold" }}>
                        Click here
                    </Link> to go
                </p>
            </div>
        </div>
    );
};

export default FullScreenOverlay;
