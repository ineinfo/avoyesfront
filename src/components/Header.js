import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { fetchCart, removeFromCart, updateCart } from "@/utils/api/CartApi";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const [showName, setShowName] = useState(false);

  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log("CartItems", cartItems);

  // State for managing offcanvas visibility
  const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);

  useEffect(() => {
    const userId = Cookies.get("id");
    const accessToken = Cookies.get("accessToken");

    const loadCartData = async () => {
      try {
        const cartData = await fetchCart(userId, accessToken);

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

    loadCartData();
  }, []);

  const updateQuantity = async (id, action) => {
    const accessToken = Cookies.get("accessToken");

    const itemInCart = cartItems.find(item => item.id === id);
    if (!itemInCart) {
      setError("Item is no longer in the cart");
      return;
    }

    const newQuantity = action === "increment" ? itemInCart.quantity + 1 : Math.max(1, itemInCart.quantity - 1);

    try {
      await updateCart(itemInCart.id, newQuantity, accessToken);
      setCartItems(prevItems =>
        prevItems.map(item =>
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
        setCartItems((prevItems) => prevItems.filter(cartItem => cartItem.id !== cartItemId));
      } else {
        setError(response.message || "Failed to remove item from cart");
      }
    } catch (error) {
      console.error("Error removing item from cart:", error);
      setError("Error removing item from cart");
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((acc, item) => acc + item.quantity * item.amount, 0).toFixed(2);
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

    if ((pathname === "/login" || pathname === "/register") && userId && accessToken) {
      router.push("/dashboard");
      setShowName(true);
    }
  }, [pathname, router]);

  // Close the offcanvas when clicking outside of it or navigating
  useEffect(() => {
    const handleOutsideClick = (event) => {
      const offcanvasElement = document.getElementById("offcanvasRight");
      if (offcanvasElement && isOffcanvasOpen && !offcanvasElement.contains(event.target)) {
        setIsOffcanvasOpen(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isOffcanvasOpen]);

  if (pathname === "/otp" || pathname === "/forgotpassword" || pathname === "/new-password" || pathname === "/register") {
    return null; // Don't render header on these paths
  }

  return (
    <header>
      <div id="navbar" className="fixed-top">
        <nav className={`navbar navbar-expand-md py-2 fixed-top`} style={{
          backgroundColor: scrolled ? "rgba(255, 255, 255, 0.9)" : "transparent",
          transition: "background-color 0.3s ease",
          zIndex: 1000,
        }}>
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
                    href="#"
                    className="text-decoration-none text-dark header-heart"
                    onClick={() => setIsOffcanvasOpen(true)} // Open offcanvas
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
        className={`offcanvas offcanvas-end ${isOffcanvasOpen ? 'show' : ''}`} // Add show class based on state
        tabIndex="-1"
        id="offcanvasRight"
        aria-labelledby="offcanvasRightLabel"
        style={{ visibility: isOffcanvasOpen ? 'visible' : 'hidden' }} // Control visibility
      >
        <div className="offcanvas-header mt-4 d-flex align-items-center justify-content-between mx-4">
          <div className="heading d-flex align-items-center">
            <h5 id="offcanvasRightLabel" className="m-0 your-cart">Your Cart</h5>
            <Link href="/cart" className="text-decoration-none ms-5">
              <h6 onClick={() => (setIsOffcanvasOpen(false))} className="m-0 view-cart">
                View Cart <i className="fa-solid fa-arrow-right-long ms-1"></i>
              </h6>
            </Link>
          </div>
          <button
            type="button"
            className="text-reset right-sidebar-close"
            aria-label="Close"
            onClick={() => {
              setIsOffcanvasOpen(false); // Close offcanvas
            }}
          >
            <i className="fa-solid fa-xmark"></i> {/* Close icon */}
          </button>
        </div>
        <div className="offcanvas-body">
          {loading ? (
            <p>Loading cart items...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            cartItems.map((item) => {
              console.log("Rendering item:", item); // Log item details
              return (
                <div key={item.id} className="row checkout-product-1 align-items-center mx-4 prd-border">
                  <div className="col-xl-2 col-lg-2 col-md-4 col-6">
                    <div className="cart-img">
                      <img src={item.image_url1} alt={item.product_title} height={80} />
                    </div>
                  </div>
                  <div className="col-xl-4 col-lg-4 col-md-8 p-0 col-6">
                    <div className="product-name-with-category ms-4">
                      <h5 className="mb-1">{item.product_title}</h5>
                      <p className="mb-0 text-muted">{item.category_title}</p>
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-3 col-md-4">
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
                  <div className="col-xl-2 col-lg-2 col-md-4">
                    <div className="price">
                      <span className="fw-bold" style={{ marginRight: "80px" }}>
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
              );
            })
          )}
          {cartItems.length > 0 && (
            <div className="mt-3 total-amount">
              <h5>Total: € {calculateTotal()}</h5>
              <Link href="/checkout" onClick={() => (setIsOffcanvasOpen(false))} className="text-decoration-none proceed-to-checkout">Proceed to Checkout</Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
