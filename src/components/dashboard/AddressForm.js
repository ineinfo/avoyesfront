


"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { fetchCities, fetchCountries, fetchStates } from "@/utils/api/CommonApi";

const AddressForm = ({ change }) => {
  const router = useRouter();
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');

  const [formData, setFormData] = useState({
    addressType: "work",
    firstName: "",
    lastName: "",
    email: "",
    mobileNumber: "",
    addressLine1: "",
    country: "",
    state: "",
    city: "",
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

    console.log("formdata", formData);

  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const country = await fetchCountries();
        setCountries(country ? country : [{}]);
      } catch (error) {
        console.log(error);

      }
    }

    loadData()
  }, [])

  useEffect(() => {
    console.log("selectedCountry", selectedCountry);

    const fetchAllStates = async () => {
      if (selectedCountry) {
        const Countryid = countries.find((a) => a.id == selectedCountry);

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
  }, [selectedCountry, countries]);

  useEffect(() => {
    const fetchAllCities = async () => {
      if (selectedState) {
        const Stateid = states.find((a) => a.id == selectedState);

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


  const handleSubmit = async (e) => {
    e.preventDefault();

    const userId = Cookies.get('id');
    const accessToken = Cookies.get('accessToken');

    const addressPayload = {
      user_id: Number(userId),
      first_name: formData.firstName,
      last_name: formData.lastName,
      phone: Number(formData.mobileNumber),
      email: formData.email,
      address1: formData.addressLine1,
      country: Number(formData.country),
      state: Number(formData.state),
      city: Number(formData.city),
      pincode: Number(formData.postalCode),
      is_default: formData.defaultAddress ? 1 : 0,
      a_type: formData.addressType === "work" ? 2 : (formData.addressType === "home" ? 1 : 3),
    };
    console.log("Pay Load", addressPayload);


    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/address`, addressPayload, {
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
                onChange={(e) => {
                  handleChange(e)
                  setSelectedCountry(e.target.value)
                }}
              >
                <option value="">Select Country</option>
                {countries.map((country) => (
                  <option key={country.id} value={country.id}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-6">
              <select
                className="form-select"
                name="state"
                value={formData.state}
                onChange={(e) => {
                  handleChange(e)
                  setSelectedState(e.target.value)
                }}
              >
                <option value="">Select State</option>
                {states.length > 0 ? <>
                  {states.map((state) => (
                    <option key={state.id} value={state.id}>
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
          </div>

          <div className="row mb-3">
            <div className="col-md-6">
              <select
                className="form-select"
                name="city"
                value={formData.city}
                onChange={handleChange}
              >
                <option value="">Select City</option>
                {cities.length > 0 ? <>
                  {cities.map((city) => (
                    <option key={city.id} value={city.id}>
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
