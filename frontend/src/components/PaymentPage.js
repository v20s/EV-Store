import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Header } from "./SharedComponents";
import "../styles/PaymentPage.css";

// Example placeholders for Visa / MasterCard icons
const VISA_ICON = "https://brandlogos.net/wp-content/uploads/2016/11/visa-logo-preview-400x400.png";
const MASTERCARD_ICON = "https://thumbs.dreamstime.com/b/web-141701054.jpg";


function PaymentPage() {
	/* eslint-disable no-restricted-globals */
  const location = useLocation();
  const navigate = useNavigate();

// Data passed from Checkout
const {
  vehicles = [],
  shippingCost = 0,
  taxAmount = "0.00",
  total = "0.00",
} = location.state || {};

const subtotal = vehicles.reduce((sum, v) => sum + (v.price * v.quantity), 0);









  // 1) Payment method: "visa" or "mastercard"
  const [paymentMethod, setPaymentMethod] = useState("visa");

  // 2) Card info (required)
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiration, setExpiration] = useState("");
  const [securityCode, setSecurityCode] = useState("");

  // 3) Billing address checkbox
  const [billingSameAsShipping, setBillingSameAsShipping] = useState(true);

  // If not same, we show a small billing address form (all fields required if shown)
  const [billingAddress, setBillingAddress] = useState("");
  const [billingAddress2, setBillingAddress2] = useState("");
  const [billingCity, setBillingCity] = useState("");
  const [billingPostal, setBillingPostal] = useState("");
  const [billingProvince, setBillingProvince] = useState("");

  // State for card errors
  const [cardErrors, setCardErrors] = useState({});

  const handlePaymentMethod = (method) => {
    setPaymentMethod(method);
  };

  // Validate required card fields (and billing address if needed)
  const validateCardFields = () => {
    const errors = {};
    if (!cardNumber) errors.cardNumber = "Card Number is required";
    if (!cardName) errors.cardName = "Name on card is required";
    if (!expiration) errors.expiration = "Expiration date is required";
    if (!securityCode) errors.securityCode = "Security code is required";

    // If billing address is not same, validate billing fields
    if (!billingSameAsShipping) {
      if (!billingAddress) errors.billingAddress = "Billing address is required";
      if (!billingPostal) errors.billingPostal = "Billing Postal Code is required";
      if (!billingCity) errors.billingCity = "Billing City is required";
      if (!billingProvince) errors.billingProvince = "Billing Province is required";
    }
    return errors;
  };

  const handleContinue = async () => {
    const errors = validateCardFields();
    if (Object.keys(errors).length > 0) {
      setCardErrors(errors);
      return;
    }
    setCardErrors({});

    try {
      const token = localStorage.getItem("token");
	  
	  const formattedItems = vehicles.map((v) => ({
	       vehicleId: v.vehicleId || v.id, // this MUST be present
	       quantity: v.quantity || 1,
	       price: v.price,
	       customizations: {
	         modelName: v.modelName,
	         color: v.color,
	         tire: v.tire,
	       }
	     }));
		 

      // Perform backend checkout
	  
	  console.log("Sending checkout request:", {
	    finalTotal: total,
	    taxAmount,
	    shippingCost,
	    items: formattedItems,
	  });

	  formattedItems.forEach((item, i) => {
	    console.log(`Formatted item ${i}:`, item);
	  });

      await fetch("http://localhost:8080/api/cart/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
			
          finalTotal: total,
          taxAmount,
          shippingCost,
		  items:formattedItems
        })
      });

      // Define this before using it
	  const paymentData = {
	    modelName: vehicles[0]?.modelName || "Unknown Model",
	    color: vehicles[0]?.color || "N/A",
	    tire: vehicles[0]?.tire || "N/A",
	    carImage: vehicles[0]?.carImage || null,
	    finalPrice: vehicles[0]?.price || 0,
	    shippingCost,
	    taxAmount,
	    total,
	  };


      // Navigate to Order Confirmation
      navigate("/order-confirmation", { state: paymentData });

    } catch (error) {
      console.error("Checkout failed:", error);
      alert("Something went wrong during checkout. Please try again.");
    }
  };



  return (
    <>
      <Header />

      <div className="payment-scroll-wrapper">
        <div className="payment-inner">
          {/* Top line with Payment & steps */}
          <div className="payment-top-line">
            <h1 className="payment-title">Payment</h1>
            <div className="payment-steps">
              <span>Cart</span>
              <span>&gt;</span>
              <span>Info &amp; Shipping</span>
              <span>&gt;</span>
              <strong>Payment</strong>
              <span>&gt;</span>
              <span>Order Confirmation</span>
            </div>
          </div>

          <hr className="payment-divider" />

          <div className="payment-container clearfix">
            {/* LEFT: Payment details */}
            <div className="payment-content">
              <section className="payment-section">
                <h3>Choose a payment method</h3>
                <div className="payment-methods">
                  {/* MasterCard box */}
                  <div
                    className={`method-box ${paymentMethod === "mastercard" ? "selected" : ""}`}
                    onClick={() => handlePaymentMethod("mastercard")}
                  >
                    <img src={MASTERCARD_ICON} alt="MasterCard" />
                    <span></span>
                  </div>
                  {/* Visa box */}
                  <div
                    className={`method-box ${paymentMethod === "visa" ? "selected" : ""}`}
                    onClick={() => handlePaymentMethod("visa")}
                  >
                    <img src={VISA_ICON} alt="Visa" />
                    <span></span>
                  </div>
                </div>
              </section>

              <section className="payment-section">
                <h3>Card Information</h3>
                <div className="form-row">
                  <label>Card Number*</label>
                  <input
                    type="text"
                    placeholder="xxxx xxxx xxxx xxxx"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className={cardErrors.cardNumber ? "error" : ""}
                  />
                  {cardErrors.cardNumber && (
                    <span className="error-message">{cardErrors.cardNumber}</span>
                  )}
                </div>
                <div className="form-row">
                  <label>Name on card*</label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    className={cardErrors.cardName ? "error" : ""}
                  />
                  {cardErrors.cardName && (
                    <span className="error-message">{cardErrors.cardName}</span>
                  )}
                </div>
                <div className="form-row half-row">
                  <div>
                    <label>Expiration*</label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      value={expiration}
                      onChange={(e) => setExpiration(e.target.value)}
                      className={cardErrors.expiration ? "error" : ""}
                    />
                    {cardErrors.expiration && (
                      <span className="error-message">{cardErrors.expiration}</span>
                    )}
                  </div>
                  <div>
                    <label>Security Code*</label>
                    <input
                      type="text"
                      placeholder="123"
                      value={securityCode}
                      onChange={(e) => setSecurityCode(e.target.value)}
                      className={cardErrors.securityCode ? "error" : ""}
                    />
                    {cardErrors.securityCode && (
                      <span className="error-message">{cardErrors.securityCode}</span>
                    )}
                  </div>
                </div>
              </section>

              <section className="payment-section">
                <label className="billing-checkbox">
                  <input
                    type="checkbox"
                    checked={billingSameAsShipping}
                    onChange={() => setBillingSameAsShipping(!billingSameAsShipping)}
                  />
                  Billing address same as shipping
                </label>

                {!billingSameAsShipping && (
                  <div className="billing-address-fields">
                    <h4>Billing Address</h4>
                    <div className="form-row half-row">
                      <div>
                        <label>Address*</label>
                        <input
                          type="text"
                          placeholder="123 Billing St"
                          value={billingAddress}
                          onChange={(e) => setBillingAddress(e.target.value)}
                          className={cardErrors.billingAddress ? "error" : ""}
                        />
                        {cardErrors.billingAddress && (
                          <span className="error-message">{cardErrors.billingAddress}</span>
                        )}
                      </div>
                      <div>
                        <label>Address 2 (optional)</label>
                        <input
                          type="text"
                          placeholder="Apt, Suite, etc."
                          value={billingAddress2}
                          onChange={(e) => setBillingAddress2(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="form-row half-row">
                      <div>
                        <label>Postal/Zip Code*</label>
                        <input
                          type="text"
                          placeholder="Postal Code"
                          value={billingPostal}
                          onChange={(e) => setBillingPostal(e.target.value)}
                          className={cardErrors.billingPostal ? "error" : ""}
                        />
                        {cardErrors.billingPostal && (
                          <span className="error-message">{cardErrors.billingPostal}</span>
                        )}
                      </div>
                      <div>
                        <label>City*</label>
                        <input
                          type="text"
                          placeholder="City"
                          value={billingCity}
                          onChange={(e) => setBillingCity(e.target.value)}
                          className={cardErrors.billingCity ? "error" : ""}
                        />
                        {cardErrors.billingCity && (
                          <span className="error-message">{cardErrors.billingCity}</span>
                        )}
                      </div>
                    </div>
                    <div className="form-row">
                      <label>State/Province*</label>
                      <input
                        type="text"
                        placeholder="Province/State"
                        value={billingProvince}
                        onChange={(e) => setBillingProvince(e.target.value)}
                        className={cardErrors.billingProvince ? "error" : ""}
                      />
                      {cardErrors.billingProvince && (
                        <span className="error-message">{cardErrors.billingProvince}</span>
                      )}
                    </div>
                  </div>
                )}
              </section>

              <button className="continue-btn" onClick={handleContinue}>
                Order Now
              </button>
            </div>

            {/* RIGHT: Order summary */}
            <div className="payment-summary-float">
              <h3>Your Order</h3>
              <div className="payment-summary-box">
			  {vehicles.map((v, index) => (
			    <div key={index} style={{ marginBottom: '16px' }}>
			      {v.carImage && (
			        <img
			          src={v.carImage}
			          alt={v.modelName}
			          className="payment-car-image"
			        />
			      )}
			      <h4 className="payment-car-title">
			        {v.modelName} ({v.color}, {v.tire} tires)
			      </h4>
			      <p>Qty: {v.quantity}</p>
			      <p>Price: ${v.price.toLocaleString()}</p>
			      <hr />
			    </div>
			  ))}


                <div className="payment-line">
                  <span>Subtotal:</span>
				  <span>${subtotal.toLocaleString()}</span>

                </div>
                <div className="payment-line">
                  <span>Shipping:</span>
                  <span>${shippingCost.toFixed(2)}</span>
                </div>
                <div className="payment-line">
                  <span>Sales Tax:</span>
                  <span>${taxAmount}</span>
                </div>
                <hr />
                <div className="payment-line total-line">
                  <span>Total</span>
                  <span>${total}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PaymentPage;