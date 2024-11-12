
"use client"

import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import Cookies from "js-cookie";
import defaut_product_image from "../../public/default_product.jpg"

const WishList = () => {

  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const userId = Cookies.get('id');

    const fetchWishlist = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/wishlist/${userId}`);
        setWishlist(response.data.data);
      } catch (error) {
        console.error("Error fetching wishlist", error);
      }
    };

    fetchWishlist();
  }, []);

  const removeFromWishlist = async (productId) => {
    try {
      const userId = Cookies.get('id');
      const token = Cookies.get('accessToken');


      await axios.post(
        `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/wishlist`,
        {
          user_id: userId,
          product_id: productId,
          status: 0,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );


      setWishlist((prevWishlist) => prevWishlist.filter(item => item.product_id !== productId));

    } catch (error) {
      console.error("Error removing product from wishlist", error);
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
                <Link href="index" className="text-decoration-none me-1">
                  HOME
                </Link>
                <p className="m-0 ps-1"> / WISHLIST</p>
              </div>
              <h1>Wishlist</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="wishlist-main">
        <div className="container">
          <div className="head d-flex justify-content-between align-items-center my-5">
            <div className="heading">
              <h1>
                <span>MY </span> Wishlist  ({wishlist.length})
              </h1>
            </div>
          </div>
          <div className="row pt-4 pb-4 pb-md-0">

            {wishlist.map((item) => (
              <div className="col-xl-3 col-md-6 col-lg-3 mb-md-5">
                <div className="market-place-product market-place-page-product">
                  <div className="img-wrapper">
                    <div className="img">
                      <img src={item.image_url1 && !item.image_url1.includes("localhost") ? item.image_url1 : '/default_product.jpg'} alt={item.title} height={"350px"} style={{ objectFit: "cover" }} />
                      <div className="lable">
                        <p>NEW</p>
                      </div>
                      <div className="buttons">
                        <Link href="cart" className="text-decoration-none">
                          MOVE TO BAG
                          <i className="bi bi-handbag ms-2 quick-icons"></i>
                        </Link>
                      </div>
                      <div className="heart-icon-wishlist">
                        {/* <i className="fa-solid fa-heart blue-heart"></i> */}
                        <i
                          className="fa-solid fa-heart blue-heart"
                          onClick={() => removeFromWishlist(item.product_id)}
                          style={{ cursor: "pointer" }}
                        ></i>
                      </div>
                    </div>
                  </div>
                  <div className="info d-flex justify-content-between align-items-center">
                    <div className="item">
                      <Link
                        href="Product-details"
                        className="text-decoration-none"
                      >
                        <p className="m-0">{item.title}</p>
                      </Link>
                    </div>
                    <div className="rating d-flex align-items-center">
                      <div className="rate d-flex align-items-center">
                        <p className="m-0">{item.ratings}</p>
                        <i className="fa-solid fa-star"></i>
                      </div>
                      <div className="people">
                        <p className="m-0"></p>
                      </div>
                    </div>
                  </div>
                  <div className="pricing d-flex align-items-center">
                    <div className="price">
                      <p className="m-0">€{item.discount_amount}</p>
                    </div>
                    <div className="checked-price px-3">
                      <span className="price-old">€{item.amount}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}


          </div>

        </div>
      </div>

    </>
  );
};

export default WishList;


