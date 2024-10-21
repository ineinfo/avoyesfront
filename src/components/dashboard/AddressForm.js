


"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie"; 
import { toast } from "react-toastify";

const AddressForm = ({ change }) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    addressType: "work",
    firstName: "",
    lastName: "",
    email: "",
    mobileNumber: "",
    addressLine1: "",
    country: "",
    city: "",
    state: "",
    postalCode: "",
    defaultAddress: false,
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };


const handleSubmit = async (e) => {
  e.preventDefault();


  
  
  const userId = Cookies.get('id');
  const accessToken = Cookies.get('accessToken');

  const addressPayload = {
      user_id: Number(userId),
      first_name: formData.firstName,
      last_name: formData.lastName,
      phone: formData.mobileNumber,
      email: formData.email, 
      address1: formData.addressLine1,
      country: Number(formData.country),
      state: Number(formData.state),
      city: Number(formData.city),
      pincode: Number(formData.postalCode),
      is_default: formData.defaultAddress ? 1 : 0,
      a_type: formData.addressType === "work" ? 2 : (formData.addressType === "home" ? 1 : 3),
  };

  try {
      const response = await axios.post(`${process.env.NEXTAUTH_URL}/address`, addressPayload, {
          headers: {
              Authorization: `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
          },
      });
      console.log("Address saved successfully:", response.data);
      toast.success("Address saved successfully!");// Success toast
      setTimeout(() => {
        router.push("/dashboard/address");
      }, 4000);
  } catch (error) {
    toast.error("All fields are required", error);
    console.error("Error saving address:", error);
    const message = error.response && error.response.data 
      ? error.response.data.message 
      : "Error saving address. Please try again.";
    toast.error(message); // Error toast
    console.error("Error details:", error.response?.data); // Log the response data
  }
};


  const handleBack = () => {
    router.push("/dashboard/address");
  };

  return (
    <div>
      <div className="my-order-head">
        <div className="d-flex align-items-center justify-content-between">
          <h2>
            <span>MANAGE </span>Address
          </h2>
          <button onClick={handleBack} className="btn ms-3" id="addNewAddressBtn">
            Back
          </button>
        </div>
      </div>
      <div className="address-form" id="addressForm">
        <p>You are adding address</p>
        <form onSubmit={handleSubmit}>
          {/* Radio buttons for address type */}
          <div className="row radio-btns-address">
            <div className="col-12 d-flex justify-content-start">
              {["work", "home", "other"].map((type) => (
                <div className="form-check" key={type}>
                  <input
                    className="form-check-input"
                    type="radio"
                    name="addressType"
                    value={type}
                    checked={formData.addressType === type}
                    onChange={handleChange}
                  />
                  <label className="form-check-label">
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Input fields for personal information */}
          <div className="row">
            <div className="col-md-4 pe-2">
              <input
                type="text"
                className="form-control"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-4 pe-2">
              <input
                type="text"
                className="form-control"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-4">
              <input
                type="text"
                className="form-control"
                name="mobileNumber"
                placeholder="Mobile Number"
                value={formData.mobileNumber}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Address lines */}
          <div className="row">
            <div className="col-12">
              <input
                type="text"
                className="form-control"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <input
                type="text"
                className="form-control"
                name="addressLine1"
                placeholder="Address Line 1"
                value={formData.addressLine1}
                onChange={handleChange}
              />
            </div>
          </div>
          

          {/* Country, City, and State */}
          <div className="row">
            <div className="col-md-6">
              <select
                className="form-select"
                name="country"
                value={formData.country}
                onChange={handleChange}
              >
                <option value="">Select Country</option>
                <option value="1">United States</option>
                <option value="2">Canada</option> 
              </select>
            </div>
            <div className="col-md-6">
              <select
                className="form-select"
                name="city"
                value={formData.city}
                onChange={handleChange}
              >
                <option value="">Select City</option>
                <option value="3">New York</option>
                <option value="4">Los Angeles</option> 
              </select>
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-6">
              <select
                className="form-select"
                name="state"
                value={formData.state}
                onChange={handleChange}
              >
                <option value="">Select State</option>
                <option value="5">New York</option>
                <option value="6">California</option> 
              </select>
            </div>
            <div className="col-md-6">
              <input
                type="text"
                className="form-control"
                name="postalCode"
                placeholder="Zip Code"
                value={formData.postalCode}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Default address checkbox */}
          <div className="row mb-3">
            <div className="col-12">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="defaultAddress"
                  checked={formData.defaultAddress}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="defaultAddress">
                  Add this address as default
                </label>
              </div>
            </div>
          </div>

          {/* Submit and Back buttons */}
          <div className="d-flex justify-content-end">
            <button type="submit" className="btn-save-address">
              Save
            </button>
            <button
              type="button"
              className="btn-back-address"
              id="backToAddressListBtn"
              onClick={handleBack}
            >
              Back
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddressForm;
