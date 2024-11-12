

"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { toast } from 'react-toastify';
import { fetchCities, fetchCountries, fetchStates } from "@/utils/api/CommonApi";




const ManageAddress = () => {
  const router = useRouter();
  const [addresses, setAddresses] = useState([]);
  const [currentAddress, setCurrentAddress] = useState(null);
  const [cityName, setCityName] = useState('')
  const [stateName, setStateName] = useState('')
  const [countryName, setCountryName] = useState('')
  const [addressDetails, setAddressDetails] = useState({});
  const userId = Cookies.get('id'); // Get user_id from cookies
  const ROUTE = process.env.NEXT_PUBLIC_NEXTAUTH_URL
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState();
  const [selectedState, setSelectedState] = useState();

  // Fetch countries on component mount
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get("/api/countries"); // Replace with actual API
        setCountries(response.data);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };
    fetchCountries();
  }, []);

  // Fetch states when selectedCountry changes
  useEffect(() => {
    if (selectedCountry) {
      const fetchallStates = async () => {
        try {
          const response = await fetchStates(selectedCountry)
          console.log('state', response);

          setStates(response);
          setCities([]); // Clear cities when country changes
        } catch (error) {
          console.error("Error fetching states:", error);
        }
      };
      fetchallStates();
    }
  }, [selectedCountry]);

  // Fetch cities when selectedState changes
  useEffect(() => {
    if (selectedState) {
      const fetchallCities = async () => {
        try {
          const response = await fetchCities(selectedState)
          setCities(response);
        } catch (error) {
          console.error("Error fetching cities:", error);
        }
      };
      fetchallCities();
    }
  }, [selectedState]);

  const countryMap = {
    1: "United States",
    2: "Canada",
  };

  const cityMap = {
    3: "New York",
    4: "Los Angeles",
  };

  const stateMap = {
    5: "New York",
    6: "California",
  };

  const handleAdd = () => {
    router.push("/dashboard/address/add");
  };

  // const getCountryName = (id) => {
  //   const res = countries.find
  // }
  // getStateName
  // getCityName

  const handleDelete = (addressId) => {

    console.log("The Route", addressId);

    // Show a toast for confirmation
    toast.info(
      <div>
        <span>Are you sure you want to delete this address?</span>
        <i
          className="fas fa-check" // Use an icon for confirmation
          onClick={async () => {
            const accessToken = Cookies.get('accessToken');
            try {
              await axios.delete(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/address/${addressId}`, {
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                },
              });
              setAddresses((prevAddresses) =>
                prevAddresses.filter((address) => address.id !== addressId)
              );
              // Use a function to show the success toast

            } catch (error) {
              toast.error("Error deleting address"); // Error toast
              console.error("Error deleting address:", error);
            }
            toast.dismiss(); // Close the confirmation toast
          }}
          style={{ cursor: 'pointer', marginLeft: '10px' }} // Style for the icon
        />
        <span
          onClick={toast.dismiss}
          style={{ cursor: 'pointer', marginLeft: '10px' }} // Close icon for cancelling
        >
          <i className="fas fa-times" />
        </span>
      </div>,
      {
        autoClose: false,
        closeOnClick: false,
        draggable: false,
        position: "top-center",
      }
    );
  };



  const handleEdit = (address) => {
    console.log("Adress", address);
    setSelectedCountry(address?.country)
    setSelectedState(address?.state)
    setCurrentAddress(address);
  };



  const handleUpdate = async (event) => {
    event.preventDefault();
    const accessToken = Cookies.get('accessToken');
    const updatedAddress = {};

    try {
      const { firstName, lastName, mobileNumber, email, addressLine1, country, city, state, postalCode, addressType, defaultAddress } = event.target;

      if (firstName && firstName.value.trim()) {
        updatedAddress.first_name = firstName.value.trim();
      }
      if (lastName && lastName.value.trim()) {
        updatedAddress.last_name = lastName.value.trim();
      }
      if (mobileNumber && mobileNumber.value.trim()) {
        updatedAddress.phone = mobileNumber.value.trim();
      }
      if (email && email.value.trim()) {
        updatedAddress.email = email.value.trim();
      }
      if (addressLine1 && addressLine1.value.trim()) {
        updatedAddress.address1 = addressLine1.value.trim();
      }
      if (country && country.value) {
        updatedAddress.country = country.value;
      }
      if (city && city.value) {
        updatedAddress.city = city.value;
      }
      if (state && state.value) {
        updatedAddress.state = state.value;
      }
      if (postalCode && postalCode.value.trim()) {
        updatedAddress.pincode = postalCode.value.trim();
      }
      if (addressType && addressType.value) {
        updatedAddress.a_type = Number(addressType.value);
      }
      updatedAddress.is_default = defaultAddress ? defaultAddress.checked : false;

      console.log("Updating address with data:", updatedAddress);

      console.log("ROUTE", ROUTE)

      const response = await axios.put(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/address/${currentAddress.id}`, updatedAddress, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // Update the local state with the new data
      setAddresses((prevAddresses) =>
        prevAddresses.map((address) =>
          address.id === currentAddress.id ? { ...address, ...updatedAddress } : address
        )
      );

      toast.success("Address updated successfully"); // Success toast
      console.log("Address updated successfully");
      setCurrentAddress(null); // Clear form after successful update
    } catch (error) {
      toast.error("Error updating address"); // Error toast
      console.error("Error updating address:", error.response?.data || error.message);
    }
  };


  useEffect(() => {
    const fetchAddresses = async () => {

      const country = await fetchCountries();
      setCountries(country ? country : [{}]);
      const accessToken = Cookies.get('accessToken');
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/address?user_id=${userId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        if (Array.isArray(response.data.data)) {
          setAddresses(response.data.data);
        } else {
          toast.error("Error updating address");
          console.error("Unexpected response data format:", response.data);
          setAddresses([]);
        }
      } catch (error) {
        toast.error("Error fetching address");
        console.error("Error fetching addresses:", error);
        setAddresses([]);
      }
    };

    fetchAddresses();
  }, [userId]);

  useEffect(() => {
    // Function to fetch city, state, and country names for each address
    const fetchAddressDetails = async () => {
      const details = {};

      for (const address of addresses) {
        if (address.state && address.city) {
          const cityName = await getCityName(address.state, address.city);
          const stateName = await getStateName(address.country, address.state);
          const countryName = await getCountryName(address.country);

          // Store the result in the details object with address id as key
          details[address.id] = {
            cityName,
            stateName,
            countryName,
          };
        }
      }

      // Update state with all the fetched details
      setAddressDetails(details);
    };

    if (addresses.length > 0) {
      fetchAddressDetails();
    }
  }, [addresses]);

  const getCityName = async (s_id, c_id) => {
    try {
      const Allcities = await fetchCities(s_id);
      if (!Allcities || !Array.isArray(Allcities)) {
        throw new Error("Cities data is not an array or is undefined");
      }

      const matchedCity = Allcities.find((c) => c.id === c_id);
      const name = matchedCity ? matchedCity.name : "Unknown City";
      // Safely return the city name if found, otherwise return a default
      return name
    } catch (error) {
      console.error("Error fetching city name:", error);
      return "Unknown city"; // Default value in case of error
    }
  };

  const getStateName = async (c_id, s_id) => {
    try {
      const Allstates = await fetchStates(c_id);
      if (!Allstates || !Array.isArray(Allstates)) {
        throw new Error("Cities data is not an array or is undefined");
      }

      const matchedState = Allstates.find((c) => c.id === s_id);
      const name = matchedState ? matchedState.name : "Unknown State";
      // Safely return the city name if found, otherwise return a default
      return name
    } catch (error) {
      console.error("Error fetching city name:", error);
      return "Unknown city"; // Default value in case of error
    }
  };

  const getCountryName = async (c_id) => {
    try {
      const AllCountries = await fetchCountries();


      const matchedCountry = AllCountries.find((c) => c.id === c_id);
      const name = matchedCountry ? matchedCountry.name : "Unknown Country";
      // Safely return the city name if found, otherwise return a default
      return name
    } catch (error) {
      console.error("Error fetching city name:", error);
      return "Unknown city"; // Default value in case of error
    }
  };

  return (
    <>
      <div className="my-order-head">
        <div className="d-flex align-items-center justify-content-between">
          <h2>
            <span>MANAGE </span>Address
          </h2>
          <button onClick={handleAdd} className="btn ms-3" id="addNewAddressBtn">
            + Add New
          </button>
        </div>
      </div>

      <div className="address-list mt-4" id="addressList">
        {addresses.map((address) => (
          <div className="address-item py-3 d-flex justify-content-between align-items-center" key={address.id}>
            <div>
              <div className="flex">
                <h3>{address.first_name} {address.last_name}</h3>
                <h5>{address.a_type === 1 ? "Home" : address.a_type === 2 ? "Work" : "Other"}</h5>
              </div>
              <div className="address-content">
                <p>{address.address1}</p>
                <p>{address.email}</p>
                <p>{address.phone}</p>
                <p>
                  {addressDetails[address.id]
                    ? `${addressDetails[address.id].cityName}, ${addressDetails[address.id].stateName}, ${addressDetails[address.id].countryName} - ${address.pincode}`
                    : "Loading..."}</p>
              </div>
            </div>
            <div className="d-flex align-items-center">
              <button
                onClick={() => handleEdit(address)}
                className="text-decoration-none me-2 btn btn-link"
                aria-label="Edit address"
              >
                <i className="fas fa-edit"></i>
              </button>
              <span className="mx-2">|</span>
              <button
                onClick={() => handleDelete(address.id)}
                className="text-decoration-none btn btn-link"
                aria-label="Delete address"
              >
                <i className="fas fa-trash"></i>
              </button>
            </div>
          </div>
        ))}
      </div>



      <div className="address-form" id="addressForm" style={{ display: currentAddress ? "block" : "none" }}>
        <p>Update Address</p>
        <form onSubmit={handleUpdate}>
          <div className="row radio-btns-address">
            <div className="col-12 d-flex justify-content-start">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="addressType"
                  id="work"
                  value={2}
                  checked={currentAddress?.a_type === 2}
                />
                <label className="form-check-label" htmlFor="work">Work</label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="addressType"
                  id="home"
                  value={1}
                  checked={currentAddress?.a_type === 1}
                />
                <label className="form-check-label" htmlFor="home">Home</label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="addressType"
                  id="other"
                  value={3}
                  checked={currentAddress?.a_type === 3}
                />
                <label className="form-check-label" htmlFor="other">Other</label>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-4 pe-2">
              <input
                type="text"
                className="form-control"
                name="firstName"
                placeholder="First Name"
                defaultValue={currentAddress ? currentAddress.first_name : ""}
              />
            </div>
            <div className="col-md-4 pe-2">
              <input
                type="text"
                className="form-control"
                name="lastName"
                placeholder="Last Name"
                defaultValue={currentAddress ? currentAddress.last_name : ""}
              />
            </div>
            <div className="col-md-4">
              <input
                type="text"
                className="form-control"
                name="mobileNumber"
                placeholder="Mobile Number"
                defaultValue={currentAddress ? currentAddress.phone : ""}
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
                defaultValue={currentAddress ? currentAddress.address1 : ""}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <input
                type="text"
                className="form-control"
                name="email"
                placeholder="Email"
                defaultValue={currentAddress ? currentAddress.email : ""}
              />
            </div>
          </div>

          <div className="row">
            {/* Country Select */}
            <div className="col-md-4 pe-2">
              <select
                className="form-select"
                name="country"
                value={selectedCountry}
                onChange={(e) => {
                  setSelectedCountry(e.target.value);
                  setSelectedState(""); // Reset state when country changes
                }}
              >
                <option value="">Select Country</option>
                {countries?.map((country) => (
                  <option key={country.id} value={country.id}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>

            {/* State Select */}
            <div className="col-md-4 pe-2">
              <select
                className="form-select"
                name="state"
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                disabled={!selectedCountry}
              >
                <option value="">Select State</option>
                {states?.map((state) => (
                  <option key={state.id} value={state.id}>
                    {state.name}
                  </option>
                ))}
              </select>
            </div>

            {/* City Select */}
            <div className="col-md-4">
              <select
                className="form-select"
                name="city"
                value={currentAddress ? currentAddress.city : ""}
                disabled={!selectedState}
              >
                <option value="">Select City</option>
                {cities?.map((city) => (
                  <option key={city.id} value={city.id}>
                    {city.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <input
                type="text"
                className="form-control"
                name="postalCode"
                placeholder="Postal Code"
                defaultValue={currentAddress ? currentAddress.pincode : ""}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="defaultAddress"
                  id="defaultAddress"
                  defaultChecked={currentAddress && currentAddress.is_default}
                />
                <label className="form-check-label" htmlFor="defaultAddress">Set as default address</label>
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-end">
            <button type="submit" className="btn-save-address">
              Save
            </button>

            <button
              type="button"
              className="btn-back-address"
              id="backToAddressListBtn"
              onClick={() => setCurrentAddress(null)} // Clear the form on back
            >
              Back
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ManageAddress;
