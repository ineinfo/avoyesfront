"use client";

import { fetchUserDetails } from "@/utils/api/CommonApi";
import React, { useEffect, useState } from "react";
import LoadingSpinner from "../Loading";
import { getOrder, getWishlist } from "@/utils/api/CheckoutApi";

const Dashboard = () => {
  const [user, setUser] = useState();
  const [orders, setOrders] = useState([])
  const [wishlist, setWishlist] = useState([])
  const [showAll, setShowAll] = useState(false);
  useEffect(() => {
    const fetchuser = async () => {
      try {
        const loggedUser = await fetchUserDetails();
        setUser(loggedUser);
      } catch (error) {
        console.log("error", error)
      }
    };

    const fetchorder = async () => {
      try {
        const res = await getOrder()
        setOrders(res)
      } catch (error) {
        console.log("error", error)
      }
    }

    const fetchwishlist = async () => {
      try {
        const res = await getWishlist()
        setWishlist(res)
      } catch (error) {
        console.log("error", error)
      }
    }

    fetchorder()
    fetchuser();
    fetchwishlist()
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
        marginTop: "-20px"
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
        }}
      >
        <div style={cardStyle}>
          <h2 style={cardTitleStyle}>Total Orders</h2>
          <h3 style={cardValueStyle}>{orders.length}</h3>
        </div>
        <div style={cardStyle}>
          <h2 style={cardTitleStyle}>Total Spending</h2>
          <h3 style={cardValueStyle}>{formatCurrency(orders.reduce((acc, item) => acc + (item.final_amount || 0), 0))}
          </h3>
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
            Your Wishlist Products
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
              <th style={tableHeaderStyle}>Category</th>
            </tr>
          </thead>
          <tbody>
            <tr style={tableRowStyle}>
              <td style={tableCellStyle}>Smartphone A</td>
              <td style={tableCellStyle}>$700</td>
              <td style={tableCellStyle}>Electronics</td>
            </tr>
            <tr style={tableRowStyle}>
              <td style={tableCellStyle}>T-shirt</td>
              <td style={tableCellStyle}>$25</td>
              <td style={tableCellStyle}>Clothing</td>
            </tr>
            <tr style={tableRowStyle}>
              <td style={tableCellStyle}>Coffee Maker</td>
              <td style={tableCellStyle}>$120</td>
              <td style={tableCellStyle}>Home Appliances</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Inline styles for cards and table elements
const cardStyle = {
  flex: 1,
  margin: "0 10px",
  padding: "20px",
  backgroundColor: "#f9f9f9",
  borderRadius: "10px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  textAlign: "center",
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
  fontSize: "15px",
};

const tableRowStyle = {
  backgroundColor: "#f9f9f9",
  borderBottom: "1px solid #eee",
};

export default Dashboard;
