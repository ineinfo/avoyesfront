import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { fetchCart, removeFromCart, updateCart } from "@/utils/api/CartApi";
import { bottom } from "@popperjs/core";
import { useAuth } from "@/utils/Guard";
import "../assets/css/style.css";
import "../assets/css/responsive.css";
import { Grid } from "antd";
import LoadingSpinner from "./Loading";

const { useBreakpoint } = Grid
const Header = ({ isPopupOpen, togglePopup, popupRef }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isNavbarCollapsed, setIsNavbarCollapsed] = useState(true);

  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const [showName, setShowName] = useState(false);

  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const screens = useBreakpoint()
  const auth = useAuth()
  console.log("User", auth);


  console.log("CartItems", cartItems);

  // State for managing offcanvas visibility
  const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);

  const toggleSearchPopup = (e) => {
    e.preventDefault();
    // setShowSearchPopup(false);
  };


  const handleSearch = (e) => {
    if (e.key === "Enter" && searchQuery.trim() !== "") {
      // Redirect to marketplace with the search query as a parameter
      router.push(`/marketplace?search=${encodeURIComponent(searchQuery.trim())}`);
      togglePopup(); // Close the popup after searching
    }
  };

  const handleNavigation = (url) => {
    setIsNavbarCollapsed(true); // Close the navbar
    router.push(url); // Navigate to the specified URL
  };

  useEffect(() => {
    const userId = Cookies.get("id");
    const accessToken = Cookies.get("accessToken");

    const loadCartData = async () => {
      try {
        const cartData = await fetchCart(userId ? userId : '', accessToken);
        console.log("dadadad", cartData);

        if (cartData && cartData.data) {
          setError(null)
          setCartItems(cartData.data);
        } else if (userId && accessToken) {
          setError("No cart data")
          setCartItems([]); //d
        } else {
          setError("LogIn")

        }
      } catch (err) {
        console.error("Error fetching cart data:", err.response);
        setError("No cart data");
      } finally {
        setLoading(false);
      }
    };

    loadCartData();
  }, [isOffcanvasOpen]);

  const updateQuantity = async (id, action) => {
    const accessToken = Cookies.get("accessToken");

    const itemInCart = cartItems.find((item) => item.id === id);
    if (!itemInCart) {
      setError("Item is no longer in the cart");
      return;
    }

    const newQuantity =
      action === "increment"
        ? itemInCart.quantity + 1
        : Math.max(1, itemInCart.quantity - 1);

    try {
      await updateCart(itemInCart.id, newQuantity, accessToken);
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.id === itemInCart.id ? { ...item, quantity: newQuantity } : item
        )
      );
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setError("Item has been removed from the cart");
      } else {
        setError("Error updating cart item");
      }
      console.error("Error updating cart item:", error);
    }
  };

  const handleRemoveItem = async (item) => {
    const cartItemId = item.id;
    const accessToken = Cookies.get("accessToken");

    try {
      const response = await removeFromCart(cartItemId, accessToken);
      if (response.status) {
        setCartItems((prevItems) =>
          prevItems.filter((cartItem) => cartItem.id !== cartItemId)
        );
      } else {
        setError(response.message || "Failed to remove item from cart");
      }
    } catch (error) {
      console.error("Error removing item from cart:", error);
      setError("Error removing item from cart");
    }
  };

  const calculateTotal = () => {
    if (cartItems.length == 0) {
      return
    }
    return cartItems
      .reduce((acc, item) => acc + item.quantity * item.amount, 0)
      .toFixed(2);
  };

  const handleScroll = () => {
    setScrolled(window.scrollY > 50);
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

    if (
      (pathname === "/login" || pathname === "/register") &&
      userId &&
      accessToken
    ) {
      router.push("/dashboard");
    }

    if (userId && accessToken) {
      setShowName(true);
    } else {
      setShowName(false);
    }
  }, [pathname, router, isOffcanvasOpen]);

  // Close the offcanvas when clicking outside of it or navigating
  useEffect(() => {
    // Ensure the code runs only on the client
    if (typeof document !== "undefined") {
      const handleOutsideClick = (event) => {
        const offcanvasElement = document.getElementById("offcanvasRight");
        if (
          offcanvasElement &&
          isOffcanvasOpen &&
          !offcanvasElement.contains(event.target)
        ) {
          setIsOffcanvasOpen(false);
        }
      };

      document.addEventListener("click", handleOutsideClick);

      return () => {
        document.removeEventListener("click", handleOutsideClick);
      };
    }
  }, [isOffcanvasOpen]);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      const navbarElement = document.getElementById("navbarSupportedContent");
      if (navbarElement && !navbarElement.contains(event.target)) {
        setIsNavbarCollapsed(true); // Close the navbar when clicking outside
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  if (
    pathname === "/otp" ||
    pathname === "/forgotpassword" ||
    pathname === "/new-password" ||
    pathname === "/register" ||
    pathname === "/login"
  ) {
    return null; // Don't render header on these paths
  }

  return (
    <>
      <header onClick={toggleSearchPopup}>
        <div id="navbar" className="fixed-top">
          <nav
            className={`navbar navbar-expand-md py-2 fixed-top`}
            style={{
              backgroundColor: scrolled
                ? "rgba(255, 255, 255, 0.9)"
                : "transparent",
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
                onClick={() => setIsNavbarCollapsed(!isNavbarCollapsed)}
                aria-controls="navbarSupportedContent"
                aria-expanded={!isNavbarCollapsed}
                aria-label="Toggle navigation"
              >

                <i className="fas fa-bars"></i>

              </button>

              <div className={`collapse navbar-collapse ${isNavbarCollapsed ? '' : 'show'}`} id="navbarSupportedContent" style={{ paddingBottom: "15px" }}>
                <ul className="navbar-nav ms-auto align-items-center">
                  <li className="nav-item" onClick={() => togglePopup()} >
                    {/* Search Icon */}
                    <Link
                      href="#"
                      id="search-icon"
                      className="text-decoration-none text-dark"
                    // Trigger the popup toggle on click
                    >
                      <i className="fa-solid fa-magnifying-glass"></i>
                    </Link>

                    {/* Search Popup */}
                    <div
                      ref={popupRef}
                      id="searchPopup"
                      style={{ display: isPopupOpen ? "block" : "none" }}
                      className="search-popup"

                    >
                      <div className="search-content" onClick={(e) => e.stopPropagation()} >
                        {/* <button
                        className="close-btn"
                        aria-label="Close"
                        onClick={toggleSearchPopup}
                      >
                        <i className="fa fa-times"></i>
                      </button> */}
                        <input
                          type="text"
                          placeholder="Search For Brands, Products And More..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          onKeyDown={handleSearch} // Trigger search on "Enter" key
                        />
                      </div>
                    </div>

                  </li>


                  <li className="nav-item">
                    <a
                      onClick={() => handleNavigation('/wishlist')}
                      className="text-decoration-none text-dark header-heart"
                      style={{ cursor: 'pointer' }}
                    >
                      <i className="fa-regular fa-heart"></i>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      onClick={() => handleNavigation('/cart')}
                      className="text-decoration-none text-dark header-heart"
                      style={{ cursor: 'pointer' }}
                    >
                      <img
                        src="/header-cart.png"
                        alt=""
                        className="header-cart"
                      />
                    </a>
                  </li>
                  <li className="nav-item">
                    {showName ? (
                      <a
                        onClick={() => handleNavigation('/dashboard')}
                        style={{
                          padding: "8px 15px",
                          backgroundColor: "blue",
                          marginLeft: "15px",
                          color: "white",
                          fontWeight: "bold",
                          borderRadius: "10px",
                          cursor: "pointer",
                          textDecoration: "none",
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                        }}
                      >
                        <i class="fa-solid fa-address-card"></i> Dashboard
                      </a>
                    ) : (
                      <a
                        onClick={() => handleNavigation('/login')}
                        style={{
                          padding: "8px 15px",
                          backgroundColor: "blue",
                          marginLeft: "15px",
                          color: "white",
                          fontWeight: "bold",
                          borderRadius: "10px",
                          cursor: "pointer",
                          textDecoration: "none",
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                        }}
                      >
                        <i className="fa-regular fa-user me-1"></i>
                        Login
                      </a>
                    )}
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>

        <div style={{ overflow: "hidden" }}>
          {/* Overlay */}
          <div
            className={`offcanvas-overlay ${isOffcanvasOpen ? "active" : ""}`}
            onClick={() => setIsOffcanvasOpen(false)} // Click on overlay to close offcanvas
          ></div>

          {/* Offcanvas Sidebar */}
          <div
            className={`offcanvas offcanvas-end ${isOffcanvasOpen ? "show" : ""}`}
            tabIndex="-1"
            id="offcanvasRight"
            aria-labelledby="offcanvasRightLabel"
            style={{
              visibility: isOffcanvasOpen ? "visible" : "hidden",
              overflowY: "auto", // Allow vertical scrolling
              overflowX: "hidden", // Prevent horizontal scrolling
              maxHeight: "100vh", // Ensure the sidebar doesn’t exceed the viewport height
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                minHeight: "100%",
                overflowX: "hidden",
                minWidth: "50vh",
              }}
            >
              <div className="offcanvas-header mt-4 d-flex align-items-center justify-content-between mx-4">
                <div className="heading d-flex align-items-center">
                  <h5 id="offcanvasRightLabel" className="m-0 your-cart">
                    Your Cart
                  </h5>
                  {cartItems.length > 0 && (
                    <Link href="/cart" className="text-decoration-none ms-5">
                      <h6
                        onClick={() => setIsOffcanvasOpen(false)}
                        className="m-0 view-cart"
                      >
                        View Cart{" "}
                        <i className="fa-solid fa-arrow-right-long ms-1"></i>
                      </h6>
                    </Link>
                  )}
                </div>
                <button
                  type="button"
                  className="text-reset right-sidebar-close"
                  aria-label="Close"
                  onClick={() => setIsOffcanvasOpen(false)}
                >
                  <i className="fa-solid fa-xmark"></i>
                </button>
              </div>
              <div className="offcanvas-body" style={{ overflowX: "hidden" }}>
                {loading ? (
                  <p><LoadingSpinner /></p>
                ) : error ? (
                  <>{error === 'LogIn' ? <p onClick={() => { setIsOffcanvasOpen(false) }}><Link href={'/login'}>Log in</Link> First to add products in cart</p> : error}</>
                ) : (
                  cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="row checkout-product-1 align-items-center mx-4 prd-border"
                      style={{ marginBottom: "15px" }}
                    >
                      <div className="col-xl-2 col-lg-2 col-md-4 col-6">
                        <div className="cart-img">
                          <img
                            src={item.image_url1}
                            alt={item.product_title}
                            height={80}
                            width={65}
                          />
                        </div>
                      </div>
                      <div className="col-xl-3 col-lg-3 col-md-5 col-5 p-0">
                        {" "}
                        {/* Adjusted from col-md-8 to col-md-6 and col-6 to col-5 */}
                        <div className="product-name-with-category ms-4">
                          <h5 className="mb-1">{item.product_title}</h5>
                          <p className="mb-0 text-muted">{item.category_title}</p>
                        </div>
                      </div>
                      <div className="col-xl-3 col-lg-3 col-md-3">
                        <div className="quantity">
                          <button
                            onClick={() => updateQuantity(item.id, "decrement")}
                            className="btn"
                          >
                            -
                          </button>
                          <span>{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, "increment")}
                            className="btn"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className="col-xl-3 col-lg-3 col-md-4">
                        <div className="price">
                          <span
                            className="fw-bold"
                            style={{ marginRight: "80px" }}
                          >
                            €{(item.amount * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                      <div className="col-xl-1 col-lg-1 col-md-1">
                        <button
                          onClick={() => handleRemoveItem(item)}
                          className="btn p-0"
                          title="Remove"
                        >
                          <i className="fa-solid fa-xmark"></i>
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {cartItems.length > 0 && (
                <div className="sidebar-ftr-shadow">
                  <div className="right-sidebar-bottom-btns mx-5 d-flex align-items-center justify-content-between">
                    <div className="total-price">
                      <p className="mb-1">Total</p>
                      <h3>€ {calculateTotal()}</h3>
                    </div>
                    <div className="sidebar-checkout-btn">
                      {/* <Link
                      href="/checkout"
                      
                      onClick={() => setIsOffcanvasOpen(false)}
                     
                      className="text-decoration-none"
                    >
                      <button type="button" className="sidebar-checkout">
                        CHECKOUT{" "}
                        <i className="fa-solid fa-arrow-right-long"></i>
                      </button>
                    </Link> */}
                      <Link
                        href="/checkout"
                        onClick={() => {
                          setIsOffcanvasOpen(false);

                        }}
                        className="text-decoration-none"
                      >
                        <button type="button" className="sidebar-checkout">
                          CHECKOUT <i className="fa-solid fa-arrow-right-long"></i>
                        </button>
                      </Link>

                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>


      </header>
      {/* <hr style={{ borderColor: "#000000" }} /> */}
      {/* {pathname === "/" && <hr style={{ borderColor: "000000" }} />} */}
      <hr style={{ borderColor: "000000" }} />


      <section>
        <div className="top-menu-main py-3">
          <div className="container py-4">
            <div className="homecontainer" style={{ display: "flex", justifyContent: screens.sm ? "center" : 'left' }}>

              <div className="col-custom" style={{ maxWidth: screens.sm ? "" : '30%', overflow: "hidden" }}>
                <Link href="/marketplace" className="text-decoration-none">
                  <div className="menu-1">
                    <div className="img pt-3">
                      <img src="/dress.png" alt="Dress" />
                    </div>
                    <div className="text pt-3" >
                      <p style={{ fontWeight: "bold" }}>Market Place</p>
                    </div>
                  </div>
                </Link>
              </div>

              <div className="col-custom" style={{ maxWidth: screens.sm ? "" : '30%', overflow: "hidden" }}>
                <Link href="/event" className="text-decoration-none">
                  <div className="menu-1">
                    <div className="img pt-3">
                      <img src="/calendar.png" alt="Dress" />
                    </div>
                    <div className="text pt-3" >
                      <p style={{ fontWeight: "bold" }}>Event</p>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="col-custom" style={{ maxWidth: screens.sm ? "" : '30%', overflow: "hidden" }}>
                <Link href="/map" className="text-decoration-none">
                  <div className="menu-1">
                    <div className="img pt-3">
                      <img src="/location.png" alt="Dress" />
                    </div>
                    <div className="text pt-3" >
                      <p style={{ fontWeight: "bold" }}>Map</p>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="col-custom" style={{ maxWidth: screens.sm ? "" : '30%', overflow: "hidden" }}>
                <Link href="/activity" className="text-decoration-none">
                  <div className="menu-1">
                    <div className="img pt-3">
                      <img src="/puzzle.png" alt="Dress" />
                    </div>
                    <div className="text pt-3" >
                      <p style={{ fontWeight: "bold" }}>Activity</p>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="col-custom" style={{ maxWidth: screens.sm ? "" : '30%', overflow: "hidden" }}>
                <Link href="/foodie" className="text-decoration-none">
                  <div className="menu-1">
                    <div className="img pt-3">
                      <img src="/fork.png" alt="Dress" />
                    </div>
                    <div className="text pt-3" >
                      <p style={{ fontWeight: "bold" }}>Foodie</p>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="col-custom" style={{ maxWidth: screens.sm ? "" : '30%', overflow: "hidden" }}>
                <Link href="/challanges" className="text-decoration-none">
                  <div className="menu-1">
                    <div className="img pt-3">
                      <img src="/goal.png" alt="Dress" />
                    </div>
                    <div className="text pt-3" >
                      <p style={{ fontWeight: "bold" }}>Challanges</p>
                    </div>
                  </div>
                </Link>
              </div>

            </div>
          </div>
        </div>
      </section>

    </>

  );
};

export default Header;
