

"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios"; 
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { toast } from 'react-toastify';

const ManageAddress = () => {
  const router = useRouter();
  const [addresses, setAddresses] = useState([]); 
  const [currentAddress, setCurrentAddress] = useState(null);
  
  const userId = Cookies.get('id'); // Get user_id from cookies


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

//   const handleDelete = async (addressId) => {
//     const accessToken = Cookies.get('accessToken');
//     try {
//         await axios.delete(`http://localhost:3002/api/address/${addressId}`, {
//             headers: {
//                 Authorization: `Bearer ${accessToken}`,
//             },
//         });
//         setAddresses(prevAddresses => prevAddresses.filter(address => address.id !== addressId));
//         toast.success("Address deleted successfully!"); // Success toast
//     } catch (error) {
//         toast.error("Error deleting address"); // Error toast
//         console.error("Error deleting address:", error);
//     }
// };


//   const handleEdit = (address) => {
//     setCurrentAddress(address);
//   };

//   const handleUpdate = async (event) => {
//     event.preventDefault();

//     const accessToken = Cookies.get('accessToken');
//     const updatedAddress = {};

//     try {
//         const { firstName, lastName, mobileNumber, email, addressLine1, country, city, state, postalCode, addressType, defaultAddress } = event.target;

//         if (firstName && firstName.value.trim()) {
//             updatedAddress.first_name = firstName.value.trim();
//         }
//         if (lastName && lastName.value.trim()) {
//             updatedAddress.last_name = lastName.value.trim();
//         }
//         if (mobileNumber && mobileNumber.value.trim()) {
//             updatedAddress.phone = mobileNumber.value.trim();
//         }
//         if (email && email.value.trim()) {
//             updatedAddress.email = email.value.trim();
//         }
//         if (addressLine1 && addressLine1.value.trim()) {
//             updatedAddress.address1 = addressLine1.value.trim();
//         }
      
//         if (country && country.value) {
//             updatedAddress.country = country.value;
//         }
//         if (city && city.value) {
//             updatedAddress.city = city.value;
//         }
//         if (state && state.value) {
//             updatedAddress.state = state.value;
//         }
//         if (postalCode && postalCode.value.trim()) {
//             updatedAddress.pincode = postalCode.value.trim();
//         }
//         if (addressType && addressType.value) {
//             updatedAddress.a_type = Number(addressType.value);
//         }
//         updatedAddress.is_default = defaultAddress ? defaultAddress.checked : false;

//         console.log("Updating address with data:", updatedAddress);

//         await axios.put(`http://localhost:3002/api/address/${currentAddress.id}`, updatedAddress, {
//             headers: {
//                 Authorization: `Bearer ${accessToken}`,
//             },
//         });

        
//         toast.success("Address updated successfully")
//         console.log("Address updated successfully");
//         setCurrentAddress(null); // Clear form after successful update
//     } catch (error) {
//       toast.error("Error updating address")
//         console.error("Error updating address:", error.response?.data || error.message);
//     }
// };

//   useEffect(() => {
//     const fetchAddresses = async () => {
//       const accessToken = Cookies.get('accessToken');
//       try {
//         const response = await axios.get(`http://localhost:3002/api/address?user_id=${userId}`, {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//           },
//         });
//         if (Array.isArray(response.data.data)) {
//           setAddresses(response.data.data);
//         } else {
//           toast.error("Error updating address")
//           console.error("Unexpected response data format:", response.data);
//           setAddresses([]);
//         }
//       } catch (error) {
//         toast.error("Error fetching address")
//         console.error("Error fetching addresses:", error);
//         setAddresses([]);
//       }
//     };
    
//     fetchAddresses();
//   }, [userId]);


const handleDelete = (addressId) => {
  // Show a toast for confirmation
  toast.info(
    <div>
      <span>Are you sure you want to delete this address?</span>
      <i 
        className="fas fa-check" // Use an icon for confirmation
        onClick={async () => {
          const accessToken = Cookies.get('accessToken');
          try {
            await axios.delete(`http://localhost:3002/api/address/${addressId}`, {
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
  setCurrentAddress(address);
};

// const handleUpdate = async (event) => {
//   event.preventDefault();
//   const accessToken = Cookies.get('accessToken');
//   const updatedAddress = {};

//   try {
//     const { firstName, lastName, mobileNumber, email, addressLine1, country, city, state, postalCode, addressType, defaultAddress } = event.target;

//     if (firstName && firstName.value.trim()) {
//       updatedAddress.first_name = firstName.value.trim();
//     }
//     if (lastName && lastName.value.trim()) {
//       updatedAddress.last_name = lastName.value.trim();
//     }
//     if (mobileNumber && mobileNumber.value.trim()) {
//       updatedAddress.phone = mobileNumber.value.trim();
//     }
//     if (email && email.value.trim()) {
//       updatedAddress.email = email.value.trim();
//     }
//     if (addressLine1 && addressLine1.value.trim()) {
//       updatedAddress.address1 = addressLine1.value.trim();
//     }
//     if (country && country.value) {
//       updatedAddress.country = country.value;
//     }
//     if (city && city.value) {
//       updatedAddress.city = city.value;
//     }
//     if (state && state.value) {
//       updatedAddress.state = state.value;
//     }
//     if (postalCode && postalCode.value.trim()) {
//       updatedAddress.pincode = postalCode.value.trim();
//     }
//     if (addressType && addressType.value) {
//       updatedAddress.a_type = Number(addressType.value);
//     }
//     updatedAddress.is_default = defaultAddress ? defaultAddress.checked : false;

//     console.log("Updating address with data:", updatedAddress);

//     await axios.put(`http://localhost:3002/api/address/${currentAddress.id}`, updatedAddress, {
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//       },
//     });
    
//     toast.success("Address updated successfully"); // Success toast
//     console.log("Address updated successfully");
//     setCurrentAddress(null); // Clear form after successful update
//   } catch (error) {
//     toast.error("Error updating address"); // Error toast
//     console.error("Error updating address:", error.response?.data || error.message);
//   }
// };

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

    const response = await axios.put(`http://localhost:3002/api/address/${currentAddress.id}`, updatedAddress, {
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
    const accessToken = Cookies.get('accessToken');
    try {
      const response = await axios.get(`http://localhost:3002/api/address?user_id=${userId}`, {
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
                <p>{`${cityMap[address.city]}, ${stateMap[address.state]}, ${countryMap[address.country]} - ${address.pincode}`}</p>
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
                  value="2"
                  defaultChecked={currentAddress && currentAddress.a_type === 2}
                />
                <label className="form-check-label" htmlFor="work">Work</label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="addressType"
                  id="home"
                  value="1"
                  defaultChecked={currentAddress && currentAddress.a_type === 1}
                />
                <label className="form-check-label" htmlFor="home">Home</label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="addressType"
                  id="other"
                  value="3"
                  defaultChecked={currentAddress && currentAddress.a_type === 3}
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
            <div className="col-md-4 pe-2">
              <select className="form-select" name="country" defaultValue={currentAddress ? currentAddress.country : ""}>
                <option value="">Select Country</option>
                {Object.entries(countryMap).map(([key, value]) => (
                  <option key={key} value={key}>{value}</option>
                ))}
              </select>
            </div>
            <div className="col-md-4 pe-2">
              <select className="form-select" name="state" defaultValue={currentAddress ? currentAddress.state : ""}>
                <option value="">Select State</option>
                {Object.entries(stateMap).map(([key, value]) => (
                  <option key={key} value={key}>{value}</option>
                ))}
              </select>
            </div>
            <div className="col-md-4">
              <select className="form-select" name="city" defaultValue={currentAddress ? currentAddress.city : ""}>
                <option value="">Select City</option>
                {Object.entries(cityMap).map(([key, value]) => (
                  <option key={key} value={key}>{value}</option>
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
