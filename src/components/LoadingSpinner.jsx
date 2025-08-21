import React from "react";
import "./LoadingSpinner.css";
import logo from "../assets/logo.png";

const LoadingSpinner = () => {
  return (
    <div className="spinner-container">
      <div className="spinner">
        <div className="logo">
          {/* Replace with your actual logo image */}
          <img src={logo} alt="E-Shop Logo" className="logo-image" />
          {/* Fallback: Text-based logo if no image */}
          {/* <span className="logo-text">E-Shop</span> */}
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
