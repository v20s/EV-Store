import React, { useState, useEffect } from "react";
import axios from "axios";
import Chatbot from "../components/Chatbot";

function OrderHistoryPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Custom token parsing function
  const parseJwt = (token) => {
    try {
      // Split the token into its three parts
      const base64Url = token.split('.')[1];
      // Replace URL-safe characters and pad the base64 string
      const base64 = base64Url.replace('-', '+').replace('_', '/')
        .padEnd(base64Url.length + (4 - base64Url.length % 4) % 4, '=');
      
      // Decode the base64 string
      return JSON.parse(window.atob(base64));
    } catch (error) {
      console.error('Error parsing token:', error);
      return null;
    }
  };

  // Retrieve token directly from localStorage
  const token = localStorage.getItem("token");
  
  // Parse the token
  const decodedToken = token ? parseJwt(token) : null;

  useEffect(() => {
    // Extensive debugging logs
    console.log("Order History Page Mounted");
    console.log("Token from localStorage:", token);
    console.log("Token type:", typeof token);
    console.log("Token length:", token ? token.length : "No token");
    
    // Token validation checks
    if (!token) {
      setError("Please log in to view your order history.");
      setLoading(false);
      return;
    }

    // Check token expiration
    if (decodedToken && decodedToken.exp) {
      const currentTime = Math.floor(Date.now() / 1000);
      console.log('Token Expiration:', new Date(decodedToken.exp * 1000));
      console.log('Current Time:', new Date());
      
      if (decodedToken.exp < currentTime) {
        setError("Token has expired. Please log in again.");
        setLoading(false);
        return;
      }
    }

    // Use the API_URL from environment or default
    const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8080/api";

    axios.get(`${API_URL}/orders/my-orders`, {
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }) 
    
    .then((res) => {
      console.log("Orders API Response:", res);
      console.log("Orders fetched successfully:", res.data);
      
      // Additional check for empty data
      if (!res.data || res.data.length === 0) {
        setOrders([]);
      } else {
        setOrders(res.data);
      }
      
      setLoading(false);
    })
    .catch((err) => {
      // Detailed error logging
      console.error("Full error details:", err);
      console.error("Error response:", err.response);
      console.error("Error status:", err.response?.status);
      console.error("Error message:", err.message);
      console.error("Error config:", err.config);
      
      // More informative error message
      if (err.response) {
        // Log full response for debugging
        console.log("Full error response:", err.response);

        if (err.response.status === 401) {
          setError(`Unauthorized. Please log in again. (Details: ${err.response.data?.message || 'No additional info'})`);
        } else if (err.response.status === 403) {
          setError("You do not have permission to view orders.");
        } else {
          setError(`Failed to load orders: ${err.response.data?.message || 'Server error'}`);
        }
      } else if (err.request) {
        // The request was made but no response was received
        setError("No response from server. Please check your network connection.");
      } else {
        // Something happened in setting up the request that triggered an Error
        setError("Error setting up the request. Please try again.");
      }
      setLoading(false);
    });
  }, [token]);

  // Render methods remain the same as in previous version
  if (loading) {
    return (
      <div style={styles.container}>
        <h2>Order History</h2>
        <hr />
        <p>Loading your orders...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.container}>
        <h2>Order History</h2>
        <hr />
        <p style={{ color: "red" }}>{error}</p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div style={styles.container}>
        <h2>Order History</h2>
        <hr />
        <p>You have not placed any orders yet.</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h2>Order History</h2>
      <hr />
      {orders.map((order) => (
        <div key={order.orderId} style={styles.orderCard}>
          <h3>Order #{order.orderId}</h3>
          <p>Status: {order.orderStatus}</p>
          <p>Payment Method: {order.paymentMethod}</p>
          <p>Total Amount: ${order.totalAmount?.toLocaleString()}</p>

          <div style={styles.itemsContainer}>
            <h4>Items:</h4>
            {order.items && order.items.length > 0 ? (
              order.items.map((item, idx) => (
                <div key={idx} style={styles.itemRow}>
                  <p>
                    Vehicle ID: {item.vehicleId} &nbsp;|&nbsp; 
                    Price: ${item.price} &nbsp;|&nbsp; 
                    Qty: {item.quantity}
                  </p>
                  <p>Customizations: {item.customizations}</p>
                </div>
              ))
            ) : (
              <p>No items in this order.</p>
            )}
          </div>
        </div>
      ))}
      {/* RENDER CHATBOT */}
        <Chatbot />
    </div>
  );
}

export default OrderHistoryPage;

const styles = {
  container: {
    maxWidth: "1000px",
    margin: "20px auto",
    padding: "0 15px",
  },
  orderCard: {
    border: "1px solid #ccc",
    borderRadius: "6px",
    padding: "15px",
    marginBottom: "20px",
    backgroundColor: "#fff",
  },
  itemsContainer: {
    marginTop: "10px",
    paddingLeft: "15px",
    borderLeft: "2px solid #ddd",
  },
  itemRow: {
    marginBottom: "10px",
  },
};