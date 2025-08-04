import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Header } from "./SharedComponents";
import "../styles/CheckoutPage.css";

// 1) Define the tax rates map
const PROVINCE_TAX_RATES = {
  ON: 0.13,
  BC: 0.12,
  AB: 0.05,
  MB: 0.12,
  QC: 0.14975,
  SK: 0.11,
  NB: 0.15,
  NS: 0.15,
  PE: 0.15,
  NL: 0.15
};

function CheckoutPage() {
  const location = useLocation();
  const navigate = useNavigate();

  // Data from CarConfigurator
  // Data from Cart → Checkout
  const {
    vehicles = [],
    taxAmount: initialTaxAmount = "0.00",
    total: initialTotal = "0.00",
    promoCode: initialPromoCode = ""
  } = location.state || {};

  console.log("CheckoutPage vehicles from location.state:", vehicles);



  // Contact & Shipping fields (required fields marked with *)
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [province, setProvince] = useState("");
  const [mobile, setMobile] = useState("");

  // Delivery Option
  const [shippingOption, setShippingOption] = useState("standard");
  const shippingCost = shippingOption === "premium" ? 9.99 : 4.99;

  // Compute tax & total dynamically
  const subtotal = vehicles.reduce((sum, v) => sum + (v.price * v.quantity), 0);
  const currentTaxRate = PROVINCE_TAX_RATES[province] || 0;
  const taxAmount = (subtotal * currentTaxRate).toFixed(2);
  const total = (subtotal + shippingCost + parseFloat(taxAmount)).toFixed(2);


  // Promo code (optional)
  const [promoCode, setPromoCode] = useState("");

  // Error messages
  const [errors, setErrors] = useState({});

  const handleShippingChange = (e) => {
    setShippingOption(e.target.value);
  };

  const validateFields = () => {
    const newErrors = {};
    if (!email) newErrors.email = "Email is required";
    if (!firstName) newErrors.firstName = "First Name is required";
    if (!lastName) newErrors.lastName = "Last Name is required";
    if (!address) newErrors.address = "Address is required";
    if (!postalCode) newErrors.postalCode = "Postal Code is required";
    if (!city) newErrors.city = "City is required";
    if (!province) newErrors.province = "Province is required";
    if (!mobile) newErrors.mobile = "Mobile Phone is required";
    return newErrors;
  };

  const handleSaveAndContinue = () => {
    const validationErrors = validateFields();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return; // do not proceed
    }
    setErrors({}); // clear errors if validation passes

    alert("Proceeding to Payment Step!");
	
	const vehiclesWithId = vehicles.map(v => ({
	  vehicleId: v.vehicleId, // part of each object in the original cart
	  modelName: v.modelName,
	  color: v.color,
	  tire: v.tire,
	  carImage: v.carImage,
	  price: v.price,
	  quantity: v.quantity || 1
	}));

    // Prepare final data for PaymentPage
    const checkoutData = {
	  vehicles: vehiclesWithId,
      vehicles,
      shippingCost,
      taxAmount,
      total,
      promoCode
    };

    navigate("/payment", { state: checkoutData });
  };


  return (
    <>
      <Header />

      <div className="checkout-scroll-wrapper">
        <div className="checkout-inner">
          <div className="checkout-top-line">
            <h1 className="checkout-title">Checkout</h1>
            <div className="checkout-steps">
              <span>Cart</span>
              <span>&gt;</span>
              <strong>Info &amp; Shipping</strong>
              <span>&gt;</span>
              <span>Payment</span>
              <span>&gt;</span>
              <span>Order Confirmation</span>
            </div>
          </div>

          <hr className="checkout-divider" />

          <div className="checkout-container clearfix">
            {/* LEFT: Contact/Shipping form */}
            <div className="checkout-content">
              <section className="checkout-section">
                <h3>Contact Information</h3>
                <div className="form-row email-row">
                  <label>Email*:</label>
                  <input
                    type="email"
                    placeholder="email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={errors.email ? "error" : ""}
                  />
                  {errors.email && <span className="error-message">{errors.email}</span>}
                </div>

                <div className="form-row half-row">
                  <div>
                    <label>First Name*:</label>
                    <input
                      type="text"
                      placeholder="First Name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className={errors.firstName ? "error" : ""}
                    />
                    {errors.firstName && <span className="error-message">{errors.firstName}</span>}
                  </div>
                  <div>
                    <label>Last Name*:</label>
                    <input
                      type="text"
                      placeholder="Last Name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className={errors.lastName ? "error" : ""}
                    />
                    {errors.lastName && <span className="error-message">{errors.lastName}</span>}
                  </div>
                </div>
              </section>

              <section className="checkout-section">
                <h3>Shipping</h3>
                <div className="form-row half-row">
                  <div>
                    <label>Address*:</label>
                    <input
                      type="text"
                      placeholder="123 Main St"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className={errors.address ? "error" : ""}
                    />
                    {errors.address && <span className="error-message">{errors.address}</span>}
                  </div>
                  <div>
                    <label>Address 2 (optional):</label>
                    <input
                      type="text"
                      placeholder="Apt, Suite, etc."
                      value={address2}
                      onChange={(e) => setAddress2(e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-row half-row">
                  <div>
                    <label>Postal/Zip Code*:</label>
                    <input
                      type="text"
                      placeholder="Postal Code"
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      className={errors.postalCode ? "error" : ""}
                    />
                    {errors.postalCode && <span className="error-message">{errors.postalCode}</span>}
                  </div>
                  <div>
                    <label>City*:</label>
                    <input
                      type="text"
                      placeholder="City"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className={errors.city ? "error" : ""}
                    />
                    {errors.city && <span className="error-message">{errors.city}</span>}
                  </div>
                </div>

                <div className="form-row half-row">
                  <div>
                    <label>State/Province*:</label>
                    <select
                      value={province}
                      onChange={(e) => setProvince(e.target.value)}
                      className={errors.province ? "error" : ""}
                    >
                      <option value="">Select Province</option>
                      <option value="ON">Ontario</option>
                      <option value="BC">British Columbia</option>
                      <option value="AB">Alberta</option>
                      <option value="MB">Manitoba</option>
                      <option value="QC">Quebec</option>
                      <option value="SK">Saskatchewan</option>
                      <option value="NB">New Brunswick</option>
                      <option value="NS">Nova Scotia</option>
                      <option value="PE">Prince Edward Island</option>
                      <option value="NL">Newfoundland and Labrador</option>
                    </select>
                    {errors.province && <span className="error-message">{errors.province}</span>}
                  </div>
                  <div>
                    <label>Mobile Phone*:</label>
                    <input
                      type="text"
                      placeholder="(123) 456-7890"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      className={errors.mobile ? "error" : ""}
                    />
                    {errors.mobile && <span className="error-message">{errors.mobile}</span>}
                  </div>
                </div>
              </section>

              <section className="checkout-section">
                <h3>Delivery Options</h3>
                <div className="delivery-option">
                  <input
                    type="radio"
                    id="standard"
                    name="shippingOption"
                    value="standard"
                    checked={shippingOption === "standard"}
                    onChange={handleShippingChange}
                  />
                  <label htmlFor="standard">
                    Standard Delivery (3-7 days) - $4.99
                  </label>
                  <p className="delivery-desc">
                    Orders will be delivered within 3-7 working days. You’ll receive a confirmation email with a tracking link.
                  </p>
                </div>
                <div className="delivery-option">
                  <input
                    type="radio"
                    id="premium"
                    name="shippingOption"
                    value="premium"
                    checked={shippingOption === "premium"}
                    onChange={handleShippingChange}
                  />
                  <label htmlFor="premium">
                    Premium Delivery (1-3 days) - $9.99
                  </label>
                  <p className="delivery-desc">
                    Faster delivery option. Confirmation email with tracking link included.
                  </p>
                </div>
              </section>

              <button className="save-continue-btn" onClick={handleSaveAndContinue}>
                Save & Continue
              </button>
            </div>

            {/* RIGHT: Your Order box */}
            <div className="order-summary-float">
              <h3>Your Order</h3>
              <div className="order-summary-box">
			  {vehicles.map((v, index) => (
			    <div key={index} style={{ marginBottom: '16px' }}>
			      {v.carImage && (
			        <img
			          src={v.carImage}
			          alt={v.modelName}
			          className="order-car-image"
			        />
			      )}
			      <h4 className="order-car-title">
			        {v.modelName} ({v.color}, {v.tire} tires)
			      </h4>
			      <p>Qty: {v.quantity}</p>
			      <p>Price: ${v.price.toLocaleString()}</p>
			      <hr />
			    </div>
			  ))}


                <div className="promo-code-row">
                  <label>Add a promo code</label>
                  <input
                    type="text"
                    placeholder="Enter code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                  />
                </div>

                <div className="order-line">
                  <span>Subtotal:</span>
				  <span>${vehicles.reduce((sum, v) => sum + (v.price * v.quantity), 0).toLocaleString()}</span>
                </div>
                <div className="order-line">
                  <span>Shipping:</span>
                  <span>${shippingCost.toFixed(2)}</span>
                </div>
                <div className="order-line">
                  <span>Sales Tax:</span>
                  <span>${taxAmount}</span>
                </div>
                <hr />
                <div className="order-line total-line">
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

export default CheckoutPage;