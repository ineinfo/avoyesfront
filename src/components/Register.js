"use client";


import React, { useState } from "react";
import { useRouter } from "next/navigation";
import "../assets/css/style.css";
import "../assets/css/responsive.css";
import Link from "next/link";
import axios from "axios";
import { toast } from 'react-toastify';
import Cookies from "js-cookie";

const Register = () => {
  const router = useRouter();
  const [first_name, setFirstName] = useState("");
  const [last_name,setLastName]=useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [terms, setTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);



  const handleRegister = async (e) => {
    e.preventDefault();
    console.log("Form clicked");

    // Basic Frontend Validation
    if (!first_name || !last_name || !email || !password) {
        toast.error("All fields are required.");
        return;
    }

    if (!terms) {
        toast.error("You must agree to the terms and conditions.");
        return;
    }

    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/users`, {
            first_name,
            last_name,
            email,
            // phone,
            password,
        });
        console.log("Response:", response.data);
        toast.success("Registration successful! Redirecting to login...");
        setTimeout(async() => {
            // router.push("/login");
            try {
              const response = await axios.post(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/users/frontlogin`, {
                email,
                password,
              });
        
              if (response.data && response.data.user) {
                const { user, accessToken } = response.data;
                Cookies.set('id', user.id, { path: '/' });
                Cookies.set('accessToken', accessToken, { path: '/' });
                toast.success("Login successful!"); // Success toast
        
                setTimeout(() => {
                  router.push("/dashboard");
                }, 2000);
                // router.push("/dashboard");
              } else {
                const errorMsg = "Invalid credentials.";
                toast.error(errorMsg); // Show error toast
              }
            } catch (error) {
              console.error("Login failed:", error);
              const errorMsg = "Login failed. Invalid credentials.";
              toast.error(errorMsg); // Show error toast
            }
        }, 2000); // Optional delay before redirect

    } catch (error) {
        console.error("Error:", error);

        if (error.response) {
            // Check if the error structure matches your backend's response
            if (error.response.data && error.response.data.error) {
                // Display the specific error message from the backend
                toast.error(error.response.data.error);
            } else {
                toast.error("An unexpected error occurred.");
            }
        } else {
            toast.error("An unexpected error occurred.");
        }
    }
};

const togglePasswordVisibility = () => {
  setShowPassword(!showPassword);
};

  return (
    <div className="register">
      <div className="container-fluid">
        <div className="row align-items-center">
          <div className="col-md-7 ps-0">
            <div className="register-img">
              <img src="/auth-img-1.png" alt="" />
            </div>
          </div>
          <div className="col-md-5">
            <div className="register-logo text-center">
              <Link href={'/'}> <img src="/logo.png" alt="" /></Link>
            </div>
            <div className="register-text">
              <h2>REGISTER</h2>
              <p>REGISTER NOW AND JOIN US !</p>
            </div>
            <form className="register-login-fields" onSubmit={handleRegister}>
            
            <div className="input-group register-field">
                <input
                  type="text"
                  className="form-control login register-input"
                  placeholder="First Name"
                  value={first_name}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="input-group register-field">
                <input
                  type="text"
                  className="form-control login register-input"
                  placeholder="Last Name"
                  value={last_name}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div className="input-group register-field">
                <input
                  type="email"
                  className="form-control login register-input"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              {/* <div className="input-group register-field">
                <input
                  type="text"
                  className="form-control login register-input"
                  placeholder="Phone Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div> */}
                    
              
              <div className="input-group register-field">
                <input
                  // type="password"
                  type={showPassword ? "text" : "password"}
                  className="form-control login register-input"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                  <span onClick={togglePasswordVisibility} style={{ cursor: "pointer", marginLeft: "10px", position: "absolute", right: 10, top: 9, zIndex: 100 }}>
                    {showPassword ? <i class="fa-solid fa-eye-slash"></i> : <i class="fa-solid fa-eye"></i>}
                  </span>
                  {/* {error.password && (
                    <p className="error-message" style={{ color: "red", marginTop: "5px" }}>
                      {error.password}
                    </p>
                  )} */}
              
              </div>

              <div className="form-check register-tearms">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="termsCheck"
                  checked={terms}
                  onChange={(e) => setTerms(e.target.checked)}
                />
                <label className="form-check-label" htmlFor="termsCheck">
                  I Agree to the{" "}
                  <Link href="" className="text-decoration-none">
                    Terms and Conditions
                  </Link>
                  .
                </label>


              </div>

              <div className="register-page-btn">
                <button type="submit">REGISTER NOW</button>
              </div>
              <div className="line-container-register">
                <div className="line-register"></div>
                <span className="text">Or</span>
                <div className="line-register"></div>
              </div>
              <div className="already-acc">
                <p className="text-center">
                  Already Have An Account?{" "}
                  <Link href="/login" className="text-decoration-none">
                    Login
                  </Link>
                </p>
              </div>
              <div className="direct-login-icons d-flex justify-content-center">
                <div className="google">
                  <Link href="#">
                    <img src="/google.png" alt="" />
                  </Link>
                </div>
                <div className="facebook">
                  <Link href="#">
                    <img src="/facebook.png" alt="" />
                  </Link>
                </div>
                <div className="tiktok">
                  <Link href="#">
                    <img src="/tiktok.png" alt="" />
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

