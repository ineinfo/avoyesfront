"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';

const Checkout = () => {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [address1, setAddress1] = useState("");
  
  const [password, setPassword] = useState(""); // Password state
  const router = useRouter();

  // User data states
  const [userData, setUserData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
  });
  
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false); // State to check if user is logged in

  const countries = [
    { id: 1, name: "United States" },
    { id: 2, name: "Canada" },
  ];

  const states = [
    { id: 5, name: "New York" },
    { id: 6, name: "California" },
  ];

  const cities = [
    { id: 3, name: "New York City" },
    { id: 4, name: "Los Angeles" },
  ];

  useEffect(() => {
    const userId = Cookies.get("id");
    const accessToken = Cookies.get("accessToken");

    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/users/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setUserData(response.data.data);
        setIsUserLoggedIn(true); // User is logged in
      } catch (error) {
        console.error("Error fetching user data:", error);
        setIsUserLoggedIn(false); // User is not logged in
      }
    };

    const fetchUserAddress = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/address?user_id=${userId}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        const addressData = response.data.data;

        const validAddress = addressData[0]; 

        if (validAddress) {
          setSelectedCountry(countries.find((c) => c.id === validAddress.country)?.name || "");
          setSelectedState(states.find((s) => s.id === validAddress.state)?.name || "");
          setSelectedCity(cities.find((c) => c.id === validAddress.city)?.name || "");
          setAddress1(validAddress.address1 || "");
        } else {
          console.error("No address found for this user.");
        }
      } catch (error) {
        if (error.response && error.response.status === 404) {
          console.error("Address not found for this user.");
        } else {
          console.error("Error fetching user address:", error);
        }
      }
    };

    fetchUserProfile();
    fetchUserAddress();
  }, []);
  const handlePayment = async () => {
    // Validate required fields
    if (
      !userData.first_name ||
      !userData.last_name ||
      !userData.email ||
      !userData.phone ||
      !address1 ||
      !selectedCountry ||
      !selectedState ||
      !selectedCity ||
      (!isUserLoggedIn && !password)
    ) {
      toast.error("Please fill all fields.");
      return;
    }
  
    try {
      // Create user if not logged in
      if (!isUserLoggedIn) {
        const createUserResponse = await axios.post(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/users`, {
          first_name: userData.first_name,
          last_name: userData.last_name,
          email: userData.email,
          phone: userData.phone,
          password: password,
        });
  
        if (createUserResponse.data.status) {
          const userId = createUserResponse.data.data.id; // Adjust based on your API response structure
  
          // Create address for the new user
          const addressResponse = await axios.post(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/address`, {
            user_id: userId, // Use the newly created user's ID
            address1: address1,
            country: selectedCountry,
            state: selectedState,
            city: selectedCity,
          });
  
          if (addressResponse.data.status) {
            toast.success("User created and address added successfully. Proceeding to payment...");
            router.push("/marketplace");
            return;
          } else {
            toast.error("Failed to add address.");
          }
        }
      } else {
        console.log("User is logged in. Redirecting to marketplace...");
        router.push("/marketplace");
        return;
      }
    } catch (error) {
      console.error("Error creating user or adding address:", error);
      if (error.response) {
        console.error("Error response data:", error.response.data);
        if (error.response.data.error === "Email already exists") {
          toast.error("Email already exists. Please log in.");
        } else {
          toast.error("An error occurred while creating the address.");
        }
      }
    }
  };
  
  return (
    <>
      <ToastContainer />
      <div className="breadcrumb-marketplace py-5">
        <div className="container">
          <div className="bread-head text-end">
            <div className="link d-flex align-items-center justify-content-end">
              <Link href="/" className="text-decoration-none me-1">
                HOME
              </Link>
              <p className="m-0">/ CHECKOUT</p>
            </div>
            <h1>Checkout</h1>
          </div>
        </div>
      </div>

      <div className="checkout-page-main">
        <div className="container">
          <div className="accordion" id="couponAccordion">
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingCoupon">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseCoupon"
                  aria-expanded="false"
                  aria-controls="collapseCoupon"
                >
                  <i className="fa-regular fa-bookmark me-2"></i> Have a Coupon?
                  Click here to enter your coupon code
                </button>
              </h2>
              <div
                id="collapseCoupon"
                className="accordion-collapse collapse"
                aria-labelledby="headingCoupon"
                data-bs-parent="#couponAccordion"
              >
                <div className="accordion-body">
                  <div className="coupon-head">
                    <h3>If You Have Coupon Code, Please Apply It Below</h3>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Coupon Code"
                    />
                  </div>
                  <div className="apply-coupon-btn mt-3">
                    <button type="button" className="btn btn-primary">
                      APPLY COUPON
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="dont-have-acc">
            You don't have an Account?
            <Link href="/login" className="text-decoration-none ms-1">
              Login
            </Link>
          </div>

          <div className="head d-flex justify-content-between align-items-center py-5 mt-4">
            <div className="heading">
              <h1>
                <span>BILLING </span> Details
              </h1>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-7">
              <div className="row billing-mb">
                <div className="col-md-6 billing">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="First Name"
                    value={userData.first_name || ""}
                    onChange={(e) =>
                      setUserData({ ...userData, first_name: e.target.value })
                    }
                  />
                </div>
                <div className="col-md-6 billing">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Last Name"
                    value={userData.last_name || ""}
                    onChange={(e) =>
                      setUserData({ ...userData, last_name: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="row billing-mb">
                <div className="col-md-6 billing">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Email Address"
                    value={userData.email || ""}
                    onChange={(e) =>
                      setUserData({ ...userData, email: e.target.value })
                    }
                  />
                </div>
                <div className="col-md-6 billing">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Mobile Number"
                    value={userData.phone || ""}
                    onChange={(e) =>
                      setUserData({ ...userData, phone: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="row billing-mb">
                <div className="col-md-12 billing billing-mobile">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Address"
                    value={address1}
                    onChange={(e) => setAddress1(e.target.value)}
                  />
                </div>
              </div>
              <div className="row billing-mb">
                <div className="col-md-4 billing">
                  <select
                    className="form-select"
                    value={selectedCountry}
                    onChange={(e) => setSelectedCountry(e.target.value)}
                  >
                    <option value="">Select Country</option>
                    {countries.map((country) => (
                      <option key={country.id} value={country.name}>
                        {country.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-4 billing">
                  <select
                    className="form-select"
                    value={selectedState}
                    onChange={(e) => setSelectedState(e.target.value)}
                  >
                    <option value="">Select State</option>
                    {states.map((state) => (
                      <option key={state.id} value={state.name}>
                        {state.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-4 billing">
                  <select
                    className="form-select"
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                  >
                    <option value="">Select City</option>
                    {cities.map((city) => (
                      <option key={city.id} value={city.name}>
                        {city.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Password input only appears when user is not logged in */}
              {!isUserLoggedIn && (
                <div className="row billing-mb">
                  <div className="col-md-12 billing billing-mobile">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
              )}
              
            </div>
            

            <div className="col-lg-5">
              <div className="checkout-summary">
                <div className="head text-center">
                  <h3>ORDER SUMMARY</h3>
                </div>
                <div className="row align-items-center mt-4">
                  <div className="col-md-2 col-3">
                    <img
                      src="/sidebar-img-1.png"
                      alt=""
                      className="check-out-img"
                    />
                  </div>
                  <div className="col-md-6 col-6">
                    <div className="checkout-summary">
                      <p className="m-0">Women’s Sequin Skirt</p>
                    </div>
                  </div>
                  <div className="col-md-4 text-center col-3">
                    <p className="m-0 checkout-price">€370.00</p>
                  </div>
                </div>
                <div className="row align-items-center mt-4">
                  <div className="col-md-2 col-3">
                    <img
                      src="/sidebar-img-2.png"
                      alt=""
                      className="check-out-img"
                    />
                  </div>
                  <div className="col-md-6 col-6">
                    <div className="checkout-summary">
                      <p className="m-0">Women’s Sequin Skirt</p>
                    </div>
                  </div>
                  <div className="col-md-4 col-3 text-center">
                    <p className="m-0 checkout-price">€370.00</p>
                  </div>
                </div>
                <div className="border-checkout-summary"></div>
                <div className="sub-total-checkout d-flex justify-content-between align-items-center">
                  <p className="m-0">Sub Total</p>
                  <p className="m-0">€740.00</p>
                </div>
                <div className="total-price-checkout d-flex justify-content-between align-items-center">
                  <p className="m-0">Total</p>
                  <p className="m-0">€740.00</p>
                </div>
              </div>
              <div className="proceed-to-pay">
                <Link href="#" >
                <button type="button" onClick={handlePayment} className="btn btn-primary">
    PROCEED TO PAY
  </button>
                </Link>{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};


export default Checkout;
