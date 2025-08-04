import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import ModelXPage from "./pages/ModelXPage.js";
import ModelSPage from "./pages/ModelSPage.js";
import Model3Page from "./pages/Model3Page.js";
import PaymentPage from "./components/PaymentPage.js";
import Login from "./components/Login";
import Register from "./components/Register";
import VehicleFilter from "./components/VehicleFilter";
import { CarConfigurator, Header } from "./components/SharedComponents";
import Cart from './components/Cart';
import Checkout from "./components/CheckoutPage";
import OrderConfirmationPage from './components/OrderConfirmationPage';
import AdminDashboard from "./components/AdminDashboard";
import { jwtDecode } from "jwt-decode";
import { PersonalInfoPage } from "./components/SharedComponents";
import OrderHistoryPage from "./components/OrderHistoryPage";
// import Header from "./components/Header";
// import "./styles/Header.css";
import "./styles/style.css";
import "./styles/styles2.css";

const isAuthenticated = () => !!localStorage.getItem("token");

const isAdmin = () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      console.warn("No token found in localStorage.");
      return false;
    }
    const decoded = jwtDecode(token);
    console.log("Decoded Token:", decoded);  // Debugging
    return decoded.roles && decoded.roles.includes("ROLE_ADMIN");
  } catch (error) {
    console.error("Error decoding token:", error);
    return false;
  }
};

// Create a Layout component that conditionally renders the Header
const Layout = ({ children }) => {
  const location = useLocation();
  // Define paths where header should be hidden
  const hideHeaderPaths = ["/", "/register"];
  return (
    <>
      {!hideHeaderPaths.includes(location.pathname) && <Header />}
      {children}
    </>
  );
};

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* Login page */}
          <Route path="/" element={<Login />} />

          {/* Register page */}
          <Route path="/register" element={<Register />} />

          {/* VehicleFilter page */}
          <Route path="/vehiclefilter" element={<VehicleFilter />} />
          <Route path="/personal-info" element={<PersonalInfoPage />} />
          <Route path="/orders" element={<OrderHistoryPage />} />

          {/* Car pages */}
          <Route path="/modelx" element={<ModelXPage />} />
          <Route path="/models" element={<ModelSPage />} />
          <Route path="/model3" element={<Model3Page />} />

          {/* Cart page */}
          <Route path="/cart" element={<Cart />} />

          {/* Checkout page */}
          <Route path="/checkout" element={<Checkout />} />

          <Route path="/payment" element={<PaymentPage />} />

          {/* Order Confirmation page */}
          <Route path="/order-confirmation" element={<OrderConfirmationPage />} />

          <Route
            path="/admindashboard"
            element={
              isAuthenticated() && isAdmin() ? <AdminDashboard /> : <Navigate to="/" />
            }
          />

          {/* SharedComponents page */}
          <Route
            path="/sharedcomponents"
            element={
              <CarConfigurator
                modelName="Model Y"
                basePrice={64990}
                stats={{ range: "525 km", topSpeed: "217 km/h", zeroTo100: "6.9 sec" }}
                carImages={{}}
                colorOptions={{}}
                tireOptions={{}}
                premiumTirePrice={2000}
                featuresImages={[]}
              />
            }
          />

          {/* Catch-all route */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;