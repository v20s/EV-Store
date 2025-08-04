import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/AdminDashboard.css';

function AdminActionsPage() {
  const [users, setUsers] = useState([]);
  const [orderId, setOrderId] = useState("");
  const [orderStatus, setOrderStatus] = useState("");

  // Fetch Users List
  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/admin/reports/users");
      setUsers(response.data);
    } catch (err) {
      console.error(err);
      alert("Error fetching users.");
    }
  };

  // Fetch Order Status
  const fetchOrderStatus = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/admin/reports/orders/${orderId}/status`
      );
      setOrderStatus(response.data);
    } catch (err) {
      console.error(err);
      alert("Error fetching order status.");
    }
  };

  return (
    <div className="card">
      <div className="card-content">
        <h2 className="section-title">Admin Actions</h2>

        {/* Fetch Users Button */}
        <button className="primary-btn" onClick={fetchUsers}>Get Users List</button>

        {users.length > 0 && (
          <ul className="user-list">
            {users.map((user) => (
              <li key={user.id}>{user.name} ({user.email})</li>
            ))}
          </ul>
        )}

        {/* Fetch Order Status */}
        <input
          className="input-field"
          placeholder="Order ID"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
        />
        <button className="primary-btn" onClick={fetchOrderStatus}>Get Order Status</button>
        {orderStatus && <p>Order Status: {orderStatus}</p>}
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  return (
    <div className="admin-container">
      <h1 className="admin-title">Admin Dashboard</h1>
      <div>
        <SalesReportPage />
        <OrderStatusUpdatePage />
        <VehicleManagementPage />
        <AdminActionsPage /> 
      </div>
    </div>
  );
}


function SalesReportPage() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false); // Add the loading state

  const fetchReports = async () => {
    setLoading(true); // Start loading
    try {
      const response = await axios.get("http://localhost:8080/api/admin/reports/sales");
      setReports(response.data);
    } catch (err) {
      console.error(err);
      alert("Error fetching sales report.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="card">
      <div className="card-content">
        <h2 className="section-title">Sales Report</h2>
        
        {/* button to trigger fetching reports */}
        <button className="primary-btn" onClick={fetchReports}>
          Generate Sales Report
        </button>

        {loading ? (
          <p>Loading...</p>
        ) : reports.length === 0 ? (
          <p>No completed orders found.</p>
        ) : (
          <div className="report-list">
            {reports.map((report) => (
              <div key={report.orderId} className="report-item">
                <p><strong>Order ID:</strong> {report.orderId}</p>
                <p><strong>Status:</strong> {report.orderStatus}</p>
                <p><strong>Total Amount:</strong> ${report.totalAmount}</p>
                <p><strong>Vehicles:</strong> {report.vehicleModels.join(", ")}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}


function OrderStatusUpdatePage() {
  const [orderId, setOrderId] = useState("");
  const [status, setStatus] = useState("");

  const handleUpdate = async () => {
    try {
      await axios.put(
        `http://localhost:8080/api/admin/reports/orders/${orderId}/status?status=${status}`
      );
      alert("Order status updated successfully.");
    } catch (err) {
      console.error(err);
      alert("Error updating status.");
    }
  };

  return (
    <div className="card">
      <div className="card-content">
        <h2 className="section-title">Update Order Status</h2>
        <input
          className="input-field"
          placeholder="Order ID"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
        />
        <input
          className="input-field"
          placeholder="Status (e.g., Completed)"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        />
        <button className="primary-btn" onClick={handleUpdate}>Update Status</button>
      </div>
    </div>
  );
}

function VehicleManagementPage() {
  const [vehicleData, setVehicleData] = useState({
    model: "",
    price: "",
    year: "",
    mileage: "",
    cover_image: "",
    range: "",
    top_speed: "",
    kmh: "",
    type: "",
    payment: "",
    trim: "",
    paint: "",
    wheels: "",
    interior: "",
    seat_layout: "",
    performance_upgrade: false,
    tow_hitch: false,
    hot_deal: false,
    exterior_colour: "",
    tires: "",
  });
  const [deleteId, setDeleteId] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setVehicleData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const addVehicle = async () => {
    try {
      await axios.post("http://localhost:8080/api/admin/vehicles/add", {
        ...vehicleData,
        price: parseFloat(vehicleData.price),
        year: parseInt(vehicleData.year),
        mileage: parseFloat(vehicleData.mileage),
      });
      alert("Vehicle added successfully.");
    } catch (err) {
      console.error(err);
      alert("Error adding vehicle.");
    }
  };

  const deleteVehicle = async () => {
    try {
      await axios.delete(`http://localhost:8080/api/admin/vehicles/delete/${deleteId}`);
      alert("Vehicle deleted successfully.");
    } catch (err) {
      console.error(err);
      alert("Error deleting vehicle.");
    }
  };

  return (
    <div className="card">
      <div className="card-content">
        <h2 className="section-title">Vehicle Management</h2>
        <div className="section">
          <p>Add Vehicle:</p>
          {Object.keys(vehicleData).map((field) =>
            typeof vehicleData[field] === "boolean" ? (
              <label key={field}>
                <input
                  type="checkbox"
                  name={field}
                  checked={vehicleData[field]}
                  onChange={handleChange}
                />{" "}
                {field.replace(/_/g, " ")}
              </label>
            ) : (
              <input
                key={field}
                className="input-field"
                placeholder={field.replace(/_/g, " ")}
                name={field}
                value={vehicleData[field]}
                onChange={handleChange}
              />
            )
          )}
          <button className="primary-btn" onClick={addVehicle}>Add Vehicle</button>
        </div>

        <div className="section">
          <p>Delete Vehicle by ID:</p>
          <input
            className="input-field"
            placeholder="Vehicle ID"
            value={deleteId}
            onChange={(e) => setDeleteId(e.target.value)}
          />
          <button className="danger-btn" onClick={deleteVehicle}>Delete Vehicle</button>
        </div>
      </div>
    </div>
  );
}
