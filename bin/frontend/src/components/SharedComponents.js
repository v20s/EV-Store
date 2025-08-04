import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import RateReviewIcon from "@mui/icons-material/RateReview";

import {
  Box,
  Button,
  ToggleButtonGroup,
  ToggleButton,
  TextField,
  Modal,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import CloseIcon from "@mui/icons-material/Close";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { jwtDecode } from "jwt-decode";
import "../styles/styles2.css";


/* -------------------------------------------
 * 1) Header
 * -------------------------------------------
 */
export function Header() {
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null); // ref to detect outside clicks

  // Decode token (optional)
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);
      } catch (error) {
        console.error("Invalid token", error);
      }
    }
  }, []);

  // Handle outside clicks to close dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  // Toggle the dropdown on icon click
  const handleToggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/"); // redirect to login
  };

  // Personal Info page
  const handlePersonalInfo = () => {
    navigate("/personal-info");
  };

  // Orders page
  const handleOrders = () => {
    navigate("/orders");
  };

  // Home icon → navigate to VehicleFilter
  const handleHomeClick = () => {
    navigate("/vehiclefilter");
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        padding: "0px 0px",
        backgroundColor: "#1976d2",
        color: "#fff",
      }}
    >
      {/* Left side: Home icon (clickable) */}
      <IconButton onClick={handleHomeClick} style={{ color: "#fff" }}>
        <HomeIcon />
      </IconButton>

      <h1
        style={{
          margin: 0,
          fontWeight: 400,
          fontSize: "15px",
          fontFamily: "monospace",
        }}
      >
        EV Store
      </h1>

      {/* Right side: Cart + Profile */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          marginLeft: "auto",
          position: "relative",
          mr: 2,
          gap: 1
        }}
      >
        {/* Cart Icon Button */}
        <IconButton 
          style={{ color: "#fff" }}
          onClick={() => navigate("/cart")}
        >
          <ShoppingCartIcon />
        </IconButton>

        {/* Profile Icon & Dropdown */}
        <Box ref={dropdownRef} sx={{ position: "relative" }}>
          <IconButton style={{ color: "#fff" }} onClick={handleToggleDropdown}>
            <AccountCircleIcon />
          </IconButton>

          {dropdownOpen && (
            <Box className="profile-dropdown">
              <ul>
                <li onClick={handlePersonalInfo}>Personal Information</li>
                <li onClick={handleOrders}>Orders</li>
                <li className="logout-option" onClick={handleLogout}>
                  Logout
                </li>
              </ul>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}

/* -------------------------------------------
 * Personal Info Page (Profile Settings)
 * -------------------------------------------
 */
export function PersonalInfoPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [birthday, setBirthday] = useState("");

  const token = localStorage.getItem("token");

  // Fetch user data on mount
  useEffect(() => {
    if (token) {
      axios
        .get("http://localhost:8080/api/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          const user = res.data;
          // Adjust these fields to match your User model
          setFirstName(user.firstName || "");
          setLastName(user.lastName || "");
          setEmail(user.email || "");
          setPhone(user.phone || "");
          setAddress(user.address || "");
          setBirthday(user.birthday || "");
        })
        .catch((err) => console.error("Error fetching user data:", err));
    }
  }, [token]);

  // Handle saving changes
  const handleSaveChanges = () => {
    if (!token) return;
    const updatedUser = {
      firstName,
      lastName,
      email,
      phone,
      address,
      birthday,
    };
    // Example: PUT or PATCH request to update user
    axios
      .put("http://localhost:8080/api/users/me", updatedUser, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        alert("Profile updated successfully!");
      })
      .catch((err) => {
        console.error("Error updating profile:", err);
      });
  };

  return (
    <div className="profile-settings-page">
      <h2>Profile settings</h2>

      {/* Main container for form fields */}
      <div className="profile-settings-container">
        <div className="form-group">
          <label>First name</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Type"
          />
        </div>
        <div className="form-group">
          <label>Last name</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Type"
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Type"
          />
        </div>
        <div className="form-group">
          <label>Phone</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Type"
          />
        </div>
        <div className="form-group">
          <label>Address</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Type"
          />
        </div>
        <div className="form-group">
          <label>Birthday</label>
          <input
            type="text"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
            placeholder="Type"
          />
        </div>
      </div>

      <Button
        variant="contained"
        sx={{ mt: 2, backgroundColor: "#1976d2" }}
        onClick={handleSaveChanges}
      >
        Save changes
      </Button>

      {/* Optional password & remove-account sections */}
      <div className="profile-extra-sections">
        <div className="password-section">
          <h4>Password</h4>
          <p style={{ fontSize: "13px" }}>
            You can reset or change your password by clicking here
          </p>
          <Button variant="contained" size="small">
            Change
          </Button>
        </div>
        <div className="remove-account-section">
          <h4>Remove account</h4>
          <p style={{ fontSize: "13px" }}>
            Once you delete your account, there is no going back. Please be
            certain.
          </p>
          <Button variant="contained" color="error" size="small">
            Deactivate
          </Button>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------
 * 2) CustomCarousel (main car image carousel)
 * -------------------------------------------
 */
export function CustomCarousel({
  images,
  autoPlayInterval = 3000,
  zoomed,
  toggleZoom,
  openChatbot,
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalSlides = images.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
    }, autoPlayInterval);
    return () => clearInterval(interval);
  }, [autoPlayInterval, totalSlides]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="custom-carousel">
      <div
        className="carousel-track"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image, idx) => (
          <div key={idx} className="carousel-slide">
            <img
              src={image}
              alt={`Slide ${idx}`}
              className={`carousel-image ${zoomed ? "zoomed" : ""}`}
            />
          </div>
        ))}
      </div>
      {/* Chatbot Button */}
      <button className="chatbot-button" onClick={openChatbot}>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv-nit4h0k25e2SUr2iqW-DppyUXRPXijjpQ&s"
          alt="Chatbot Icon"
          style={{ width: "30px", height: "30px" }}
        />
      </button>
      {/* Zoom Button */}
      <button className="zoom-button" onClick={toggleZoom}>
        <img
          src={
            zoomed
              ? "https://w7.pngwing.com/pngs/548/195/png-transparent-button-computer-icons-zoom-lens-zooming-user-interface-button-logo-zooming-user-interface-zoom-out-thumbnail.png"
              : "https://cdn-icons-png.flaticon.com/512/61/61442.png"
          }
          alt="Zoom Icon"
          style={{ width: "20px", height: "20px" }}
        />
      </button>
      {/* Navigation dots */}
      <div className="carousel-dots">
        {images.map((_, i) => (
          <span
            key={i}
            className={`dot ${i === currentIndex ? "active" : ""}`}
            onClick={() => goToSlide(i)}
          />
        ))}
      </div>
    </div>
  );
}

/* -------------------------------------------
 * 3) FeaturesCarousel (for feature details modal)
 * -------------------------------------------
 */
export function FeaturesCarousel({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalSlides = images.length;

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="custom-carousel">
      <div
        className="carousel-track"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((img, idx) => (
          <div key={idx} className="carousel-slide">
            <img src={img} alt={`Feature ${idx}`} className="carousel-image" />
          </div>
        ))}
      </div>
      <div className="carousel-dots">
        {images.map((_, idx) => (
          <span
            key={idx}
            className={`dot ${idx === currentIndex ? "active" : ""}`}
            onClick={() => goToSlide(idx)}
          ></span>
        ))}
      </div>
    </div>
  );
}

/* -------------------------------------------
 * 4) TeslaModal for "Feature details"
 * -------------------------------------------
 */
function TeslaModal({ open, handleClose, featuresImages }) {
  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "60%",
    maxWidth: "800px",
    bgcolor: "#fff",
    border: "none",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.3)",
    outline: "none",
  };

  return (
    <Modal open={open} onClose={handleClose} closeAfterTransition>
      <Box sx={modalStyle}>
        <IconButton
          onClick={handleClose}
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            color: "#000",
            backgroundColor: "#fff",
            border: "1px solid #ccc",
            zIndex: 9999,
          }}
          aria-label="close"
        >
          <CloseIcon />
        </IconButton>

        {/* Now we actually render the images */}
        <Box sx={{ textAlign: "center" }}>
          {featuresImages && featuresImages.length > 1 ? (
            <FeaturesCarousel images={featuresImages} />
          ) : (
            featuresImages &&
            featuresImages.length === 1 && (
              <img
                src={featuresImages[0]}
                alt="Feature details"
                style={{ width: "100%", height: "auto", display: "block" }}
              />
            )
          )}
        </Box>
      </Box>
    </Modal>
  );
}

/* -------------------------------------------
 * 5) Add to Cart and Checkout Buttons
 * -------------------------------------------
 */

export const AddToCartButton = ({  vehicle, userId, customizations, tire, premiumTirePrice }) => {
	const safeVehicle = vehicle && typeof vehicle === "object" ? vehicle : { vehicleId: 10, price: 0 };
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const navigate = useNavigate();

  const handleAddToCart = async () => {
    try {
      console.log("Vehicle being added:", vehicle);
      
      // Check if vehicle is defined
      if (!vehicle) {
        console.error("Vehicle object is undefined");
        setSnackbarMessage("Error: Vehicle information is missing.");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
        return;
      }
      
	  const basePrice = safeVehicle.price || 0;
	  const finalPrice = tire === "premium" ? basePrice + premiumTirePrice : basePrice;

      // Use vehicle.vehicleId or fallback to a default if needed
      const vehicleId = vehicle.vehicleId || 10; // Using 7 as fallback
      console.log("Vehicle ID being added:", vehicleId);
      
	  const cartItemDTO = {
	         vehicleId: vehicle.vehicleId || 10,
	         quantity: 1,
	         price: finalPrice,
	         customizations: customizations, 
	       };

      // Call the backend to add the item to the cart
	  await axios.post(`http://localhost:8080/api/cart/add`, cartItemDTO, {
	    headers: {
	      "Content-Type": "application/json",
	      "Authorization": `Bearer ${localStorage.getItem("token")}`,
	    },
	  });

      // Show success message
      setSnackbarMessage("Vehicle added to cart successfully!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error adding to cart:", error);
      setSnackbarMessage("Failed to add vehicle to cart. Please try again.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddShoppingCartIcon />}
        onClick={handleAddToCart}
      >
        Add to Cart
      </Button>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={5000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export const CheckoutButton = ({
  userId,
  vehicle,
  customizations,
  finalPrice
}) => {
  const navigate = useNavigate();

  const handleCheckout = async () => {
    try {
      // 1) Build the same cartItemDTO as in AddToCartButton
      const cartItemDTO = {
        vehicleId: vehicle.vehicleId || 10, // fallback if needed
        quantity: 1,
        price: finalPrice || 0,
        customizations: customizations, 
      };

      // 2) Add to cart
      await axios.post(`http://localhost:8080/api/cart/add`, cartItemDTO, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      // 3) Navigate to /cart
      navigate("/cart");
    } catch (error) {
      console.error("Error adding vehicle before checkout:", error);
      alert("Failed to add vehicle to cart. Please try again.");
    }
  };

  return (
    <Button
      variant="contained"
      color="secondary"
      startIcon={<ShoppingCartIcon />}
      onClick={handleCheckout}
    >
      Proceed to Checkout
    </Button>
  );
};
  
  /*  A tiny helper to show gold stars based on rating 1-5.  */
function StarRatingDisplay({ rating = 0 }) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <span
        key={i}
        style={{
          color: i <= rating ? "#FFD700" : "#ccc", // Gold star if i <= rating, else gray
          fontSize: "18px",
          marginRight: "2px"
        }}
      >
        ★
      </span>
    );
  }
  return <div style={{ display: "inline-block" }}>{stars}</div>;
}

export function ReviewModal({ open, onClose, vehicleId }) {
  const [reviews, setReviews] = useState([]);
  const [showForm, setShowForm] = useState(false); 
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState("");

  // Fetch reviews whenever the modal opens and we have a valid vehicleId
  useEffect(() => {
    if (open && vehicleId) {
      const token = localStorage.getItem("token");
      if (!token) return;
      axios
        .get(`http://localhost:8080/api/reviews/vehicle/${vehicleId}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        .then((res) => setReviews(res.data))
        .catch((err) => console.error("Error fetching reviews:", err));
    }
  }, [open, vehicleId]);

  // Toggle between "reviews list" and "write a review" form
  const handleToggleForm = () => {
    setShowForm((prev) => !prev);
  };

  // Post the new review, then refresh the list
  const handleSubmitReview = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    if (!reviewText.trim()) return; // skip if empty

    try {
      await axios.post(
        "http://localhost:8080/api/reviews/add",
        { vehicleId, reviewText, rating },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        }
      );
      // Clear the form
      setReviewText("");
      setRating(5);

      // Refresh the review list
      const refreshed = await axios.get(`http://localhost:8080/api/reviews/vehicle/${vehicleId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setReviews(refreshed.data);

      // Return to the list view
      setShowForm(false);
    } catch (err) {
      console.error("Failed to post review:", err);
    }
  };

  // Close the modal (and reset to list view if desired)
  const handleClose = () => {
    setShowForm(false);
    onClose();
  };

  /* A simple MUI style for the outer modal box */
  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    maxWidth: "90%",
    maxHeight: "90vh",
    bgcolor: "#fff",
    borderRadius: 2,
    boxShadow: 24,
    p: 3,
    display: "flex",
    flexDirection: "column"
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={modalStyle}>
        {/* Close button (top-right) */}
        <IconButton
          onClick={handleClose}
          sx={{ position: "absolute", top: 8, right: 8, color: "#000" }}
        >
          <CloseIcon />
        </IconButton>

        {/* If NOT showing the form => display the reviews list */}
        {!showForm && (
          <>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Reviews for Vehicle #{vehicleId}
            </Typography>

            {/* Scrollable container for many reviews */}
            <div
              style={{
                maxHeight: "300px",
                overflowY: "auto",
                border: "1px solid #ccc",
                borderRadius: "4px",
                padding: "8px"
              }}
            >
              {reviews.length > 0 ? (
                reviews.map((r, idx) => (
                  <div key={idx} style={{ marginBottom: "12px" }}>
                    {/* Example "User #X" or if your backend returns a userName, use that */}
                    <div style={{ fontWeight: "bold" }}>
                      {r.userName || `User #${idx + 1}`}
                    </div>
                    {/* Show star rating in gold */}
                    <StarRatingDisplay rating={r.rating} />
                    {/* The text review */}
                    {r.reviewText && (
                      <div style={{ marginTop: "4px" }}>{r.reviewText}</div>
                    )}
                    <hr style={{ margin: "8px 0" }} />
                  </div>
                ))
              ) : (
                <div style={{ color: "#666" }}>No reviews yet.</div>
              )}
            </div>

            {/* Button to open the form */}
            <Button
              variant="contained"
              sx={{ mt: 2, alignSelf: "flex-end" }}
              onClick={handleToggleForm}
            >
              Write a Review
            </Button>
          </>
        )}

        {/* If showing the form => show rating & text fields */}
        {showForm && (
          <>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Write a Review
            </Typography>

            <TextField
              type="number"
              label="Rating (1-5)"
              fullWidth
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              sx={{ mb: 2 }}
              inputProps={{ min: 1, max: 5 }}
            />
            <TextField
              label="Your Review"
              fullWidth
              multiline
              rows={3}
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              sx={{ mb: 2 }}
            />

            {/* Buttons: Cancel or Submit */}
            <Box sx={{ display: "flex", gap: 1, justifyContent: "flex-end" }}>
              <Button variant="outlined" onClick={handleToggleForm}>
                Cancel
              </Button>
              <Button variant="contained" onClick={handleSubmitReview}>
                Submit
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Modal>
  );
}

// Define features for each model
const featuresData = {
  "Three Displays": {
    "Model S": true,
    "Model X": true,
    "Model 3": false,
  },
  "Tri-Zone Climate Controls": {
    "Model S": true,
    "Model X": true,
    "Model 3": false,
  },
  "Yoke Steering": {
    "Model S": true,
    "Model X": true,
    "Model 3": false,
  },
  "22-Speaker Audio": {
    "Model S": true,
    "Model X": true,
    "Model 3": false,
  },
  "Glass Roof": {
    "Model S": true,
    "Model X": false,
    "Model 3": true,
  },
  "Panoramic Windshield": {
    "Model S": false,
    "Model X": true,
    "Model 3": false,
  },
  "Interior Layouts": {
    "Model S": false,
    "Model X": true,
    "Model 3": false,
  },
  "Game from Anywhere": {
    "Model S": false,
    "Model X": true,
    "Model 3": false,
  },
  "All New Interior": {
    "Model S": false,
    "Model X": false,
    "Model 3": true,
  },
  "Dual Displays": {
    "Model S": false,
    "Model X": false,
    "Model 3": true,
  },
  "Studio-Quality Sound": {
    "Model S": false,
    "Model X": false,
    "Model 3": true,
  },
  "Stay Connected": {
    "Model S": false,
    "Model X": false,
    "Model 3": true,
  },
  "Wireless Charger": {
    "Model S": false,
    "Model X": false,
    "Model 3": true,
  },
};

// --------------------------------------------
// CompareVehiclesModal Component
// --------------------------------------------

export function CompareVehiclesModal({ open, onClose }) {
  const [model3, setModel3] = useState(null);
  const [modelS, setModelS] = useState(null);
  const [modelX, setModelX] = useState(null);

  useEffect(() => {
    if (open) {
      axios
        .get("http://localhost:8080/api/vehicles?model=Model 3")
        .then((res) => setModel3(res.data[0]))
        .catch((err) => console.error(err));

      axios
        .get("http://localhost:8080/api/vehicles?model=Model S")
        .then((res) => setModelS(res.data[0]))
        .catch((err) => console.error(err));

      axios
        .get("http://localhost:8080/api/vehicles?model=Model X")
        .then((res) => setModelX(res.data[0]))
        .catch((err) => console.error(err));
    }
  }, [open]);

  // Outer modal box: fixed width/height, so the table can scroll internally
  const modalBoxStyles = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "80%",
    maxWidth: "750px",
    height: "80%",
    bgcolor: "#fff",
    borderRadius: "12px",
    boxShadow: 24,
    outline: "none",
    display: "flex",
    flexDirection: "column",
  };

  // Renders a single row for a feature
  const renderFeatureRow = (featureName) => {
    const renderCell = (model) =>
      featuresData[featureName][model] ? (
        <span className="checkmark">✓</span>
      ) : (
        <span className="dash">–</span>
      );
    return (
      <div className="compare-row" key={featureName}>
        {/* BOLD the feature name */}
        <div className="compare-cell feature-cell bold-text">{featureName}</div>
        <div className="compare-cell bold-text">{renderCell("Model 3")}</div>
        <div className="compare-cell bold-text">{renderCell("Model S")}</div>
        <div className="compare-cell bold-text">{renderCell("Model X")}</div>
      </div>
    );
  };

  return (
    <Modal open={open} onClose={onClose} className="compare-modal-overlay">
      <Box sx={modalBoxStyles} className="compare-modal-container">
        {/* Header */}
        <div className="compare-header-bar">
          <Typography variant="h5" className="compare-title">
            Compare Vehicles
          </Typography>
        </div>

        {/* The scrollable table area */}
        <div className="compare-table-wrapper">
          <div className="compare-table">
            {/* Header row (car headings) */}
            <div className="compare-row compare-table-head">
              <div className="compare-cell feature-cell bold-text">Feature</div>
              <div className="compare-cell bold-text">Model 3</div>
              <div className="compare-cell bold-text">Model S</div>
              <div className="compare-cell bold-text">Model X</div>
            </div>

            {/* Basic Info Rows (only if we have data for all three) */}
            {model3 && modelS && modelX && (
              <>
                <div className="compare-row">
                  <div className="compare-cell feature-cell bold-text">
                    Base Price
                  </div>
                  <div className="compare-cell bold-text">
                    ${model3.price.toLocaleString()}
                  </div>
                  <div className="compare-cell bold-text">
                    ${modelS.price.toLocaleString()}
                  </div>
                  <div className="compare-cell bold-text">
                    ${modelX.price.toLocaleString()}
                  </div>
                </div>
                {model3.range && modelS.range && modelX.range && (
                  <div className="compare-row">
                    <div className="compare-cell feature-cell bold-text">Range</div>
                    <div className="compare-cell bold-text">{model3.range}</div>
                    <div className="compare-cell bold-text">{modelS.range}</div>
                    <div className="compare-cell bold-text">{modelX.range}</div>
                  </div>
                )}
                {model3.topSpeed && modelS.topSpeed && modelX.topSpeed && (
                  <div className="compare-row">
                    <div className="compare-cell feature-cell bold-text">Top Speed</div>
                    <div className="compare-cell bold-text">{model3.topSpeed}</div>
                    <div className="compare-cell bold-text">{modelS.topSpeed}</div>
                    <div className="compare-cell bold-text">{modelX.topSpeed}</div>
                  </div>
                )}
              </>
            )}

            {/* Feature Rows */}
            {Object.keys(featuresData).map((feature) => renderFeatureRow(feature))}
          </div>
        </div>

        {/* Footer with close button */}
        <div className="compare-footer-bar">
          <Button variant="contained" className="close-button" onClick={onClose}>
            Close
          </Button>
        </div>
      </Box>
    </Modal>
  );
}

/* -------------------------------------------
 * 6) CarConfigurator
 * -------------------------------------------
 */
export function CarConfigurator(props) {
  const {
    modelName,
    basePrice,
    stats,
    carImages,
    colorOptions,
    tireOptions,
    premiumTirePrice,
    featuresImages,
    vehicle,
    userId = 17,
  } = props;

  const safeVehicle = vehicle && typeof vehicle === "object" ? vehicle : { vehicleId: 10, price: 0 };

  console.log("CarConfigurator received basePrice:", basePrice, typeof basePrice);
  console.log("Data being passed to CarConfigurator:", {
    modelName,
    basePrice,
    vehicle: vehicle ? vehicle : "null vehicle",
    userId,
  });
  const handleOrders = () => {
    navigate("/orders");
  };  
  const navigate = useNavigate();
  const [zoomed, setZoomed] = useState(false);
  const [color, setColor] = useState(Object.keys(colorOptions)[0] || "black");
  const [tire, setTire] = useState(Object.keys(tireOptions)[0] || "standard");
  const [paymentOption, setPaymentOption] = useState("cash");
  const [vehiclePrice, setVehiclePrice] = useState(basePrice ? Number(basePrice) : 0);
  const [province, setProvince] = useState("ON");
  const [taxes, setTaxes] = useState("13.00");
  const [termMonths, setTermMonths] = useState("60");
  const [interest, setInterest] = useState("5");
  const [downPayment, setDownPayment] = useState("0");
  const [tradeValue, setTradeValue] = useState("0");
  const [monthlyPayment, setMonthlyPayment] = useState(null);
  const [biWeeklyPayment, setBiWeeklyPayment] = useState(null);
  const [weeklyPayment, setWeeklyPayment] = useState(null);
  const [amountFinanced, setAmountFinanced] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  
  // New state for Compare Modal
  const [compareModalOpen, setCompareModalOpen] = useState(false);

  // Update vehiclePrice whenever basePrice changes
  useEffect(() => {
    if (basePrice) {
      setVehiclePrice(Number(basePrice));
    }
  }, [basePrice]);

  // Provincial tax rates
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
    NL: 0.15,
  };

  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);
  const toggleZoom = () => setZoomed((prev) => !prev);

  const handlePaymentToggle = (event, newOption) => {
    if (newOption !== null) setPaymentOption(newOption);
  };

  const handleProvinceChange = (e) => {
    const newProv = e.target.value;
    setProvince(newProv);
    const rateFraction = PROVINCE_TAX_RATES[newProv] || 0;
    setTaxes((rateFraction * 100).toFixed(2));
  };

  const handleCalculate = async () => {
    const payload = {
      vehicle_price: vehiclePrice ? parseFloat(vehiclePrice) : 1.0,
      province: province || "ON",
      term_months: termMonths ? parseInt(termMonths, 10) : 36,
      interest: interest ? parseFloat(interest) : 5.0,
      down_payment: downPayment ? parseFloat(downPayment) : 0.0,
      trade_value: tradeValue ? parseFloat(tradeValue) : 0.0,
    };

    console.log("Loan Payload:", payload);

    try {
      const response = await fetch("http://localhost:8080/api/loan/provinceCalculate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Loan Calculation Response:", data);

      // Update UI with results
      setMonthlyPayment(data.monthly_payment);
      setBiWeeklyPayment(data.bi_weekly_payment);
      setWeeklyPayment(data.weekly_payment);
      setAmountFinanced(data.amount_financed);
    } catch (error) {
      console.error("Loan calculation failed:", error);
    }
  };

  const handleClearForm = () => {
    setVehiclePrice(String(basePrice));
    setProvince("ON");
    setTaxes("13.00");
    setTermMonths("60");
    setInterest("5");
    setDownPayment("0");
    setTradeValue("0");
    setMonthlyPayment(null);
    setBiWeeklyPayment(null);
    setWeeklyPayment(null);
    setAmountFinanced(null);
  };

 // Grab the first image from the chosen color+tire
const finalImage = carImages[color][tire][0];

return (
  <div className="car-configurator-container">
    <div className="car-display-scrollable">
      <CustomCarousel
        images={carImages[color][tire]}
        autoPlayInterval={3000}
        zoomed={zoomed}
        toggleZoom={toggleZoom}
        openChatbot={() => alert("Open Chatbot")}
      />
    </div>

    <div className="customization-panel-sticky">
      <h1 className="model-title">{modelName}</h1>

      <div className="overview">
        <div className="stats">
          <div className="stat">
            <strong>{stats.range}</strong>
            <span>Range (EPA est.)</span>
          </div>
          <div className="stat">
            <strong>{stats.topSpeed}</strong>
            <span>Top Speed</span>
          </div>
          <div className="stat">
            <strong>{stats.zeroTo100}</strong>
            <span>0-100 km/h</span>
          </div>
        </div>
      </div>

      <Box sx={{ mt: 3, mb: 2 }}>
        <Button variant="outlined" onClick={handleModalOpen}>
          Feature Details
        </Button>
      </Box>
      <TeslaModal
        open={modalOpen}
        handleClose={handleModalClose}
        featuresImages={featuresImages}
      />

      <h3>Customizations Available</h3>

      <div className="option-group">
        <label>Exterior Color:</label>
        <div className="color-options">
          {Object.keys(colorOptions).map((col) => (
            <div
              key={col}
              className="option-item"
              onClick={() => setColor(col)}
            >
              <img
                src={colorOptions[col].image}
                alt={col}
                className={`option-circle ${color === col ? "selected" : ""}`}
              />
              <span className="option-label">{colorOptions[col].name}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="option-group">
        <label>Tires:</label>
        <div className="color-options">
          {Object.keys(tireOptions).map((t) => (
            <div
              key={t}
              className="option-item"
              onClick={() => setTire(t)}
            >
              <img
                src={tireOptions[t].image}
                alt={t}
                className={`option-circle ${tire === t ? "selected" : ""}`}
              />
              <span className="option-label">{tireOptions[t].name}</span>
            </div>
          ))}
        </div>
      </div>

      <Box
        sx={{
          border: "1px solid #ccc",
          borderRadius: 2,
          p: 2,
          mb: 2,
          textAlign: "center",
        }}
      >
        <h2 style={{ margin: 0 }}>
          Price: ${Number(vehiclePrice).toLocaleString()}
        </h2>
        <p style={{ margin: 0, color: "#666" }}>
          (Excludes local taxes & fees)
        </p>
      </Box>

      <h3>Payment Options</h3>
      <ToggleButtonGroup
        color="primary"
        value={paymentOption}
        exclusive
        onChange={handlePaymentToggle}
        sx={{ mb: 2 }}
      >
        <ToggleButton value="cash">Cash</ToggleButton>
        <ToggleButton value="finance">Finance</ToggleButton>
      </ToggleButtonGroup>

      {paymentOption === "cash" && (
        <Box sx={{ border: "1px solid #ccc", borderRadius: 2, p: 2 }}>
          <h4>Pay in Full</h4>
          <p style={{ margin: 0 }}>
            <strong>Total:</strong> ${Number(vehiclePrice).toLocaleString()}
          </p>
        </Box>
      )}

      {paymentOption === "finance" && (
        <Box sx={{ border: "1px solid #ccc", borderRadius: 2, p: 2 }}>
          <h4>Loan Calculator</h4>
          <Button
            variant="text"
            sx={{ float: "right", marginTop: "-40px" }}
            onClick={handleClearForm}
          >
            Clear Form
          </Button>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "16px",
              mt: 2,
            }}
          >
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <label>Price of Vehicle*</label>
              <TextField
                type="number"
                variant="outlined"
                size="small"
                value={vehiclePrice}
                onChange={(e) => setVehiclePrice(e.target.value)}
              />
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <label>Term (in months)*</label>
              <TextField
                type="number"
                variant="outlined"
                size="small"
                value={termMonths}
                onChange={(e) => setTermMonths(e.target.value)}
              />
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <label>Province*</label>
              <select
                style={{
                  padding: "8px",
                  fontSize: "14px",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                }}
                value={province}
                onChange={handleProvinceChange}
              >
                <option value="ON">Ontario</option>
                <option value="BC">British Columbia</option>
                <option value="AB">Alberta</option>
                <option value="QC">Quebec</option>
                <option value="MB">Manitoba</option>
                <option value="SK">Saskatchewan</option>
                <option value="NB">New Brunswick</option>
                <option value="NS">Nova Scotia</option>
                <option value="PE">Prince Edward Island</option>
                <option value="NL">Newfoundland and Labrador</option>
              </select>
              <div style={{ marginTop: "6px", fontWeight: "bold" }}>
                Tax: {taxes}%
              </div>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <label>Interest*</label>
              <TextField
                type="number"
                variant="outlined"
                size="small"
                value={interest}
                onChange={(e) => setInterest(e.target.value)}
              />
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <label>Down Payment</label>
              <TextField
                type="number"
                variant="outlined"
                size="small"
                value={downPayment}
                onChange={(e) => setDownPayment(e.target.value)}
              />
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <label>Trade Value</label>
              <TextField
                type="number"
                variant="outlined"
                size="small"
                value={tradeValue}
                onChange={(e) => setTradeValue(e.target.value)}
              />
            </Box>
          </Box>
          <Button
            variant="contained"
            onClick={handleCalculate}
            sx={{ mt: 2, backgroundColor: "#1976d2", color: "#fff" }}
          >
            CALCULATE
          </Button>
          {monthlyPayment !== null && (
            <Box
              sx={{
                backgroundColor: "#f7f7f7",
                padding: "16px",
                mt: 2,
                borderRadius: "6px",
                textAlign: "center",
              }}
            >
              <Box
                sx={{
                  backgroundColor: "#1976d2",
                  color: "#fff",
                  padding: "20px",
                  marginBottom: "15px",
                  borderRadius: "4px",
                }}
              >
                <h3 style={{ margin: 0, fontSize: "28px", fontWeight: 700 }}>
                  ${monthlyPayment.toFixed(2)}
                </h3>
                <span style={{ fontSize: "16px" }}>Monthly Payment</span>
              </Box>
              <Box sx={{ fontSize: "16px", mb: 1 }}>
                <p>
                  <strong>${biWeeklyPayment?.toFixed(2)}</strong> Bi-Weekly
                </p>
                <p>
                  <strong>${weeklyPayment?.toFixed(2)}</strong> Weekly
                </p>
              </Box>
              <p style={{ marginTop: "10px", fontSize: "14px" }}>
                <strong>Amount Financed:</strong> ${amountFinanced?.toFixed(2)}
              </p>
            </Box>
          )}
        </Box>
      )}

      {/* Action Buttons */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 3 }}>
        <Button
          variant="outlined"
          fullWidth
          onClick={() => setCompareModalOpen(true)}
        >
          Compare Vehicles
        </Button>

        <Button
          variant="outlined"
          startIcon={<RateReviewIcon />}
          onClick={() => setReviewModalOpen(true)}
          fullWidth
        >
          Read & Write Reviews
        </Button>
        <ReviewModal
          open={reviewModalOpen}
          onClose={() => setReviewModalOpen(false)}
          vehicleId={safeVehicle.vehicleId || 10}
        />

        <AddToCartButton
          vehicle={safeVehicle}
          userId={userId}
          customizations={{
            paint: colorOptions[color].name,
            tire: tireOptions[tire].name,
            finalImage: finalImage,
          }}
          tire={tire}
          premiumTirePrice={premiumTirePrice}
        />

        <CheckoutButton
          userId={userId}
          vehicle={safeVehicle}
          customizations={{
            paint: colorOptions[color].name,
            tire: tireOptions[tire].name,
            finalImage: finalImage,
          }}
          finalPrice={
            tire === "premium"
              ? (safeVehicle.price || 0) + premiumTirePrice
              : safeVehicle.price || 0
          }
        />
      </Box>
    </div>

    {/* Render the Compare Vehicles Modal */}
    <CompareVehiclesModal open={compareModalOpen} onClose={() => setCompareModalOpen(false)} />
  </div>
);
}