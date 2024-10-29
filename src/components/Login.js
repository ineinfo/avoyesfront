
"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import axios from "axios";
import Link from "next/link";
import "../assets/css/style.css";
import "../assets/css/responsive.css";
import { toast } from 'react-toastify';


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter(); // Initialize useRouter




  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload

    // Validation
    const newError = { email: "", password: "" };
    if (!email) {
      newError.email = "Email field is required.";
      toast.error(newError.email); // Show error toast
    }
    if (!password) {
      newError.password = "Password field is required.";
      toast.error(newError.password); // Show error toast
    }

    // If not valid, return early
    if (newError.email || newError.password) return;

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
    } finally {
      setEmail("");
      setPassword("");
    }
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
      if (value) {
        setError((prev) => ({ ...prev, email: "" }));
      }
    } else if (name === "password") {
      setPassword(value);
      if (value) {
        setError((prev) => ({ ...prev, password: "" }));
      }
    }
  };
  // Toggle password visibility
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
              <Link href={'/'}><img src="/logo.png" alt="" /></Link>
            </div>
            <div className="register-text">
              <h2>LOGIN</h2>
              <p>GREAT TO HAVE YOU BACK!</p>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="register-login-fields">
                <div className="input-group newpwd-field-1">
                  <input
                    type="email"
                    name="email"
                    className="form-control login register-input"
                    placeholder="Email"
                    value={email}
                    onChange={handleInputChange}
                  />
                  {error.email && (
                    <p className="error-message" style={{ color: "red", marginTop: "5px" }}>
                      {error.email}
                    </p>
                  )}
                </div>
                <div className="input-group newpwd-field-2" style={{ position: 'relative' }}>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    className="form-control login register-input"
                    placeholder="Password"
                    value={password}
                    onChange={handleInputChange}
                    style={{ paddingRight: "40px" }}
                  />
                  <span onClick={togglePasswordVisibility} style={{ cursor: "pointer", marginLeft: "10px", position: "absolute", right: 10, top: 9, zIndex: 100 }}>
                    {showPassword ? <i class="fa-solid fa-eye-slash"></i> : <i class="fa-solid fa-eye"></i>}
                  </span>
                  {error.password && (
                    <p className="error-message" style={{ color: "red", marginTop: "5px" }}>
                      {error.password}
                    </p>
                  )}
                </div>

                <div className="frgt-pwd-text text-end">
                  <Link href="/forgotpassword" className="text-decoration-none">
                    Forgot Password?
                  </Link>
                </div>

                <div className="register-page-btn">
                  <button type="submit">LOGIN</button>
                </div>

                <div className="already-acc">
                  <p className="text-center">
                    Don't Have An Account?{" "}
                    <Link href="/register" className="text-decoration-none">
                      Register Now
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
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
