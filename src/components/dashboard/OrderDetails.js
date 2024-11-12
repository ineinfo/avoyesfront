"use client";
import { fetchOrderDetails } from "@/utils/api/CheckoutApi";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import LoadingSpinner from "../Loading";
import {
  fetchCities,
  fetchColors,
  fetchCountries,
  fetchSizes,
  fetchStates,
} from "@/utils/api/CommonApi";
import { fetchAddress } from "@/utils/api/AddressAPI";

const OrderDetails = ({ change }) => {
  const [details, setDetails] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [colors, setColors] = useState([]);
  const [address, setAddress] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [countryname, setCountryname] = useState();
  const router = useRouter();
  const searchParams = useSearchParams();
  const Id = searchParams.get("id");
  const handleBack = () => {
    router.replace("/dashboard/orders");
  };

  useEffect(() => {
    const orderDetails = async (id) => {
      const response = await fetchOrderDetails(id);
      setDetails(response);
    };
    const allSizes = async () => {
      const response = await fetchSizes();
      setSizes(response);
    };
    const allColors = async () => {
      const response = await fetchColors();
      setColors(response);
    };
    if (Id) orderDetails(Id);
    allSizes();
    allColors();
  }, [Id]);

  useEffect(() => {
    const addressDetails = async (id) => {
      try {
        const response = await fetchAddress();
        const matched = response?.find((a) => a.id === id);
        if (!matched) return;

        setAddress(matched);

        const [countries, allStates, allCities] = await Promise.all([
          fetchCountries(),
          fetchStates(matched.country),
          fetchCities(matched.state),
        ]);

        const matchedCountry = countries.find((c) => c.id === matched.country);
        setCountryname(matchedCountry?.name);
        setStates(allStates);
        setCities(allCities);
      } catch (error) {
        console.error("Error fetching address details:", error);
      }
    };

    if (details?.address_id) {
      addressDetails(details.address_id);
    }
  }, [details.address_id]);

  if (!details) {
    return <LoadingSpinner />;
  }

  const { order_id, order_number, created_at, order_items, final_amount } =
    details;

  const getSize = (id) => {
    const size = sizes.find((size) => size.id === id);
    const title = size?.title;
    return title;
  };

  const getColor = (id) => {
    const color = colors.find((size) => size.id === id);
    const title = color?.title;
    return title;
  };

  const getState = (id) => {
    const state = states.find((state) => state.id === id);
    const title = state?.name;
    return title;
  };

  const getCity = (id) => {
    const city = cities.find((city) => city.id === id);
    const title = city?.name;
    return title;
  };

  console.log("res", address);

  return (
    <>
      <div className="my-order-head">
        <div className="d-flex align-items-center justify-content-between">
          <h2>
            <span>ORDER </span>details
          </h2>

          <button
            onClick={handleBack}
            className="btn ms-3"
            id="addNewAddressBtn"
          >
            back
          </button>
        </div>






        <div
          className="ordr-dtl-img text-center pt-5"
          style={{
            display: "flex",
            overflowX: "auto", // Enable horizontal scroll
            padding: "10px 0",
            gap: "10px"
          }}
        >
          {order_items?.map((item) => (
            <div
              key={item.id}
              className="item"
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "5px",
                minWidth: "250px" // Ensures each item has a minimum width
              }}
            >
              <img
                src={item?.image_url || "/sidebar-img-1.png"}
                alt=""
                style={{ height: "180px", width: "40%" }}
              />
              <div className="dtl" style={{ textAlign: "left" }}>
                <h5 className="m-0">{item.item_name}</h5>
                <div style={{ display: "flex", gap: "0 5px", flexWrap: "wrap" }}>
                  <p className="m-0">Size: {getSize(item.size_id || "Free Size")}</p>
                  <p className="m-0">Color: {getColor(item.color_id || "")}</p>
                </div>
                <div style={{ display: "flex", gap: "0 5px", flexWrap: "wrap" }}>
                  <p className="m-0">Rate: €{item.rate}</p>
                  <p className="m-0">Quantity: {item.quantity}</p>
                </div>
                <p className="m-0">Amount: €{item.amount}</p>
              </div>
            </div>
          ))}
        </div>





        <div className="border-btm-profile-2"></div>
        <div className="order-track-main">
          <div className="arriving d-flex align-items-center">
            <div className="dot">
              <i className="fa-solid fa-circle me-3"></i>
            </div>
            <div className="text">
              <h5 className="m-0">Placed</h5>
              <p className="m-0">
                Order Placed On{" "}
                {new Date(created_at).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>
          <div className="placed d-flex align-items-center my-2">
            <div className="dot">
              <i className="fa-solid fa-check"></i>
            </div>
            <div className="text">
              <h5 className="m-0">Arriving By</h5>
              <p className="m-0">by {/*Thu, 8 Aug, 2024*/}</p>
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
              <p className="m-0">On {/*5 Aug*/}</p>
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
              <p className="m-0 pe-3">
                {" "}
                {address ? `${address.first_name} ${address.last_name}` : ""}
              </p>
            </div>
            <div className="phone">
              <p className="m-0 ps-3">{address ? address.phone : ""}</p>
            </div>
          </div>
          <div className="add">
            <p className="m-0">
              {address
                ? `${address.address1} , ${getCity(address.city)} , ${getState(
                  address.state
                )} , ${address.pincode} , ${countryname}`
                : ""}
            </p>
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
              <p className="m-0">€{final_amount}</p>
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
                  <i className="fa-solid fa-envelope me-2"></i>
                  {address ? address.email : ""}
                </Link>
              </p>
            </div>
            <div className="phone">
              <p className="m-0 ps-3">
                <Link href="tel:1234567890" className="text-decoration-none">
                  {" "}
                  <i className="fa-solid fa-phone me-2"></i>{" "}
                  {address ? address.phone : ""}
                </Link>
              </p>
            </div>
          </div>
        </div>

        <div className="order-id">
          <p>Order ID #{order_number}</p>
        </div>
      </div>
    </>
  );
};

export default OrderDetails;
