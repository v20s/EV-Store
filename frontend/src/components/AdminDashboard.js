import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/AdminDashboard.css';
import { jwtDecode } from "jwt-decode";

export default function AdminDashboard() {
  return (
    <div className="admin-container">
      <h1 className="admin-title">Admin Dashboard</h1>
      <div>
        <SalesReportPage />
        <PendingOrdersPage />
        <OrderStatusUpdatePage />
        <GetUsersList />
        <VehicleManagementPage />
      </div>
    </div>
  );
}

function SalesReportPage() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false); // Add the loading state

  const fetchReports = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Unauthorized: Please log in as admin.");
        return;
      }
      const response = await axios.get("http://localhost:8080/api/admin/reports/sales", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setReports(response.data);
    } catch (err) {
      console.error(err);
      alert("Error fetching sales report.");
    } finally {
      setLoading(false);
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

function PendingOrdersPage() {
  const [pendingOrders, setPendingOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPendingOrders = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Unauthorized: Please log in as admin.");
        return;
      }
      const response = await axios.get("http://localhost:8080/api/admin/reports/pending-orders", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPendingOrders(response.data);
    } catch (err) {
      console.error(err);
      alert("Error fetching pending orders.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <div className="card-content">
        <h2 className="section-title">Pending Orders</h2>
        
        {/* button to trigger fetching pending orders */}
        <button className="primary-btn" onClick={fetchPendingOrders}>
          Get Pending Orders
        </button>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="order-list">
            {pendingOrders.map((order) => (
              <div key={order.orderId} className="order-item">
                <p><strong>Order ID:</strong> {order.orderId}</p>
                <p><strong>Status:</strong> {order.orderStatus}</p>
                <p><strong>Total Amount:</strong> ${order.totalAmount}</p>
                <p><strong>Vehicles:</strong> {order.vehicleModels.join(", ")}</p>
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
  const [newStatus, setNewStatus] = useState("");
  // const [orderStatus, setOrderStatus] = useState("");
  const [statusUpdateMessage, setStatusUpdateMessage] = useState("");

  // Update Order Status
  const updateOrderStatus = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Unauthorized: Please log in as admin.");
        return;
      }

      // Make PUT request to update order status
      const response = await axios.put(
        `http://localhost:8080/api/admin/reports/orders/${orderId}/status`,
        null, // No body needed, status is passed as a query parameter
        {
          params: { status: newStatus },
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setStatusUpdateMessage(response.data);
    } catch (err) {
      console.error(err);
      alert("Error updating order status.");
    }
  };

  // Fetch Order Status
  // const fetchOrderStatus = async (orderId) => {
  //   try {
  //       const token = localStorage.getItem("token");
  //       if (!token) {
  //           alert("Unauthorized: Please log in as admin.");
  //           return;
  //       }

  //       // Make GET request to fetch the order status
  //       const response = await axios.get(
  //           `http://localhost:8080/api/admin/reports/orders/7`, 
  //           {
  //               headers: { Authorization: `Bearer ${token}` },  
  //           }
  //       );

  //       console.log("Order status:", response.data);
  //       // You can update the UI with the fetched order status here
  //     } catch (err) {
  //         console.error(err);
  //         alert("Error fetching order status.");
  //     }
  // };

  return (
    <div className="card">
      <div className="card-content">
        <h2 className="section-title">Order Status</h2>

        {/* Fetch Order Status */}
        {/* <div>
          <input
            className="input-field"
            placeholder="Order ID"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
          />
          <button className="primary-btn" onClick={fetchOrderStatus}>Get Order Status</button>
          {orderStatus && <p>Order Status: {orderStatus}</p>}
        </div> */}

        {/* Update Order Status */}
        <div>
          <input
            className="input-field"
            placeholder="Order ID"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
          />
          <input
            className="input-field"
            placeholder="New Order Status"
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value)}
          />
          <button className="primary-btn" onClick={updateOrderStatus}>Update Order Status</button>
          {statusUpdateMessage && <p>{statusUpdateMessage}</p>}
        </div>
      </div>
    </div>
  );
}

function GetUsersList(){
  const [users, setUsers] = useState([]);
  // Fetch Users List
  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Unauthorized: Please log in as admin.");
        return;
      }
      const response = await axios.get("http://localhost:8080/api/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Token received:", response.data);
      console.log("Decoded JWT:", jwtDecode(token)); // Decode token here
      setUsers(response.data);
    } catch (err) {
      console.error(err);
      alert("Error fetching users. Make sure you are logged in as an admin.");
    }
  };

  return (
    <div className="card">
      <div className="card-content">
      <h2>Users List</h2>
      {/* Fetch Users Button */}
      <button className="primary-btn" onClick={fetchUsers}>Get Users List</button>

      {users.length > 0 && (
        <div className="user-list">
          {users.map((user) => (
            <div key={user.userId} className="user-card">
              <div className="user-info">
                <h3 className="user-name">{user.firstName} {user.lastName}</h3>
                <p className="user-email">{user.email}</p>
              </div>
              <div className="user-details">
                <p className="user-role">Role: {user.role}</p>
                <p className="user-region">Region: {user.region}</p>
              </div>
            </div>
          ))}
        </div>
      )}
      </div>
    </div>
  );
}


const vehicleOptions = {
  type: ["New", "Used"],
  model: ["Model S", "Model X", "Model 3"],
  payment: ["Cash", "Finance"],
  trim: [
    "Performance All-Wheel Drive",
    "Long Range All-Wheel Drive",
    "Long Range Rear-Wheel Drive",
  ],
  paint: ["White", "Black", "Blue", "Silver", "Red"],
  wheels: ["Standard", "Premium"],
  interior: ["Black", "White"],
  seat_layout: ["Five Seat Interior", "Seven Seat Interior"],
};

function VehicleManagementPage() {
  const [vehicleData, setVehicleData] = useState({
    type: "",
    model: "",
    payment: "",
    trim: "",
    paint: "",
    wheels: "",
    interior: "",
    seat_layout: "",
    price: "",
    year: "",
    mileage: "",
    cover_image: "",
    exterior_colour: "",
    tires: "",
    range: "",
    top_speed: "",
    kmh: "",
    performance_upgrade: false,
    tow_hitch: false,
    hot_deal: false,
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
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Unauthorized: Please log in as admin.");
        return;
      }
      await axios.post(
        "http://localhost:8080/api/admin/vehicles/add",
        {
          ...vehicleData,
          price: parseFloat(vehicleData.price) || 0,
          year: parseInt(vehicleData.year) || new Date().getFullYear(),
          mileage: parseInt(vehicleData.mileage) || 0,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Vehicle added successfully.");
    } catch (err) {
      console.error(err);
      alert("Error adding vehicle.");
    }
  };

  const deleteVehicle = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Unauthorized: Please log in as admin.");
        return;
      }
      await axios.delete(`http://localhost:8080/api/admin/vehicles/delete/${deleteId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Vehicle deleted successfully.");
    } catch (err) {
      console.error(err);
      alert("Error deleting vehicle - vehicle not found!");
    }
  };

  return (
    <div className="card">
      <div className="card-content">
        <h2 className="section-title">Vehicle Management</h2>
        <div className="section">
          {Object.keys(vehicleData).map((field) =>
            vehicleOptions[field] ? (
              <div key={field} className="input-group">
                <label htmlFor={field}>{field.replace(/_/g, " ").charAt(0).toUpperCase() + field.replace(/_/g, " ").slice(1)}</label>
                <select
                  id={field}
                  name={field}
                  value={vehicleData[field]}
                  onChange={handleChange}
                >
                  <option value="">Select {field.replace(/_/g, " ")}</option>
                  {vehicleOptions[field].map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            ) : typeof vehicleData[field] === "boolean" ? (
              <div key={field} className="input-group">
                <label htmlFor={field}>
                  <input
                    type="checkbox"
                    id={field}
                    name={field}
                    checked={vehicleData[field]}
                    onChange={handleChange}
                  />
                  {field.replace(/_/g, " ").charAt(0).toUpperCase() + field.replace(/_/g, " ").slice(1)}
                </label>
              </div>
            ) : (
              <div key={field} className="input-group">
                <label htmlFor={field}>{field.replace(/_/g, " ").charAt(0).toUpperCase() + field.replace(/_/g, " ").slice(1)}</label>
                <input
                  id={field}
                  className="input-field"
                  placeholder={field.replace(/_/g, " ")}
                  name={field}
                  value={vehicleData[field]}
                  onChange={handleChange}
                />
              </div>
            )
          )}
          <button className="primary-btn" onClick={addVehicle}>Add Vehicle</button>
        </div>

        <div className="section">
          <p>Delete Vehicle by ID:</p>
          <input className="input-field" placeholder="Vehicle ID" value={deleteId} onChange={(e) => setDeleteId(e.target.value)} />
          <button className="danger-btn" onClick={deleteVehicle}>Delete Vehicle</button>
        </div>
      </div>
    </div>
  );
}
