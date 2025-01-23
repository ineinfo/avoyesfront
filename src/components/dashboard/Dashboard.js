"use client";

import { fetchUserDetails } from "@/utils/api/CommonApi";
import React, { useEffect, useState } from "react";
import LoadingSpinner from "../Loading";
import { getOrder } from "@/utils/api/CheckoutApi";
import axios from "axios";
import Cookies from "js-cookie";
import { fetchReservations } from "@/utils/api/FoodieApi";

const Dashboard = () => {
  const [user, setUser] = useState();
  const [orders, setOrders] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [reservations, setReservations] = useState([]);

  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchuser = async () => {
      try {
        const loggedUser = await fetchUserDetails();
        setUser(loggedUser);
      } catch (error) {
        console.log("error", error);
      }
    };

    const fetchorder = async () => {
      try {
        const res = await getOrder();
        // setOrders(res);
        setOrders(Array.isArray(res) ? res : []);
      } catch (error) {
        console.log("error", error);
      }
    };


    const fetchReservationsData = async () => {
      try {
        const userId = Cookies.get("id"); // Retrieve the logged-in user's id from cookies
        const data = await fetchReservations();
        
        // Filter reservations by user_id
        const filteredData = Array.isArray(data)
          ? data.filter(reservation => reservation.user_id === parseInt(userId))
          : [];
          
        setReservations(filteredData); // Set filtered reservations
      } catch (error) {
        console.error("Error fetching reservations:", error);
      }
    };


    const fetchWishlist = async () => {
      try {
        const userId = Cookies.get('id');
        const response = await axios.get(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/wishlist/${userId}`);
        setWishlist(response.data.data);
      } catch (error) {
        console.error("Error fetching wishlist", error);
      }
    };

    fetchorder();
    fetchuser();
    fetchWishlist();
    fetchReservationsData();
  }, []);

  if (!user) {
    return <LoadingSpinner />;
  }

  const capitalizeFirstLetter = (string) => {
    if (!string) return "";
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const handleSeeAll = () => {
    setShowAll(!showAll); // Toggle the state
  };

  function formatCurrency(value) {
    if (value >= 1e9) {
      return `€ ${(value / 1e9).toFixed(1)}B`; // Billion
    } else if (value >= 1e6) {
      return `€ ${(value / 1e6).toFixed(1)}M`; // Million
    } else {
      return `€ ${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`; // Comma separated for thousands
    }
  }

  const displayedOrders = showAll ? orders : orders.slice(0, 3);
  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        color: "#333",
        marginTop: "-20px",
        marginLeft: "-10px", //dhara
        marginRight: "auto", 
        maxWidth: "100%",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          color: "#333",
          fontSize: "28px",
          marginBottom: "20px",
        }}
      >
        User Dashboard
      </h1>

      {/* User Information Section */}
      <div style={{ marginBottom: "20px" }}>
        <h2 style={{ fontSize: "24px" }}>
          Welcome,{" "}
          {user
            ? `${capitalizeFirstLetter(
              user.first_name
            )} ${capitalizeFirstLetter(user.last_name)}`
            : ""}
        </h2>
        <p style={{ fontSize: "16px", color: "#555" }}>
          Here’s an overview of your account.
        </p>
      </div>

      {/* Overview Section */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
          flexWrap: "wrap", // Allow wrapping on smaller screens
        }}
      >
        <div style={cardStyle}>
          <h2 style={cardTitleStyle}>Total Orders</h2>
          <h3 style={cardValueStyle}>{orders.length}</h3>
        </div>
        <div style={cardStyle}>
          <h2 style={cardTitleStyle}>Total Spending</h2>
          <h3 style={cardValueStyle}>{formatCurrency(orders.reduce((acc, item) => acc + (item.final_amount || 0), 0))}</h3>
        </div>
        <div style={cardStyle}>
          <h2 style={cardTitleStyle}>Pending Orders</h2>
          <h3 style={cardValueStyle}>{orders.filter(order => order.order_status !== 3).length}</h3>
        </div>
        <div style={cardStyle}>
          <h2 style={cardTitleStyle}>Wishlist</h2>
          <h3 style={cardValueStyle}>{wishlist.length}</h3>
        </div>
      </div>

      <hr
        style={{
          margin: "40px 0",
          border: "none",
          borderTop: "1px solid #ddd",
        }}
      />

      {/* Recent Orders */}
      <div style={{ marginBottom: "20px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px"
          }}
        >
          <h2 style={{ fontSize: "20px" }}>
            Your Recent Orders
          </h2>{" "}
          {orders.length > 3 && <button onClick={handleSeeAll} style={{
            padding: "5px 15px",
            backgroundColor: "white",
            color: "black",
            borderRadius: "10px",
            border: "solid 1px #0000ff",
          }}> {showAll ? 'See Less' : 'See All'}</button>}
        </div>
        {displayedOrders.length > 0 ? <table style={tableStyle}>
          <thead>
            <tr>
              <th style={tableHeaderStyle}>Order ID</th>
              <th style={tableHeaderStyle}>Date</th>
              <th style={tableHeaderStyle}>Total</th>
              <th style={tableHeaderStyle}>Status</th>
            </tr>
          </thead>
          <tbody>

            {displayedOrders.map(order => (
              <tr key={order.order_id} style={tableRowStyle}>
                <td style={tableCellStyle}>#{order.order_number}</td>
                <td style={tableCellStyle}>{new Date(order.created_at).toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}</td>
                <td style={tableCellStyle}>€ {order.final_amount}</td>
                <td style={tableCellStyle}>{order.order_status === 3 ? "Delivered" : "In Processing"}</td>
              </tr>
            ))}


          </tbody>
        </table> : <p style={{ textAlign: 'center', fontSize: "18px", marginBottom: "50px" }}> You Haven&apos;t Ordered Anything Yet</p>}
      </div>

      {/* Favorite Products */}
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <h2 style={{ fontSize: "20px" }}>
            Your Favourite Products
          </h2>{" "}
          {wishlist.length > 3 && <button style={{
            padding: "5px 15px",
            backgroundColor: "white",
            color: "black",
            borderRadius: "10px",
            border: "solid 1px #0000ff",
          }}>see all</button>}
        </div>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={tableHeaderStyle}>Product</th>
              <th style={tableHeaderStyle}>Price</th>
              <th style={tableHeaderStyle}>Discount Price</th>
            </tr>
          </thead>
          <tbody>
            {wishlist.map(item => (
              <tr key={item.product_id} style={tableRowStyle}>
                <td style={tableCellStyle}>{item.title}</td>
                <td style={tableCellStyle}>€ {item.amount}</td>
                <td style={tableCellStyle}>{item.discount_amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Your reservations */}
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          <h2 style={{ fontSize: "20px" , marginTop: "30px"}}>
            Your Reservations
          </h2>{" "}
          {reservations.length > 3 && <button style={{
            padding: "5px 15px",
            backgroundColor: "white",
            color: "black",
            borderRadius: "10px",
            border: "solid 1px #0000ff",
          }}>see all</button>}
        </div>
        <table style={tableStyle}>
          <thead>
            <tr>
            <th style={tableHeaderStyle}>Place</th>
              <th style={tableHeaderStyle}>People</th>
              <th style={tableHeaderStyle}>Date</th>
              <th style={tableHeaderStyle}>Time</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map(item => (
              <tr key={item.id} style={tableRowStyle}>
                <td style={tableCellStyle}>{item.food_place_title}</td>
                <td style={tableCellStyle}>{item.people}</td>
                <td style={tableCellStyle}>{new Date(item.date).toISOString().split("T")[0]}</td>
                <td style={tableCellStyle}>{item.time}</td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>


    </div>
  );
};

// Inline styles for cards and table elements
const cardStyle = {
  flex: 1,
  margin: "10px",
  padding: "20px",
  backgroundColor: "#f9f9f9",
  borderRadius: "10px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  textAlign: "center",
  maxWidth: "calc(50% - 20px)", // Set max width to fit 2 items on small screens
};

const cardTitleStyle = {
  margin: 0,
  fontSize: "16px",
  color: "#555",
};

const cardValueStyle = {
  margin: "10px 0 0",
  fontSize: "24px",
  color: "#0000ff",
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  marginTop: "10px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  '@media (max-width: 430px)': {
    display: "block", 
    whiteSpace: "nowrap",
    // overflowX: "auto", // Ensures horizontal scrolling on smaller screens
    marginLeft: "auto", // Adjust the margin to remove left space
    marginRight: "auto", // Optional: Adjust the margin to balance the layout on small screens
  },
};

const tableHeaderStyle = {
  padding: "10px",
  textAlign: "left",
  backgroundColor: "#0000ff",
  color: "white",
  fontSize: "16px",
};

const tableCellStyle = {
  padding: "10px",
  textAlign: "left",
  fontSize: "14px",
  
};

const tableRowStyle = {
  backgroundColor: "#f9f9f9",
  borderBottom: "1px solid #eee",
};

// Media Queries for Small Devices
const mediaQueries = {
  "@media (max-width: 430px)": {
    tableStyle: {
      display: "block",
      overflowX: "auto",
      whiteSpace: "nowrap",
    },
    tableHeaderStyle: {
      display: "block",
      width: "100%",
      boxSizing: "border-box",
    },
    tableCellStyle: {
      display: "block",
      width: "100%",
      fontSize: "10px",
      boxSizing: "border-box",
    },
    tableRowStyle: {
      display: "block",
      marginBottom: "10px",
    },
    cardStyle: {
      flex: 1,
      margin: "10px",
      padding: "20px",
      maxWidth: "100%", // Remove fixed max width
    },
    container: {
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
};

export default Dashboard;
