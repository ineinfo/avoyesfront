"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import dynamic from 'next/dynamic';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchCart, removeFromCartAll } from "@/utils/api/CartApi";
import { AddAddress, fetchAddress } from "@/utils/api/AddressAPI";
import { fetchCities, fetchCountries, fetchStates } from "@/utils/api/CommonApi";
import { placeOrder } from "@/utils/api/CheckoutApi";


// Utility function to get address type based on a_type
const getAddressType = (a_type) => {
  switch (a_type) {
    case 1:
      return 'Work';
    case 2:
      return 'Home';
    case 3:
      return 'Other';
    case 4:
      return 'Type 4';
    default:
      return 'Unknown';
  }
};


// const countries = [
//   { id: 1, name: "United States" },
//   { id: 2, name: "Canada" },
// ];

// const states = [
//   { id: 5, name: "New York" },
//   { id: 6, name: "California" },
// ];

// const cities = [
//   { id: 3, name: "New York City" },
//   { id: 4, name: "Los Angeles" },
// ];

const Checkout = () => {
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [addressdata, setAddressdata] = useState([]);
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  const [error, setError] = useState(null);
  const [addId, setAddId] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState("new");
  const dropdownRef = useRef(null);
  // User data states
  const [userData, setUserData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    address1: "",
    a_type: "3",
    pincode: ""
  });

  const ToastContainer = dynamic(
    () => import('react-toastify').then((mod) => mod.ToastContainer),
    { ssr: false }
  );

  useEffect(() => {
    // Dynamically import ToastContainer on client side
    const loadToastContainer = async () => {
      const { ToastContainer } = await import('react-toastify');
      setToastContainer(<ToastContainer />);
    };
    loadToastContainer();
  }, []);

  const [toastContainer, setToastContainer] = useState(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleAddressChange = async (address) => {
    setSelectedAddress(address);

    const matched = addressdata.find((a) => a.id === address);

    setUserData(matched);
    if (address === 'new') {
      setSelectedCountry('');
      setSelectedState('');
      setSelectedCity('');
    }
    if (matched) {
      console.log("Matched data", matched);

      const country = countries.find((a) => a.id === matched?.country);
      setSelectedCountry(country?.name);
      const c_id = country?.id;
      console.log("Matched data1", c_id);

      const allStates = await fetchStates(c_id);
      setStates(allStates);

      const state = allStates.find((a) => a.id === matched?.state);
      setSelectedState(state?.name);

      const s_id = state?.id
      const allCities = await fetchCities(s_id);
      setCities(allCities);

      const city = allCities.find((a) => a.id === matched?.city);
      setSelectedCity(city?.name);

      setAddId(matched ? matched.id : null);
    }

    setIsOpen(false); // Close the dropdown after selection
  };


  const [password, setPassword] = useState(""); // Password state
  const router = useRouter();



  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false); // State to check if user is logged in


  useEffect(() => {
    const userId = Cookies.get("id");
    const accessToken = Cookies.get("accessToken");

    if (userId && accessToken) {
      setShow(false)
    }



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
        // setUserData(response.data.data);
        setIsUserLoggedIn(true); // User is logged in
      } catch (error) {
        console.error("Error fetching user data:", error);
        setIsUserLoggedIn(false); // User is not logged in
      }
    };



    const loadCartData = async () => {
      try {
        const cartData = await fetchCart(userId, accessToken);
        const country = await fetchCountries();
        setCountries(country ? country : [{}]);


        if (cartData && cartData.data) {
          setCartItems(cartData.data);
        } else {
          setError(cartData.message || "Failed to fetch cart");
        }
      } catch (err) {
        console.error("Error fetching cart data:", err);
        setError("Error fetching cart data");
      } finally {
        setLoading(false);
      }
    };

    const allAdd = async () => {
      try {
        const res = await fetchAddress();

        setAddressdata(res)
      } catch (error) {
        console.log(error);

      }
    }

    loadCartData();
    fetchUserProfile();
    // fetchUserAddress();
    allAdd();
  }, []);
  console.log("dataaaa", addressdata);


  useEffect(() => {
    const fetchAllStates = async () => {
      if (selectedCountry) {
        const Countryid = countries.find((a) => a.name === selectedCountry);

        if (Countryid) {
          const id = Countryid.id;

          try {
            const statesData = await fetchStates(id);
            setStates(statesData)
            console.log("states", statesData);
          } catch (error) {
            console.error("Error fetching states:", error);
          }
        } else {

          console.error("Country not found for selected country:", selectedCountry);
        }
      } else {
        setStates([])
        console.error("No country selected.");
      }
    };

    fetchAllStates();
  }, [selectedCountry, countries]); // Add countries in dependency array to ensure it updates when available.


  useEffect(() => {
    const fetchAllCities = async () => {
      if (selectedState) {
        const Stateid = states.find((a) => a.name === selectedState);

        if (Stateid) {
          const id = Stateid.id;

          try {
            const citiesData = await fetchCities(id);
            setCities(citiesData)
            console.log("states", citiesData);
          } catch (error) {
            console.error("Error fetching states:", error);
          }
        } else {

          console.error("Country not found for selected country:", selectedState);
        }
      } else {
        setCities([])
        console.error("No country selected.");
      }
    };

    fetchAllCities();
  }, [selectedState, states]);

  const regexPhn = /^\d{10}$/;
  const regexMail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const handlePayment = async () => {
    // Validate required fields
    let missingFields = [];

    // Check each field and add to missingFields array if it's invalid
    if (!userData.first_name) {
      missingFields.push("First name");
    }
    if (!userData.last_name) {
      missingFields.push("Last name");
    }
    if (!userData.email) {
      missingFields.push("Email");
    } else if (!regexMail.test(userData.email)) {
      missingFields.push("Email (invalid format)");
    }
    if (!userData.phone) {
      missingFields.push("Phone number");
    } else if (!regexPhn.test(userData.phone)) {
      missingFields.push("Phone number (invalid format)");
    }
    if (!userData.address1) {
      missingFields.push("Address");
    }
    if (!userData.a_type) {
      missingFields.push("Type");
    }
    if (!userData.pincode) {
      missingFields.push("Pincode");
    }
    if (!selectedCountry) {
      missingFields.push("Country");
    }
    if (!selectedState) {
      missingFields.push("State");
    }
    if (!selectedCity) {
      missingFields.push("City");
    }


    // Display a consolidated error message if there are any missing fields
    if (missingFields.length > 0) {
      toast.error(`Please fill all fields: ${missingFields.join(", ")}.`);
      return;
    }

    // try {
    //   // Create user if not logged in
    //   if (!isUserLoggedIn) {
    //     const createUserResponse = await axios.post(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/users`, {
    //       first_name: userData.first_name,
    //       last_name: userData.last_name,
    //       email: userData.email,
    //       phone: userData.phone,
    //       password: password,
    //     });

    //     if (createUserResponse.data.status) {
    //       const userId = createUserResponse.data.data.id; // Adjust based on your API response structure

    //       // Create address for the new user
    //       const addressResponse = await axios.post(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/address`, {
    //         user_id: userId, // Use the newly created user's ID
    //         address1: address1,
    //         country: selectedCountry,
    //         state: selectedState,
    //         city: selectedCity,
    //       });

    //       if (addressResponse.data.status) {
    //         toast.success("User created and address added successfully. Proceeding to payment...");
    //         router.push("/marketplace");
    //         return;
    //       } else {
    //         toast.error("Failed to add address.");
    //       }
    //     }
    //   } else {
    //     console.log("User is logged in. Redirecting to marketplace...");
    //     router.push("/marketplace");
    //     return;
    //   }
    // } catch (error) {
    //   console.error("Error creating user or adding address:", error);
    //   if (error.response) {
    //     console.error("Error response data:", error.response.data);
    //     if (error.response.data.error === "Email already exists") {
    //       toast.error("Email already exists. Please log in.");
    //     } else {
    //       toast.error("An error occurred while creating the address.");
    //     }
    //   }
    // }

    let orderData = {}
    if (addId === null) {
      const countryId = countries.find((a) => a.name === selectedCountry)
      const stateId = states.find((a) => a.name === selectedState)
      const cityId = cities.find((a) => a.name === selectedCity)
      const addressData = {
        ...userData,
        country: countryId.id,
        state: stateId.id,
        city: cityId.id,
      }
      console.log("response1", addressData);

      try {
        const res = await AddAddress(addressData)
        orderData = {
          addId: res?.addressId,
          total: cartItems.reduce((acc, item) => acc + (item.amount * item.quantity), 0).toFixed(2),
          sub_total: cartItems.reduce((acc, item) => acc + (item.amount * item.quantity), 0).toFixed(2),
          products: cartItems.map(({ size_id, product_id, product_title, quantity, color_id, amount, image_url1 }) => ({
            size_id,
            product_id,
            product_title,
            quantity,
            color_id,
            rate: amount,
            amount: (amount * quantity),
            image_url: image_url1
          }))
        };
        console.log("Got Data", orderData);
      } catch (error) {
        console.log("got some error", error);
      }
    } else {
      orderData = {
        addId: addId,
        total: cartItems.reduce((acc, item) => acc + (item.amount * item.quantity), 0).toFixed(2),
        sub_total: cartItems.reduce((acc, item) => acc + (item.amount * item.quantity), 0).toFixed(2),
        products: cartItems.map(({ size_id, product_id, product_title, quantity, color_id, amount, image_url1 }) => ({
          size_id,
          product_id,
          product_title,
          quantity,
          color_id,
          rate: amount,
          amount: (amount * quantity),
          image_url: image_url1
        }))
      };
      console.log("Got Data", orderData);
    }

    const res = await placeOrder(orderData)
    if (res) {
      const ids = cartItems.map(item => item.id);
      await removeFromCartAll(ids)
      router.push(`/success?id=${res.order_number}`)
    } else {
      console.log("Something went Wrong");

    }


  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    // Attach event listener
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      // Clean up the event listener
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  console.log("countries", countries);


  return (
    <>
      {toastContainer}
      <div className="breadcrumb-marketplace py-5" >
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

          {show && (
            <div className="dont-have-acc">
              You don&apos;t have an Account?
              <Link href="/login" className="text-decoration-none ms-1">
                Login
              </Link>
            </div>
          )}

          <div className="head d-flex justify-content-between align-items-center pt-4 pb-2 mt-4">
            <div className="heading">
              <h1>
                <span>BILLING </span> Details
              </h1>
            </div>
          </div>


          <div className="row">
            <div className="col-lg-7">
              <div className="row billing-mb">
                <div className="col-md-12 billing">

                  <div className="custom-dropdown" ref={dropdownRef} style={{ width: "100%" }}>
                    {/* Toggle Button for Dropdown */}
                    <div className="add-new-address" onClick={toggleDropdown} style={{
                      padding: "8px 15px",
                      backgroundColor: "white",
                      color: "blue",
                      fontWeight: "bold",
                      borderRadius: "10px",
                      cursor: "pointer",
                      marginBottom: "0",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      border: "1px solid blue",
                    }}>
                      Choose an address
                      <i class="fa-solid fa-caret-down"></i>
                    </div>

                    {/* Dropdown List */}
                    {isOpen && (
                      <div className="dropdown-list">
                        {/* List of Existing Addresses */}
                        <div className="address-item" style={{ display: "flex", flexDirection: "column" }}>

                          <label>
                            <input
                              type="radio"
                              name="address"
                              value="new"
                              checked={selectedAddress === "new"}
                              onChange={() => handleAddressChange("new")}
                            /> &nbsp;
                            <strong>Add New Address</strong>
                          </label>
                          {addressdata.map((address) => (
                            <label key={address?.id}>

                              <div className="address-details">
                                <input
                                  type="radio"
                                  name="address"
                                  value={address.id}
                                  checked={selectedAddress === address.id}
                                  onChange={() => handleAddressChange(address.id)}
                                /> &nbsp;
                                <strong>{getAddressType(address.a_type)}</strong>
                                <br />
                                <div style={{ marginLeft: "15px" }}>
                                  {`${address.first_name} ${address.last_name}`}
                                  <br />
                                  {address.address1}
                                  <br />
                                  Pincode: {address.pincode}
                                </div>

                              </div>
                            </label>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* If "Add New Address" is selected */}
                    {selectedAddress === "new" && (
                      <div className="new-address-form">
                        <h3>Add a new address</h3>
                        {/* Add your form for adding a new address here */}
                      </div>
                    )}

                    {/* Display selected address details */}
                    {selectedAddress !== "new" && (
                      <div className="selected-address-details">
                        <h3>{getAddressType(userData?.a_type)}</h3>
                      </div>
                    )}
                  </div>

                </div>
                {selectedAddress === "new" && (

                  <div className="col-md-12 billing mt-4" style={{ display: "flex", justifyContent: "space-evenly", alignItems: "center", fontWeight: "bold" }}>

                    <label style={{ display: "flex", alignItems: "center" }}>
                      <input
                        type="radio"
                        name="a_type"
                        value="1"
                        checked={userData?.a_type === "1"}
                        onChange={(e) =>
                          setUserData({ ...userData, a_type: e.target.value })
                        }
                      /> &nbsp;
                      Work
                    </label>

                    <label style={{ display: "flex", alignItems: "center" }}>
                      <input
                        type="radio"
                        name="a_type"
                        value="2"
                        checked={userData?.a_type === "2"}
                        onChange={(e) =>
                          setUserData({ ...userData, a_type: e.target.value })
                        }
                      /> &nbsp;
                      Home
                    </label>

                    <label style={{ display: "flex", alignItems: "center" }}>
                      <input
                        type="radio"
                        name="a_type"
                        value="3"
                        checked={userData?.a_type === "3"}
                        onChange={(e) =>
                          setUserData({ ...userData, a_type: e.target.value })
                        }
                      /> &nbsp;
                      Other
                    </label>
                  </div>
                )}
                <div className="col-md-6 billing mt-4">

                  <input
                    type="text"
                    className="form-control"
                    placeholder="First Name"
                    value={userData?.first_name || ""}
                    onChange={(e) =>
                      setUserData({ ...userData, first_name: e.target.value })
                    }
                  />
                </div>
                <div className="col-md-6 billing mt-4">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Last Name"
                    value={userData?.last_name || ""}
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
                    value={userData?.email || ""}
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
                    value={userData?.phone || ""}
                    onChange={(e) =>
                      setUserData({ ...userData, phone: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="row billing-mb">
                <div className="col-md-6 billing ">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Address"
                    value={userData?.address1 || ""}
                    onChange={(e) => setUserData({ ...userData, address1: e.target.value })}
                  />
                </div>
                <div className="col-md-6 billing ">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Pincode"
                    value={userData?.pincode || ""}
                    onChange={(e) => setUserData({ ...userData, pincode: e.target.value })}
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
                    {states.length > 0 ? <>
                      {states.map((state) => (
                        <option key={state.id} value={state.name}>
                          {state.name}
                        </option>
                      ))}
                    </> : <>
                      <option disabled>
                        Select Country First
                      </option>
                    </>}
                  </select>
                </div>
                <div className="col-md-4 billing">
                  <select
                    className="form-select"
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                  >
                    <option value="">Select City</option>
                    {cities.length > 0 ? <>
                      {cities.map((city) => (
                        <option key={city.id} value={city.name}>
                          {city.name}
                        </option>
                      ))}
                    </> : <>
                      <option disabled>
                        Select State First
                      </option>
                    </>}
                  </select>
                </div>
              </div>

              {/* Password input only appears when user is not logged in */}
              {/* {!isUserLoggedIn && (
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
              )} */}

            </div>


            <div className="col-lg-5">
              <div className="checkout-summary">
                <div className="head text-center">
                  <h3>ORDER SUMMARY</h3>
                </div>
                {cartItems.map((item) => {
                  return (
                    <div key={item.id} className="row align-items-center mt-4">
                      <div className="col-md-2 col-3">
                        <img
                          src={item.image_url1}
                          alt={item.product_title}
                          className="check-out-img"
                        />
                      </div>
                      <div className="col-md-7 col-6">
                        <div className="checkout-summary">
                          <p className="m-0">{item.product_title}</p>
                          <p className="m-0">Size - {item.size_title}&nbsp; Color - {item.color_title}</p>
                          <p className="m-0">Quantity - {item.quantity}</p>

                        </div>
                      </div>
                      <div className="col-md-3 text-center col-3">
                        <p className="m-0 checkout-price">€{item.amount}</p>
                      </div>
                    </div>
                  );
                })}

                <div className="border-checkout-summary"></div>
                <div className="sub-total-checkout d-flex justify-content-between align-items-center">
                  <p className="m-0">Sub Total</p>
                  <p className="m-0">€{cartItems.reduce((acc, item) => acc + (item.amount * item.quantity), 0).toFixed(2)}</p>
                </div>
                <div className="total-price-checkout d-flex justify-content-between align-items-center">
                  <p className="m-0">Total</p>
                  <p className="m-0">€{cartItems.reduce((acc, item) => acc + (item.amount * item.quantity), 0).toFixed(2)}</p>
                </div>
              </div>
              <div className="proceed-to-pay">
                <button type="button" onClick={handlePayment} className="btn btn-primary">
                  PROCEED TO PAY
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};


export default Checkout;
