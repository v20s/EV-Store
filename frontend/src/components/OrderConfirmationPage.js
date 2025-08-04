import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/OrderConfirmationPage.css";
import Chatbot from "../components/Chatbot";

function OrderConfirmationPage() {
  const location = useLocation();
  const navigate = useNavigate();

  // Data passed from PaymentPage (if any)
  const {
    modelName = "Unknown Model",
    color = "N/A",
    tire = "N/A",
    finalPrice = 0,
    shippingCost = 0,
    taxAmount = "0.00",
    total = "0.00",
    carImage
  } = location.state || {};

  // Simulate processing delay
  const [processing, setProcessing] = useState(true);

  useEffect(() => {
    // Simulate a 3-second delay for processing
    const timer = setTimeout(() => {
      setProcessing(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleOk = () => {
    navigate("/vehiclefilter");
  };

  return (
    <>
      <div className="confirmation-scroll-wrapper">
        <div className="confirmation-inner">
          {/* Top line with "Order Confirmation" and steps */}
          <div className="confirmation-top-line">
            <h1 className="confirmation-title">Order Confirmation</h1>
            <div className="confirmation-steps">
              <span>Cart</span>
              <span>&gt;</span>
              <span>Info &amp; Shipping</span>
              <span>&gt;</span>
              <span>Payment</span>
              <span>&gt;</span>
              <strong>Confirmation</strong>
            </div>
          </div>
          <hr className="confirmation-divider" />

          {processing ? (
            <div className="confirmation-content">
              <h2>Processing your order...</h2>
              <div className="spinner"></div>
            </div>
          ) : (
            <div className="confirmation-content">
              <h2>Congratulations!</h2>
              <p>Your order has been placed successfully! Check your mails for further information on shipping info and delivery updates.</p>
              {carImage && (
                <img
                  src={carImage}
                  alt="Selected Car"
                  className="confirmation-car-image"
                />
              )}
              <p>Thank you for shopping with us.</p>
              <button className="confirmation-ok-btn" onClick={handleOk}>
                Browse more cars
              </button>
            </div>
          )}
        </div>
        {/* RENDER CHATBOT */}
    <Chatbot />
      </div>
    </>
  );
}

export default OrderConfirmationPage;