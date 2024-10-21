"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const OrderDetails = ({ change }) => {
  const router = useRouter();
  const handleBack = () => {
    router.push("/dashboard/orders");
  };
  return (
    <>
      <div className="my-order-head">
        <div className="d-flex align-items-center justify-content-between">
          <h2>
            <span>ORDER </span>details
          </h2>

          <button onClick={handleBack} className="btn ms-3" id="addNewAddressBtn">
            back
          </button>
        </div>

        <div className="ordr-dtl-img text-center pt-5">
          <img src="/sidebar-img-1.png" alt="" />
          <div className="dtl mt-4">
            <h5 className="m-0">Women’s Sequin Skirt</h5>
            <p className="m-0">Size : L</p>
          </div>
        </div>
        <div className="border-btm-profile-2"></div>
        <div className="order-track-main">
          <div className="arriving d-flex align-items-center">
            <div className="dot">
              <i className="fa-solid fa-circle me-3"></i>
            </div>
            <div className="text">
              <h5 className="m-0">Arriving By</h5>
              <p className="m-0">by Thu, 8 Aug, 2024</p>
            </div>
          </div>
          <div className="placed d-flex align-items-center my-2">
            <div className="dot">
              <i className="fa-solid fa-check"></i>
            </div>
            <div className="text">
              <h5 className="m-0">Placed</h5>
              <p className="m-0">Order Placed On 5 Aug</p>
              <div className="track-line-1"></div>
              <div className="track-line-2"></div>
            </div>
          </div>
          <div className="arriving d-flex align-items-center">
            <div className="dot">
              <i className="fa-solid fa-circle me-3 blue-dot"></i>
            </div>
            <div className="text">
              <h5 className="m-0">Arrived</h5>
              <p className="m-0">On 5 Aug</p>
            </div>
          </div>
        </div>
        <div className="cncl-btn">
          <Link href="">
            <button type="button" className="">
              Cancel
            </button>
          </Link>
        </div>
        <div className="delivery-address-box">
          <div className="head">
            <h5 className="m-0">Delivery Address</h5>
          </div>
          <div className="text-1 d-flex align-items-center contact-name-phone">
            <div className="name">
              <p className="m-0 pe-3">Imani Mill</p>
            </div>
            <div className="phone">
              <p className="m-0 ps-3">1234567890</p>
            </div>
          </div>
          <div className="add">
            <p className="m-0">20 Cooper Square, New York, NY 10003, USA</p>
          </div>
        </div>

        <div className="delivery-address-box">
          <div className="total-price-order d-flex justify-content-between align-items-center">
            <div className="ttl-price">
              <h5 className="m-0">Total Item Price</h5>
              <p className="m-0">
                You Saved <span className="px-1">€40.00</span> On This Item
              </p>
            </div>
            <div className="right-price">
              <p className="m-0">€740.00</p>
            </div>
          </div>
        </div>
        <div className="delivery-address-box">
          <div className="head">
            <h4 className="m-0">Update Sent To</h4>
          </div>
          <div className="text-1 d-flex align-items-center pt-2">
            <div className="name">
              <p className="m-0 pe-3">
                <Link
                  href="mailto:imani@gmail.com"
                  className="text-decoration-none"
                >
                  {" "}
                  <i className="fa-solid fa-envelope me-2"></i>imani@gmail.com
                </Link>
              </p>
            </div>
            <div className="phone">
              <p className="m-0 ps-3">
                <Link href="tel:1234567890" className="text-decoration-none">
                  {" "}
                  <i className="fa-solid fa-phone me-2"></i> 1234567890
                </Link>
              </p>
            </div>
          </div>
        </div>

        <div className="order-id">
          <p>Order ID #12345566778899076</p>
        </div>
      </div>
    </>
  );
};

export default OrderDetails;
