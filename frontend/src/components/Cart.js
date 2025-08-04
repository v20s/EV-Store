import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import { CheckoutButton } from "./SharedComponents";
import "../styles/Cart.css";
import Chatbot from "../components/Chatbot";

const Cart = () => {
  const [cart, setCart] = useState({ items: [] });
  const [totalAmount, setTotalAmount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      alert("Please log in to view your cart.");
      navigate("/login");
      return;
    }
    fetchCart();
    fetchUserId();
  }, [token]);

  const fetchUserId = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/users/id", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUserId(response.data.user_id);
    } catch (error) {
      console.error("Error fetching user ID:", error);
      if (error.response && error.response.status === 401) {
        navigate("/login");
      }
    }
  };

  const fetchCart = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("http://localhost:8080/api/cart/my-cart", {
        headers: { Authorization: `Bearer ${token}` },
      });

      let total = 0;
      if (data.items && data.items.length > 0) {
        // Fetch vehicle details in parallel
        const vehiclePromises = data.items.map((item) =>
          axios.get(`http://localhost:8080/api/vehicles/${item.vehicleId}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
        );
        const vehicleResponses = await Promise.all(vehiclePromises);

        vehicleResponses.forEach((res, index) => {
          const vehicle = res.data;
          data.items[index].vehicle = vehicle;
          total += data.items[index].price * data.items[index].quantity;
        });
      }

      setCart(data);
      setTotalAmount(total);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching cart:", error);
      setLoading(false);
      if (error.response && error.response.status === 401) {
        navigate("/login");
      }
    }
  };

  const handleRemoveItem = async (cartItemId) => {
    try {
      await axios.delete(`http://localhost:8080/api/cart/remove-item/${cartItemId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchCart();
    } catch (error) {
      console.error("Error removing item:", error);
      if (error.response && error.response.status === 401) {
        navigate("/login");
      }
    }
  };

  const handleClearCart = async () => {
    try {
      await axios.delete("http://localhost:8080/api/cart/clear", {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchCart();
    } catch (error) {
      console.error("Error clearing cart:", error);
      if (error.response && error.response.status === 401) {
        navigate("/login");
      }
    }
  };

  if (loading) {
    return (
      <div className="loading-cart">
        <h5>Loading your cart...</h5>
      </div>
    );
  }

  return (
    <div className="cart-scroll-wrapper">
      <div className="cart-inner">
        {/* Top line: big title + steps */}
        <div className="cart-top-line">
          <h1 className="cart-title">Cart</h1>
          <div className="cart-steps">
            <strong>Cart</strong>
            <span>&gt;</span>
            <span>Info &amp; Shipping</span>
            <span>&gt;</span>
            <span>Payment</span>
            <span>&gt;</span>
            <span>Order Confirmation</span>
          </div>
        </div>

        <hr className="cart-divider" />

        <div className="cart-container clearfix">
          {/* If empty */}
          {cart.items.length === 0 ? (
            <div className="empty-cart">
              <h2>Your cart is empty</h2>
              <button onClick={() => navigate("/vehiclefilter")}>Continue Shopping</button>
            </div>
          ) : (
            <>
              {/* LEFT: Cart items */}
              <div className="cart-content">
                {cart.items.map((item, index) => (
                  <div className="cart-item" key={index}>
                    {/* Vehicle image */}
                    {item.customizations && item.customizations.finalImage ? (
                      <img
    className="cart-item-image"
    src={item.customizations.finalImage}
    alt={item.vehicle?.model}
  />
) : (
  item.vehicle && item.vehicle.cover_image && (
    <img
      className="cart-item-image"
      src={item.vehicle.cover_image}
      alt={item.vehicle.model}
    />
  )
)}


                    {/* Item details */}
                    <div className="cart-item-details">
                      <h3>
                        {item.vehicle?.model} - {item.vehicle?.trim}
                      </h3>
                      {/* If customizations exist */}
                      {item.customizations && (
                        <div style={{ marginTop: "8px" }}>
                          <strong>Customizations:</strong>
                          {(() => {
                            let custom = item.customizations;
                            if (typeof custom === "string") {
                              try {
                                custom = JSON.parse(custom);
                              } catch (e) {
                                console.error("Failed to parse customizations:", e);
                                custom = {};
                              }
                            }
                            return (
                              <ul style={{ margin: 0, paddingLeft: "20px" }}>
                                {custom.paint && <li>Paint: {custom.paint}</li>}
                                {custom.tire && <li>Tires: {custom.tire}</li>}
                              </ul>
                            );
                          })()}
                        </div>
                      )}
                    </div>

                    {/* Price & quantity & remove */}
                    <div className="cart-item-actions">
                      <p style={{ fontWeight: "bold" }}>
                        ${item.price?.toLocaleString()}
                      </p>
                      <p>Qty: {item.quantity}</p>
                      <button
                        onClick={() => handleRemoveItem(item.cartItemId)}
                        style={{
                          backgroundColor: "transparent",
                          border: "none",
                          color: "red",
                          cursor: "pointer",
                          marginTop: "6px",
                        }}
                      >
                        <DeleteIcon />
                      </button>
                    </div>
                  </div>
                ))}

                {/* Clear + Continue buttons */}
                <div className="cart-buttons">
                  <button
                    style={{ borderColor: "red", color: "red" }}
                    onClick={handleClearCart}
                  >
                    Clear Cart
                  </button>
                  <button onClick={() => navigate("/vehiclefilter")}>
                    Browse More
                  </button>
                </div>
              </div>

              {/* RIGHT: Summary */}
              <div className="cart-summary-float">
                <div className="cart-summary-box">
                  <h3>Order Summary</h3>
                  <div className="cart-line">
                    <span>
                      Subtotal ({cart.items.length} items)
                    </span>
                    <span>${totalAmount.toLocaleString()}</span>
                  </div>
                  <div className="cart-line">
                    <span>Shipping</span>
                    <span>Calculated on next page</span>
                  </div>
                  <hr />
                  <div className="cart-line total-line">
                    <span>Total</span>
                    <span>${totalAmount.toLocaleString()}</span>
                  </div>

                  {/* If you want the "Proceed to Checkout" from SharedComponents */}
                  {userId && <CheckoutButton userId={userId} />}

                  {/* Or a custom "Proceed" button that leads to Info & Shipping */}
                  <button
                    onClick={() => {
                      // Prepare data for /checkout
                      const vehicles = cart.items.map((item) => ({
						vehicleId: item.vehicle?.vehicleId || item.vehicleId,
                        modelName: item.vehicle.model,
                        color: item.customizations?.paint || item.vehicle.paint || "N/A",
                        tire: item.customizations?.tire || item.vehicle.wheels || "N/A",
                        carImage: item.vehicle.cover_image || "",
                        price: item.price || item.vehicle.price,
                        quantity: item.quantity || 1,
                      }));
                      const shippingCost = 4.99;
                      const taxAmount = (totalAmount * 0.13).toFixed(2);
                      const total = (totalAmount * 1.13 + shippingCost).toFixed(2);

                      navigate("/checkout", {
                        state: {
						vehicles,
                          promoCode: "",
                        }
                      });
                      
                    }}
                    style={{ marginTop: "10px" }}
                  >
                    Proceed to Payment
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      {/* RENDER CHATBOT */}
    <Chatbot />
    </div>
  );
};

export default Cart;
