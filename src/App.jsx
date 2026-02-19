import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Screen/Home/Home";
import AboutUs from "./Screen/About/AboutUs";
import Contact from "./Screen/Contact/Contact";
import OurProducts from "./Screen/Products/OurProducts";
import OurTeam from "./Screen/OurTeam/OurTeam";
import FarmerSignup from "./Screen/Auth/FarmerSignup";
import FarmerLogin from "./Screen/Auth/FarmerLogin";
import ForgotPassword from "./Screen/Auth/ForgotPassword";
import ResetPassword from "./Screen/Auth/ResetPassword";
import ProtectedRoute from "./Screen/Auth/ProtectedRoute";
import Cart from "./Screen/Cart/Cart";
import Orders from "./Screen/Orders/Orders";
import WhatsAppFloat from "./Screen/Home/Components/WhatsAppFloat";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/ourTeam" element={<OurTeam />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/products" element={<OurProducts />} />
        <Route path="/farmer/signup" element={<FarmerSignup />} />
        <Route path="/farmer/login" element={<FarmerLogin />} />
        <Route path="/farmer/forgot-password" element={<ForgotPassword />} />
        <Route path="/farmer/reset-password" element={<ResetPassword />} />
        {/* Protected — require login */}
        <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
        <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
      </Routes>
      <WhatsAppFloat />
    </BrowserRouter>
  );
};

export default App;
