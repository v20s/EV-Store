import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/style.css";

const VehicleFilter = () => {
  const [vehicles, setVehicles] = useState([]);
  const [error, setError] = useState(null); // State for error handling

  // Initial filter state
  const initialFilters = {
    name: "", // Maps to 'type' in UI
    brand: "", // Maps to 'model' in UI
    model: "", // Maps to 'model' in UI
    trim: "",
    wheels: "",
    shape: "",
    interiorColor: "", // Maps to 'interior' in UI
    seatLayout: "", // Maps to 'seat_layout' in UI
    performanceUpgrade: false,
    towHitch: false,
    hotDeal: null,
    price: "",
    modelYear: "",
    mileage: "",
    imageUrl: "",
  };

  const [selectedSort, setSelectedSort] = useState("Price : low to high");
  const [filters, setFilters] = useState(initialFilters); // Set initial filters

  const sortingOptions = [
    "Price : low to high",
    "Price : high to low",
    "Mileage : low to high",
    "Mileage : high to low",
  ];

  // Track which dropdown is open
  const [openDropdowns, setOpenDropdowns] = useState({});

  // List of models
  const models = ["Model S", "Model X", "Model 3"];
  // List of payments
  const payments = ["Cash", "Finance"];
  // List of trims
  const trims = ["Performance All-Wheel Drive", "Long Range All-Wheel Drive", "Long Range Rear-Wheel Drive"];
  // List of paints
  const paintOptions = [
    { name: "White", img: "/assets/White.png" },
    { name: "Black", img: "/assets/Black.png" },
    { name: "Blue", img: "/assets/Blue.png" },
    { name: "Dark Gray", img: "/assets/Cream.png" },
    { name: "Silver", img: "/assets/Silver.png" },
    { name: "Red", img: "/assets/Red.png" },
  ];
  // List of wheels
  const wheelsOptions = ["Standard", "Premium"];
  // List of interior
  const interiorOptions = [
    { name: "White", img: "/assets/White.png" },
    { name: "Black", img: "/assets/Black.png" },
  ];

  // Function to handle sorting based on selected sort option
  const sortVehicles = (vehicles, sortOption) => {
    let sortedVehicles = [...vehicles];

    switch (sortOption) {
      case "Price : low to high":
        sortedVehicles.sort((a, b) => a.price - b.price);
        break;
      case "Price : high to low":
        sortedVehicles.sort((a, b) => b.price - a.price);
        break;
      case "Mileage : low to high":
        sortedVehicles.sort((a, b) => a.mileage - b.mileage);
        break;
      case "Mileage : high to low":
        sortedVehicles.sort((a, b) => b.mileage - a.mileage);
        break;
      default:
        break;
    }

    return sortedVehicles;
  };

  // Fetch vehicle data and apply sorting
  const fetchVehicles = async (filters) => {
    try {
      console.log("Sending filters:", filters);
      const { data } = await axios.get("http://localhost:8080/api/product/filter", {
        params: filters,
      });
      console.log("Filtered vehicles:", data);

      // Sort the vehicles based on the selected sort option before updating the state
      const sortedData = sortVehicles([...data], selectedSort);
      setVehicles(sortedData); // Update state with sorted vehicles
      setError(null); // Clear any previous errors
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to fetch vehicles. Please try again later.");
      setVehicles([]); // Clear vehicles on error
    }
  };

  // Fetch vehicle data when filters change
  useEffect(() => {
    fetchVehicles(filters);
  }, [filters]);

  // Apply sorting when the selectedSort option changes
  useEffect(() => {
    setVehicles((prevVehicles) => sortVehicles([...prevVehicles], selectedSort));
  }, [selectedSort]);

  // Handle filter change
  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Toggle the dropdown
  const toggleDropdown = (dropdown) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [dropdown]: !prev[dropdown], // Toggle the state of the clicked dropdown
    }));
  };

  // Reset filters to initial state
  const resetFilters = () => {
    setFilters(initialFilters);
  };

  return (
    <div>
      <div className="filter-header">
        <h2>Vehicle Search Filter</h2>
        <div className="sort-dropdown">
          <button className="sort-button">
            {selectedSort} <span className="arrow">▼</span>
          </button>
          <ul className="sort-options">
            {sortingOptions.map((option) => (
              <li
                key={option}
                className={option === selectedSort ? "selected" : ""}
                onClick={() => setSelectedSort(option)}
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="filter-container">
        {/* Filters Section */}
        <div className="filters">
          {/* Type Toggle (New / Used) */}
          <div className="toggle-container">
            <button
              className={filters.name === "New" ? "active" : ""}
              onClick={() => setFilters({ ...filters, name: "New" })}
            >
              New
            </button>
            <button
              className={filters.name === "Used" ? "active" : ""}
              onClick={() => setFilters({ ...filters, name: "Used" })}
            >
              Used
            </button>
          </div>

          {/* Model Dropdown */}
          <div className="dropdown">
            <div
              className="dropdown-header"
              onClick={() => toggleDropdown("model")}
            >
              <span>Model</span>
              <span className="arrow">{openDropdowns["model"] ? "▲" : "▼"}</span>
            </div>

            {openDropdowns["model"] && (
              <div className="dropdown-content">
                {models.map((model) => (
                  <label key={model} className="radio-option">
                    <input
                      type="radio"
                      name="model"
                      value={model}
                      checked={filters.model === model}
                      onChange={handleFilterChange}
                    />
                    <span className={filters.model === model ? "selected" : ""}>
                      {model}
                    </span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Payment Dropdown */}
          <div className="dropdown">
            <div
              className="dropdown-header"
              onClick={() => toggleDropdown("payment")}
            >
              <span>Payment</span>
              <span className="arrow">{openDropdowns["payment"] ? "▲" : "▼"}</span>
            </div>

            {openDropdowns["payment"] && (
              <div className="dropdown-content">
                {payments.map((option) => (
                  <label key={option} className="radio-option">
                    <input
                      type="radio"
                      name="payment"
                      value={option}
                      checked={filters.payment === option}
                      onChange={handleFilterChange}
                    />
                    <span className={filters.payment === option ? "selected" : ""}>
                      {option}
                    </span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Trim Dropdown */}
          <div className="dropdown">
            <div
              className="dropdown-header"
              onClick={() => toggleDropdown("trim")}
            >
              <span>Trim</span>
              <span className="arrow">{openDropdowns["trim"] ? "▲" : "▼"}</span>
            </div>

            {openDropdowns["trim"] && (
              <div className="dropdown-content">
                {trims.map((option) => (
                  <label key={option} className="radio-option">
                    <input
                      type="radio"
                      name="trim"
                      value={option}
                      checked={filters.trim === option}
                      onChange={handleFilterChange}
                    />
                    <span className={filters.trim === option ? "selected" : ""}>
                      {option}
                    </span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Paint Dropdown */}
          <div className="dropdown">
            <div className="dropdown-header" onClick={() => toggleDropdown("paint")}>
              <span>Paint</span>
              <span className="arrow">{openDropdowns["paint"] ? "▲" : "▼"}</span>
            </div>

            {openDropdowns["paint"] && (
              <div className="dropdown-content paint-options">
                {paintOptions.map((option) => (
                  <label key={option.name} className="paint-option">
                    <input
                      type="radio"
                      name="paint"
                      value={option.name}
                      checked={filters.paint === option.name}
                      onChange={handleFilterChange}
                    />
                    <span
                      className={`paint-circle ${filters.paint === option.name ? "selected" : ""}`}
                      style={{ backgroundImage: `url(${option.img})` }}
                    ></span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Wheel Dropdown */}
          <div className="dropdown">
            <div
              className="dropdown-header"
              onClick={() => toggleDropdown("wheels")}
            >
              <span>Wheels</span>
              <span className="arrow">{openDropdowns["wheels"] ? "▲" : "▼"}</span>
            </div>

            {openDropdowns["wheels"] && (
              <div className="dropdown-content">
                {wheelsOptions.map((option) => (
                  <label key={option} className="radio-option">
                    <input
                      type="radio"
                      name="wheels"
                      value={option}
                      checked={filters.wheels === option}
                      onChange={handleFilterChange}
                    />
                    <span className={filters.wheels === option ? "selected" : ""}>
                      {option}
                    </span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Interior Dropdown */}
          <div className="dropdown">
            <div className="dropdown-header" onClick={() => toggleDropdown("interior")}>
              <span>Interior</span>
              <span className="arrow">{openDropdowns["interior"] ? "▲" : "▼"}</span>
            </div>

            {openDropdowns["interior"] && (
              <div className="dropdown-content paint-options">
                {interiorOptions.map((option) => (
                  <label key={option.name} className="paint-option">
                    <input
                      type="radio"
                      name="interiorColor"
                      value={option.name}
                      checked={filters.interiorColor === option.name}
                      onChange={handleFilterChange}
                    />
                    <span
                      className={`paint-circle ${filters.interiorColor === option.name ? "selected" : ""}`}
                      style={{ backgroundImage: `url(${option.img})` }}
                    ></span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Hot Deal Button */}
          <div>
            <button
              className={`hot-deal-button ${filters.hotDeal ? "active" : ""}`}
              onClick={() => setFilters({ ...filters, hotDeal: !filters.hotDeal })}
            >
              Hot Deal
            </button>
          </div>

          {/* Reset Filters Button */}
          <button className="reset-filters" onClick={resetFilters}>
            Reset Filters
          </button>
        </div>

        {/* Display Filtered Vehicles */}
        <div className="vehicles-list">
          {error ? (
            <p className="error-message">{error}</p>
          ) : vehicles.length > 0 ? (
            <div className="vehicle-grid">
              {vehicles.map((vehicle) => (
                <div key={vehicle.id} className="vehicle-card">
                  <img src={vehicle.imageUrl} alt={vehicle.model} className="vehicle-image" />
                  <div className="vehicle-info">
                    <h4>{vehicle.model}</h4>
                    <div className="vehicle-details">
                      <p>{vehicle.trim}</p>
                      <p>
                        Est ${vehicle.price.toLocaleString()} /mo financing • ${vehicle.price.toLocaleString()}
                      </p>
                      <p>{vehicle.name} Vehicle</p>
                      <p>{vehicle.mileage} km Range (EPA)</p>
                      <div className="vehicle-features">
                        <span>Paint: {vehicle.exteriorColor}</span><br />
                        <span>Wheel: {vehicle.wheels}</span><br />
                        <span>Interior: {vehicle.interiorColor}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No vehicles match your criteria.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default VehicleFilter;