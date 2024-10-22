"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { fetchCart, removeFromCart, updateCart } from "@/utils/api/CartApi";
import Cookies from "js-cookie";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [tempQuantities, setTempQuantities] = useState({});

  useEffect(() => {
    const token = Cookies.get("accessToken");
    const userId = Cookies.get("id");

    const loadCartData = async () => {
      setLoading(true);
      const response = await fetchCart(userId, token);
      if (response && response.data) {
        setCartItems(response.data);

        const initialQuantities = {};
        response.data.forEach(item => {
          initialQuantities[item.id] = item.quantity;
        });
        setTempQuantities(initialQuantities);
      }
      setLoading(false);
    };

    if (token && userId) {
      loadCartData();
    }
  }, []);

  const handleUpdateCart = async () => {
    try {
      const token = Cookies.get("accessToken");
      await Promise.all(
        cartItems.map(item =>
          updateCart(item.id, tempQuantities[item.id], token)
        )
      );
      setCartItems((prevItems) =>
        prevItems.map((item) => ({ ...item, quantity: tempQuantities[item.id] }))
      );
      toast.success("Cart updated successfully!");
      console.log("Cart updated successfully!");
    } catch (error) {
      console.error('Failed to update cart:', error);
      setError('Failed to update cart items.');
      toast.error('Failed to update cart items.');
    }
  };
  const handleQuantityChange = (itemId, newQuantity) => {
    setTempQuantities((prev) => ({ ...prev, [itemId]: newQuantity }));
  };


  const handleRemove = async (cartItemId) => {
    const token = Cookies.get("accessToken");
    const response = await removeFromCart(cartItemId, token);


    if (response && response.status === true) {
      setCartItems((prevItems) => prevItems.filter((item) => item.id !== cartItemId));
      toast.warning("Item removed from cart.");
    } else {
      console.error("Failed to remove item from cart:", response.message);
      toast.error("Failed to remove item from cart.");
    }
  };


  return (
    <>
      <div className="breadcrumb-marketplace py-5">
        <div className="img">
          <img src="" alt="" />
          <div className="container">
            <div className="bread-head text-end">
              <div className="link d-flex align-items-center justify-content-end">
                <Link href="/" className="text-decoration-none me-1">
                  HOME
                </Link>
                <p className="m-0">/ CART</p>
              </div>
              <h1>Cart</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="cart-section-main py-5">
        <div className="container">
          <div className="head d-flex justify-content-between align-items-center">
            <div className="heading">
              <h1>
                <span>SHOPPING </span> Cart ({cartItems.length})
              </h1>
            </div>
          </div>

          <div className="row pt-2">
            <div className="col-lg-8">
              {loading ? (
                <p>Loading cart items...</p>
              ) : (
                cartItems.map((item) => (
                  <div key={item.id} className="row py-4 align-items-center cart-page-item-border">
                    <div className="col-lg-2 col-md-2 col-4">
                      <div className="cart-img" style={{}}>
                        <img src={item.image_url1} alt={item.product_title} height={150} />
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-3 col-8">
                      <div className="cart-name-with-category ms-4">
                        <Link href={`${item.product_id}/productdetails`} className="text-decoration-none text-dark">
                          <h5 className="mb-1">{item.product_title}</h5>
                        </Link>
                        <p className="m-0">€{item.amount}</p>
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-4 col-10">
                      <div className="qty-container">
                        <p className="m-0">Quantity</p>
                        <button
                          className="qty-btn-minus btn-cornered"
                          type="button"
                          onClick={() => handleQuantityChange(item.id, Math.max(1, (tempQuantities[item.id] || 1) - 1))}
                        >
                          <i className="fa fa-chevron-left"></i>
                        </button>
                        <input
                          type="text"
                          name="qty"
                          value={tempQuantities[item.id] || item.quantity}
                          className="input-qty input-cornered"
                          readOnly
                        />
                        <button
                          className="qty-btn-plus btn-cornered"
                          type="button"
                          onClick={() => handleQuantityChange(item.id, (tempQuantities[item.id] || item.quantity) + 1)}
                        >
                          <i className="fa fa-chevron-right"></i>
                        </button>
                      </div>
                    </div>
                    <div className="col-lg-2 col-md-2 col-10">
                      <div className="cart-total-price">
                        <div className="cart-name-with-category ms-4">
                          <h5 className="mb-1">Total</h5>
                          <p className="m-0">€{item.amount * item.quantity}.00</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-1 col-md-1 col-2">
                      <div className="cart-item-remove text-center">
                        <Link href="#" onClick={() => handleRemove(item.id)}>
                          <i className="fa-solid fa-xmark"></i>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))
              )}
              <div className="gift-card d-flex align-items-center justify-content-between">
                <div className="input-with-icon">
                  <i className="fa fa-gift"></i>
                  <input
                    type="text"
                    className="form-control coupon-input"
                    placeholder="ENTER COUPON CODE"
                  />
                </div>
                <Link href="#" className="text-decoration-none text-dark">
                  <i className="fa-solid fa-arrow-right-long  me-3"></i>
                </Link>
              </div>

              <div className="back-to-shop-link d-flex justify-content-between align-items-center">
                <div className="back-to">
                  <Link href="/">Go Back To Shop</Link>
                </div>
                <div className="update-cart me-2">

                  <Link href="#" onClick={handleUpdateCart}>
                    Update Cart
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-lg-4 pt-5">
              <div className="order-summary-box">
                <div className="head text-center">
                  <h3 className="m-0">ORDER SUMMARY</h3>
                </div>
                <div className="sub-total d-flex align-items-center justify-content-between">
                  <p className="m-0">Sub-Total</p>
                  <p className="m-0">
                    €{cartItems.reduce((acc, item) => acc + item.amount * item.quantity, 0)}.00
                  </p>
                </div>
                <div className="discount d-flex align-items-center justify-content-between">
                  <p className="m-0">Discount</p>
                  <p className="m-0">€70.00</p>
                </div>
                <div className="delivery d-flex align-items-center justify-content-between">
                  <p className="m-0">Delivery</p>
                  <p className="m-0">FREE</p>
                </div>
                <div className="total d-flex align-items-center justify-content-between">
                  <p className="m-0">Total</p>
                  <p className="m-0">
                    €{cartItems.reduce((acc, item) => acc + item.amount * item.quantity, 0) - 70}.00
                  </p>
                </div>
                <div className="summary-checkout">
                  <Link href="/checkout">
                    <button type="button" className="summary-btn">
                      CHECKOUT NOW
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
