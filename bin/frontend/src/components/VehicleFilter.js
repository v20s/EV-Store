import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/style.css"; // Import external CSS
import { useNavigate } from "react-router-dom";

const VehicleFilter = () => {
  const [vehicles, setVehicles] = useState([]);
  const [hoveredVehicleId, setHoveredVehicleId] = useState(null);

  // 1) Remove selectedVehicle state
  // const [selectedVehicle, setSelectedVehicle] = useState(null);

  const initialFilters = {
    type: "New",
    model: "",
    payment: "",
    trim: "",
    paint: "",
    wheels: "",
    interior: "",
    seat_layout: "",
    performance_upgrade: false,
    tow_hitch: false,
    hotDeal: null,
  };

  const [selectedSort, setSelectedSort] = useState("Price : low to high");
  const [filters, setFilters] = useState(initialFilters); // Set initial filters
  const [openDropdowns, setOpenDropdowns] = useState({});
  const navigate = useNavigate();

  const models = ["Model S", "Model X", "Model 3"];
  const payments = ["Cash", "Finance"];
  const trims = [
    "Performance All-Wheel Drive",
    "Long Range All-Wheel Drive",
    "Long Range Rear-Wheel Drive",
  ];

  // Paint options, wheels, interiors, etc. (unchanged)
  const paintOptions = [
    { name: "White", img: "../assets/White.png" },
    { name: "Black", img: "../assets/Black.png" },
    { name: "Blue", img: "../assets/Blue.png" },
    { name: "Dark Gray", img: "../assets/Cream.png" },
    { name: "Silver", img: "../assets/Silver.png" },
    { name: "Red", img: "../assets/Red.png" },
  ];
  const wheelOptions = [
    {
      name: "Standard",
      img: "https://digitalassets.tesla.com/co1n/image/upload/f_auto,q_auto/prod/static_assets/MODELS/UI/ui_swat_whl_tempest.png?&",
    },
    {
      name: "Premium",
      img: "https://digitalassets.tesla.com/co1n/image/upload/f_auto,q_auto/prod/static_assets/MODELS/UI/ui_swat_whl_tempest.png?&",
    },
  ];
  const interiorVehicleOptions = [
    {
      name: "White",
      img: "https://static-assets.tesla.com/configurator/compositor?context=design_studio_2?&bkba_opt=1&view=STUD_SEAT&size=600&model=m3&options=$APBS,$IPW3,$PBSB,$SC04,$MDL3,$W38A,$MT357,$CPF0,$CW03&",
    },
    {
      name: "Black",
      img: "https://static-assets.tesla.com/configurator/compositor?context=design_studio_2?&bkba_opt=1&view=STUD_SEAT&size=600&model=m3&options=$APBS,$IPB4,$PN00,$SC04,$MDL3,$W30P,$MT360,$CPF0&",
    },
  ];

  const getPaintImage = (paintName) => {
    const paint = paintOptions.find((p) => p.name === paintName);
    return paint ? paint.img : "";
  };

  // Sorting function
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

  // 2) Modify handleOrderNow to accept the clicked vehicle
  const handleOrderNow = (vehicle) => {
    if (!vehicle) return;

    let path = "";
    switch (vehicle.model) {
      case "Model S":
        path = "/models";
        break;
      case "Model X":
        path = "/modelx";
        break;
      case "Model 3":
        path = "/model3";
        break;
      default:
        console.error("Unknown model selected");
        return;
    }
    navigate(path);
  };

  // Fetch vehicles
  const fetchVehicles = async (filters) => {
    try {
      const { data } = await axios.get("http://localhost:8080/api/vehicles", {
        params: filters,
      });
      const sortedData = sortVehicles([...data], selectedSort);
      setVehicles(sortedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Re-fetch whenever filters change
  useEffect(() => {
    fetchVehicles(filters);
  }, [filters]);

  // Re-sort whenever selectedSort changes
  useEffect(() => {
    setVehicles((prevVehicles) => sortVehicles([...prevVehicles], selectedSort));
  }, [selectedSort]);

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: type === "checkbox" ? checked : value,
      type: prevFilters.type || "New",
    }));
  };

  // For interior image on hover
  const getInteriorImage = (interiorName) => {
    const interior = interiorVehicleOptions.find((opt) => opt.name === interiorName);
    return interior ? interior.img : "";
  };

  // Toggle dropdown
  const toggleDropdown = (dropdown) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [dropdown]: !prev[dropdown],
    }));
  };

  // Reset filters
  const resetFilters = () => {
    setFilters({ ...initialFilters, type: "New" });
  };

  return (
    <div className="inventory-container">
      <div className="filter-header">
        <h2>Inventory</h2>

        {/* Sorting dropdown */}
        <div className="sort-dropdown">
          <button className="sort-button">
            {selectedSort} <span className="arrow">▼</span>
          </button>
          <ul className="sort-options">
            {["Price : low to high", "Price : high to low", "Mileage : low to high", "Mileage : high to low"].map(
              (option) => (
                <li
                  key={option}
                  className={option === selectedSort ? "selected" : ""}
                  onClick={() => setSelectedSort(option)}
                >
                  {option}
                </li>
              )
            )}
          </ul>
        </div>
      </div>

      <div className="filter-container">
        {/* Left side filters */}
        <div className="filters">
          {/* Toggle new/used */}
          <div className="toggle-container">
            <button
              className={filters.type === "New" ? "active" : ""}
              onClick={() => setFilters({ ...filters, type: "New" })}
            >
              New
            </button>
            <button
              className={filters.type === "Used" ? "active" : ""}
              onClick={() => setFilters({ ...filters, type: "Used" })}
            >
              Used
            </button>
          </div>

          {/* Model dropdown */}
          <div className="dropdown">
            <div className="dropdown-header" onClick={() => toggleDropdown("model")}>
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
                    <span className={filters.model === model ? "selected" : ""}>{model}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Payment dropdown */}
          <div className="dropdown">
            <div className="dropdown-header" onClick={() => toggleDropdown("payment")}>
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
                    <span className={filters.payment === option ? "selected" : ""}>{option}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Trim dropdown */}
          <div className="dropdown">
            <div className="dropdown-header" onClick={() => toggleDropdown("trim")}>
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
                    <span className={filters.trim === option ? "selected" : ""}>{option}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Paint dropdown */}
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

          {/* Wheel dropdown */}
          <div className="dropdown">
            <div className="dropdown-header" onClick={() => toggleDropdown("wheels")}>
              <span>Wheels</span>
              <span className="arrow">{openDropdowns["wheels"] ? "▲" : "▼"}</span>
            </div>
            {openDropdowns["wheels"] && (
              <div className="dropdown-content">
                {["Standard", "Premium"].map((option) => (
                  <label key={option} className="radio-option">
                    <input
                      type="radio"
                      name="wheels"
                      value={option}
                      checked={filters.wheels === option}
                      onChange={handleFilterChange}
                    />
                    <span className={filters.wheels === option ? "selected" : ""}>{option}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Hot Deal Button */}
          <button
            className={`hot-deal-button ${filters.hotDeal ? "active" : ""}`}
            onClick={() => setFilters({ ...filters, hotDeal: !filters.hotDeal })}
          >
            Hot Deal
          </button>

          {/* Reset Filters Button */}
          <button className="reset-filters" onClick={resetFilters}>
            Reset Filters
          </button>
        </div>

        {/* Right side: Vehicles list */}
        <div className="vehicles-list">
          {vehicles.length > 0 ? (
            <div className="vehicle-grid">
              {vehicles.map((vehicle) => (
                <div
                  key={vehicle.id}
                  className="vehicle-card"
                  // 3) Remove onClick setSelectedVehicle
                  // onClick={() => setSelectedVehicle(vehicle)}
                >
                  <img
                    src={
                      hoveredVehicleId === vehicle.id
                        ? getInteriorImage(vehicle.interior)
                        : vehicle.cover_image
                    }
                    alt={vehicle.model}
                    className="vehicle-image"
                    onMouseEnter={() => setHoveredVehicleId(vehicle.id)}
                    onMouseLeave={() => setHoveredVehicleId(null)}
                  />
                  <div className="vehicle-info">
                    <h4>{vehicle.model}</h4>
                    <div className="vehicle-details">
                      <p>{vehicle.trim}</p>
                      <p>
                        Est ${vehicle.price.toLocaleString()} /mo financing • $
                        {vehicle.price.toLocaleString()}
                      </p>
                      <p>{vehicle.type} Vehicle</p>
                      <p>{vehicle.mileage} km Range (EPA)</p>
                      <div className="vehicle-features">
                        {/* Paint */}
                        {vehicle.paint && (
                          <div className="feature-item">
                            <img
                              src={getPaintImage(vehicle.paint)}
                              alt={vehicle.paint}
                              className="feature-image"
                            />
                            <span>Paint</span>
                          </div>
                        )}
                        {/* Wheel */}
                        {(() => {
                          const wheel = wheelOptions.find(
                            (w) => w.name === vehicle.wheels
                          );
                          return wheel ? (
                            <div className="feature-item">
                              <img
                                src={wheel.img}
                                alt={wheel.name}
                                className="feature-image"
                              />
                              <span>{vehicle.wheels}</span>
                            </div>
                          ) : null;
                        })()}
                        {/* Interior */}
                        {vehicle.interior && (
                          <div className="feature-item">
                            <img
                              src={getPaintImage(vehicle.interior)}
                              alt={vehicle.interior}
                              className="feature-image"
                            />
                            <span>Interior</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* 4) Add "Order Now" button inside each card */}
                  <div style={{ marginTop: "10px" }}>
                    <button
                      className="order-now-button"
                      onClick={() => handleOrderNow(vehicle)}
                    >
                      View details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No vehicles match your criteria.</p>
          )}
        </div>

        {/* 5) Remove the entire "Selected Vehicle" block */}
        {/* {selectedVehicle && (
          <div className="order-now-container">
            <h3>Selected Vehicle: {selectedVehicle.model}</h3>
            <button className="order-now-button" onClick={handleOrderNow}>
              Order Now
            </button>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default VehicleFilter;