"use client";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { toast } from 'react-toastify';
import { useProfile } from "@/utils/ProfileContext";
 
const Profile = () => {
  const router = useRouter();
  const { profileData, updateProfile } = useProfile();
  
  const [localProfileData, setLocalProfileData] = useState({
    firstName: profileData?.firstName || "",
    lastName: profileData?.lastName || "",
    email: profileData?.email || "",
    mobileNumber: profileData?.mobileNumber || "",
    gender: profileData?.gender || 2, 
    profileImage: profileData?.profileImage ||  '/user.png', // Ensure this path is correct and accessible
  });

  // Move userId and accessToken outside of useEffect
  const userId = Cookies.get('id'); 
  const accessToken = Cookies.get('accessToken');

  
    // Fetch data only if userId exists
    useEffect(() => {
      if (!userId) {
        router.push('/login');
      }
    }, [userId]);


    useEffect(() => {
      const fetchProfileData = async () => {
        if (userId) {
          try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/users/${userId}`, {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            });
            if (response.data && response.data.data) {
              const { first_name, last_name, email, phone, gender, avatar } = response.data.data;
              setLocalProfileData({
                firstName: first_name,
                lastName: last_name,
                email: email,
                mobileNumber: phone,
                gender: gender || 2,
                profileImage: avatar || '/user.png', // Ensure this path is correct and accessible
              });
            }
          } catch (error) {
            console.error("Error fetching profile data:", error);
            toast.error("Error fetching profile data. Please try again.");
          }
        }
      };
    
      fetchProfileData();
    }, [userId, accessToken]); // Dependency array

//  if(!localProfileData){
//   if(userId){
//     fetchProfileData();
//    }
//  }

  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLocalProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleGenderChange = (e) => {
    const value = e.target.value;
    setLocalProfileData((prevData) => ({
      ...prevData,
      gender: value === "Male" ? 1 : value === "Female" ? 2 : 0,
    }));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLocalProfileData((prevData) => ({
        ...prevData,
        profileImage: file,
      }));
    }
  };

  const handleSaveChanges = async () => {
    const formData = new FormData();
    formData.append("first_name", localProfileData.firstName);
    formData.append("last_name", localProfileData.lastName);
    formData.append("email", localProfileData.email);
    formData.append("phone", localProfileData.mobileNumber);
    formData.append("gender", localProfileData.gender);

    if (localProfileData.profileImage instanceof File) {
      formData.append("avatar", localProfileData.profileImage);
    }

    try {
      await axios.put(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/users/${userId}`, formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      const updatedData = {
        firstName: localProfileData.firstName,
        lastName: localProfileData.lastName,
        email: localProfileData.email,
        mobileNumber: localProfileData.mobileNumber,
        gender: localProfileData.gender,
      };

      if (localProfileData.profileImage instanceof File) {
        updatedData.profileImage = URL.createObjectURL(localProfileData.profileImage);
      }

      updateProfile(updatedData);
      toast.success("Profile updated successfully!");
      router.push('/dashboard');
    } catch (error) {
      toast.error("Error updating profile data");
      console.error("Error updating profile data:", error);
    }
  };

  const handleCancel = () => {
    router.push('/dashboard');
  };

  return (
    <>
      <div className="row">
        <div className="col-xl-12">
          <div className="main mobile-prof-2 d-flex justify-content-between align-items-center">
            <div className="personal-head">
              <p className="person-prof mb-2">Personal Info</p>
              <p className="person-det m-0">Update your photo and personal details here</p>
            </div>
          </div>
        </div>
      </div>
      <div className="border-btm-profile"></div>
      <div className="row align-items-center">
        <div className="col-xl-3 col-lg-5">
          <div
            className="upload-box mt-4"
            onClick={() => document.getElementById("file-input").click()}
          >
            <i className="bi bi-cloud-upload fa-2x py-3"></i>
            <p>
              <b>Click to Upload</b>
              <br />
              or Drag Your Photo
            </p>
            <input
              type="file"
              id="file-input"
              accept="image/*"
              onChange={handleFileUpload}
              style={{ display: "none" }}
            />
          </div>
        </div>
        <div className="col-xl-5 col-lg-6 col-md-8">
          <div className="rd-btn d-flex pt-4 align-items-center">
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                id="genderMale"
                name="gender"
                value="Male"
                checked={localProfileData.gender === 1}
                onChange={handleGenderChange}
              />
              <label className="form-check-label" htmlFor="genderMale">Male</label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                id="genderFemale"
                name="gender"
                value="Female"
                checked={localProfileData.gender === 2}
                onChange={handleGenderChange}
              />
              <label className="form-check-label" htmlFor="genderFemale">Female</label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                id="genderOther"
                name="gender"
                value="Other"
                checked={localProfileData.gender === 0}
                onChange={handleGenderChange}
              />
              <label className="form-check-label" htmlFor="genderOther">Other</label>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-5" style={{ padding: "10px 0px" }}>
        <div className="col-xl-6">
          <div className="input-group login-field">
            <input
              type="text"
              className="form-control login profile-input"
              placeholder="First Name"
              name="firstName"
              value={localProfileData.firstName}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="col-xl-6">
          <div className="input-group login-field mobile-input">
            <input
              type="text"
              className="form-control login profile-input"
              placeholder="Last Name"
              name="lastName"
              value={localProfileData.lastName}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </div>

      <div className="row mb-3" style={{ padding: "10px 0px" }}>
        <div className="col-xl-6">
          <div className="input-group login-field">
            <input
              type="email"
              className="form-control login profile-input"
              placeholder="Email"
              name="email"
              value={localProfileData.email}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="col-xl-6">
          <div className="input-group login-field">
            <input
              type="text"
              className="form-control login profile-input"
              placeholder="Mobile Number"
              name="mobileNumber"
              value={localProfileData.mobileNumber}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-xl-12">
          <div className="d-flex justify-content-end">
            <button
              type="button"
              className="btn btn-outline-primary me-3"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn"
              style={{ backgroundColor: "#0000ff", color: "white" }}
              onClick={handleSaveChanges}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;



