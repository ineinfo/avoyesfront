
"use client";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import LoadingSpinner from "../Loading";
import Cookies from "js-cookie";
import axios from "axios";
import { useProfile } from "@/utils/ProfileContext";
import { fetchUserDetails } from "@/utils/api/CommonApi";

const DashboardLayout = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState();
  const { profileData, updateProfile } = useProfile();
  const [heading, setHeading] = useState('Dashboard');
  const [isLoading, setIsLoading] = useState(false);
  const [joinedDate, setJoinedDate] = useState('');

  const getActiveTab = () => {
    if (pathname.includes("/address")) {
      return "address";
    }
    if (pathname.startsWith("/dashboard/orders")) {
      return "orders";
    }
    switch (pathname) {
      case "/dashboard/orders":
        return "orders";
      case "/dashboard/profile":
        return "profile";
      case "/dashboard/address":
        return "address";
        
      case "/dashboard/changepassword":
        return "password";
      default:
        return "dashboard";
    }
  };

  const [activeTab, setActiveTab] = useState(getActiveTab());

  useEffect(() => {
    const activeTab = getActiveTab();
    setActiveTab(activeTab);
    setHeading(activeTab);
  }, [pathname]);

  useEffect(() => {
    const fetchProfileData = async () => {
      const userId = Cookies.get('id');
      const accessToken = Cookies.get('accessToken');

      if (!userId) {
        router.push('/login');
        return;
      }

      try {
        const response = await axios.get(`${process.env.NEXTAUTH_URL}/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        if (response.data && response.data.data) {
          const { first_name, last_name, avatar, created_at } = response.data.data;
          updateProfile({
            firstName: first_name,
            lastName: last_name,
            profileImage: avatar || "/user.png", // Fallback image
          });
          setJoinedDate(new Date(created_at).toLocaleDateString());
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    const fetchuser = async () => {
      try {
        const loggedUser = await fetchUserDetails();
        setUser(loggedUser);
      } catch (error) {
        console.log("error", error)
      }
    };

    fetchuser()

    fetchProfileData();
  }, []); // Only run on mount

  const handleLogout = () => {
    setIsLoading(true);
    Cookies.remove('id');
    Cookies.remove('accessToken');

    setTimeout(() => {
      setIsLoading(false);
      router.push("/login");
    }, 3000);
  };

  const capitalizeFirstLetter = (string) => {
    if (!string) return "";
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  console.log("logggggg", user);

  return (
    <>
      {isLoading && <LoadingSpinner />}
      <div className="breadcrumb-marketplace py-5">
        <div className="img">
          <img src="" alt="" />
          <div className="container">
            <div className="bread-head text-end">
              <div className="link d-flex align-items-center justify-content-end">
                <Link href="/" className="text-decoration-none me-1">HOME</Link>
                <Link href="/dashboard" className="text-decoration-none me-1">/ MY ACCOUNT</Link>
                <p className="m-0">/ MY {heading}</p>
              </div>
              <h1>My {heading}</h1>
            </div>
          </div>
        </div>
      </div>
      <section>
        <div className="my-account-main py-5">
          <div className="container">
            <div className="row">
              <div className="col-lg-3 col-md-4 col-sm-12 col-xs-12">
                <div className="my-profile-tabs">
                  <div className="my-profile-pic text-center">
                    <div className="img">
                      {/* <img src={user ? user.avatar : ''} alt="Profile" /> */}
                      <img src={profileData.profileImage} alt="Profile" />
                    </div>
                    <div className="name">
                      <h3> {user
                        ? `${capitalizeFirstLetter(
                          user.first_name
                        )} ${capitalizeFirstLetter(user.last_name)}`
                        : ""}</h3>
                      <p>Joined {user ? new Date(user.created_at).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      }) : ''}</p>

                    </div>
                  </div>
                  <ul
                    className="nav flex-column nav-pills my-3"
                    id="v-pills-tab"
                    role="tablist"
                    aria-orientation="vertical"
                  >
                    <li className="nav-item" role="presentation">
                      <Link
                        href="/dashboard"
                        className={`nav-link text-dark d-flex justify-content-between align-items-center bg-white profile-tab rounded-pill-tab mb-3 ${activeTab === "dashboard" ? "active" : ""}`}
                      >
                        <p className="m-0 d-flex align-items-center p-tab-font">
                          <i className="fa-brands fa-microsoft pe-2"></i>
                          Dashboard
                        </p>
                        <i className="fa-solid fa-chevron-right"></i>
                      </Link>
                    </li>
                    <li className="nav-item" role="presentation">
                      <Link
                        href="/dashboard/orders"
                        className={`nav-link text-dark d-flex justify-content-between align-items-center bg-white profile-tab rounded-pill-tab mb-3 ${activeTab === "orders" ? "active" : ""}`}
                      >
                        <p className="m-0 d-flex align-items-center p-tab-font">
                          <i className="fa-solid fa-bag-shopping pe-2"></i>My Orders
                        </p>
                      </Link>
                    </li>
                    <li className="nav-item" role="presentation">
                      <Link
                        href="/dashboard/profile"
                        className={`nav-link text-dark d-flex justify-content-between align-items-center bg-white profile-tab rounded-pill-tab mb-3 ${activeTab === "profile" ? "active" : ""}`}
                      >
                        <p className="m-0 d-flex align-items-center p-tab-font">
                          <i className="fa-regular fa-circle-user pe-2"></i>
                          Profile
                        </p>
                        <i className="fa-solid fa-chevron-right"></i>
                      </Link>
                    </li>
                    <li className="nav-item" role="presentation">
                      <Link
                        href="/dashboard/address"
                        className={`nav-link text-dark d-flex justify-content-between align-items-center bg-white profile-tab rounded-pill-tab mb-3 ${activeTab === "address" ? "active" : ""}`}
                      >
                        <p className="m-0 d-flex align-items-center p-tab-font">
                          <i className="bi bi-geo-alt pe-2"></i>Manage Address
                        </p>
                      </Link>
                    </li>
                   
                    <li className="nav-item" role="presentation">
                      <Link
                        href="/dashboard/changepassword"
                        className={`nav-link text-dark d-flex justify-content-between align-items-center bg-white profile-tab rounded-pill-tab mb-3 ${activeTab === "password" ? "active" : ""}`}
                      >
                        <p className="m-0 d-flex align-items-center p-tab-font">
                          <i className="bi bi-key pe-2"></i>Change Password
                        </p>
                      </Link>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        style={{ width: "100%" }}
                        className={`nav-link text-dark d-flex justify-content-between align-items-center bg-white profile-tab rounded-pill-tab mb-3 ${activeTab === "logout" ? "active" : ""}`}
                        onClick={handleLogout}
                      >
                        <p className="m-0 d-flex align-items-center justify-content-between p-tab-font">
                          <i className="fa-solid fa-power-off pe-2"></i>Logout
                        </p>
                        <i className="fa-solid fa-chevron-right"></i>
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-9 col-md-8 col-sm-12 col-xs-12">
                <div className="tabs-background-shadow">
                  <div className="border-tab-top"></div>
                  {children}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default DashboardLayout;

