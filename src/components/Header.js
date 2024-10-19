"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie"; // Import js-cookie
import { fetchCart } from "@/utils/api/CartApi";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname(); // Get current path
  const router = useRouter();
  const [showName, setShowName] = useState(false);
  
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true); // Added loading state
  const [error, setError] = useState(null); // Added error state

  useEffect(() => {
    const userId = Cookies.get("id");
    const accessToken = Cookies.get("accessToken");

    const loadCartData = async () => {
      try {
        const cartData = await fetchCart(userId, accessToken);
        console.log("API Response:", cartData); // Log the full response

        // Check if cartData contains the cart items directly
        if (cartData && cartData.data) { // Adjust according to your actual response structure
          setCartItems(cartData.data);
        } else {
          setError(cartData.message || "Failed to fetch cart");
        }
      } catch (err) {
        console.error("Error fetching cart data:", err); // Log the actual error
        setError("Error fetching cart data");
      } finally {
        setLoading(false);
      }
    };

    loadCartData();
  }, []);

  // Function to update quantity
  const updateQuantity = (id, action) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item.product_id === id) {
        return {
          ...item,
          quantity: action === "increment" ? item.quantity + 1 : Math.max(1, item.quantity - 1),
        };
      }
      return item;
    });
    setCartItems(updatedCartItems);
  };

  // Calculate total price
  const calculateTotal = () => {
    return cartItems.reduce((acc, item) => acc + item.quantity * item.amount, 0).toFixed(2);
  };

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const userId = Cookies.get("id");
    const accessToken = Cookies.get("accessToken");

    if ((pathname === "/login" || pathname === "/register") && userId && accessToken) {
      router.push("/dashboard");
      setShowName(true);
    }
  }, [pathname, router]);

  if (pathname === "/otp" || pathname === "/forgotpassword" || pathname === "/new-password" || pathname === "/register") {
    return null; // Don't render header on these paths
  }

  return (
    <header>
      <div id="navbar" className="fixed-top">
        <nav
          className={`navbar navbar-expand-md py-2 fixed-top`}
          style={{
            backgroundColor: scrolled ? "rgba(255, 255, 255, 0.9)" : "transparent",
            transition: "background-color 0.3s ease",
            zIndex: 1000,
          }}
        >
          <div className="container d-flex justify-content-between align-items-center py-2">
            <Link className="navbar-brand" href="/">
              <img src="/logo.png" alt="Logo" />
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <i className="fas fa-bars"></i>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav ms-auto align-items-center">
                <li className="nav-item">
                  <Link href="#" id="search-icon" className="text-decoration-none text-dark">
                    <i className="fa-solid fa-magnifying-glass"></i>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/wishlist" className="text-decoration-none text-dark header-heart">
                    <i className="fa-regular fa-heart"></i>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    href=""
                    className="text-decoration-none text-dark header-heart"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasRight"
                    aria-controls="offcanvasRight"
                  >
                    <img src="/header-cart.png" alt="" className="header-cart" />
                  </Link>
                </li>
                <li className="nav-item">
                  {showName ? 'Home' :
                    <Link href="/login" className="text-decoration-none text-dark header-heart">
                      <i className="fa-regular fa-user me-1"></i>
                      Login
                    </Link>}
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>

      <div
        className="offcanvas offcanvas-end"
        tabIndex="-1"
        id="offcanvasRight"
        aria-labelledby="offcanvasRightLabel"
      >
        <div className="offcanvas-header mt-4 d-flex align-items-center justify-content-between mx-4">
          <div className="heading d-flex align-items-center">
            <h5 id="offcanvasRightLabel" className="m-0 your-cart">Your Cart</h5>
            <Link href="/cart" className="text-decoration-none ms-5">
              <h6 className="m-0 view-cart">
                View Cart <i className="fa-solid fa-arrow-right-long ms-1"></i>
              </h6>
            </Link>
          </div>
          <button
            type="button"
            className="text-reset right-sidebar-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
        <div className="offcanvas-body">
          {loading ? (
            <p>Loading cart items...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            cartItems.map((item) => (
              <div key={item.product_id} className="row checkout-product-1 align-items-center mx-4 prd-border">
                <div className="col-xl-2 col-lg-2 col-md-4 col-6">
                  <div className="img">
                    <img src={item.image_url} alt={item.title} style={{ width: '50px', height: '50px' }} />
                  </div>
                </div>
                <div className="col-xl-4 col-lg-4 col-md-8 p-0 col-6">
                  <div className="product-name-with-category ms-4">
                    <h5 className="mb-1">{item.title}</h5>
                    <p className="m-0">Category: {/* Add category here if available */}</p>
                  </div>
                </div>
                <div className="col-xl-2 col-lg-3 col-md-5 side-mt-md col-5">
                  <div className="quantity">
                    <Link href="#" onClick={() => updateQuantity(item.product_id, "decrement")} className="quantity__minus">
                      <span>
                        <i className="fa-solid fa-minus"></i>
                      </span>
                    </Link>
                    <input
                      name="quantity"
                      type="text"
                      className="quantity__input"
                      value={item.quantity}
                      readOnly
                    />
                    <Link href="#" onClick={() => updateQuantity(item.product_id, "increment")} className="quantity__plus">
                      <span>
                        <i className="fa-solid fa-plus"></i>
                      </span>
                    </Link>
                  </div>
                </div>
                <div className="col-xl-2 col-lg-2 col-md-5 side-mt-md col-5">
                  <div className="sidebar-price text-center">
                    <p className="m-0">€{(item.amount * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
                <div className="col-xl-2 col-lg-1 col-md-2 side-mt-md col-2">
                  <div className="remove-item text-center">
                    <Link href="#">
                      <i className="fa-solid fa-xmark"></i>
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="offcanvas-footer mt-4 mx-4">
          <div className="d-flex justify-content-between">
            <p className="m-0">Total</p>
            <h5 className="m-0">€{calculateTotal()}</h5>
          </div>
          <Link href="/checkout" className="text-decoration-none proceed-to-checkout">Proceed to Checkout</Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
