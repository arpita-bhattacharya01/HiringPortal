import React, { useState } from "react";
import { BsBuilding } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./EmpCompDetails.css";

export default function EmpCompDetails() {
  const navigate = useNavigate();

  const [hiringType, setHiringType] = useState("company");
  const [companyName, setCompanyName] = useState("");
  const [industry, setIndustry] = useState("");
  const [employeeCount, setEmployeeCount] = useState("");
  const [designation, setDesignation] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [location, setLocation] = useState("");
  const [address, setAddress] = useState("");
  const [pinCodeError, setPinCodeError] = useState("");

  const handlePinChange = async (e) => {
    const value = e.target.value;

    if (/^\d{0,6}$/.test(value)) {
      setPinCode(value);
      setLocation("");
      setPinCodeError("");

      if (value.length === 6) {
        try {
          const res = await fetch(`https://api.postalpincode.in/pincode/${value}`);
          const data = await res.json();
          if (data[0].Status === "Success" && data[0].PostOffice?.length > 0) {
            const city = data[0].PostOffice[0].District;
            const state = data[0].PostOffice[0].State;
            setLocation(`${city}, ${state}`);
            setPinCodeError("");
          } else {
            setLocation("");
            setPinCodeError("Invalid PIN code. Please enter a valid one.");
          }
        } catch (error) {
          setLocation("");
          setPinCodeError("Failed to fetch location. Try again.");
        }
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Handle submit click");

    if (
      !companyName ||
      !industry ||
      !employeeCount ||
      !designation ||
      !pinCode ||
      pinCode.length !== 6 ||
      pinCodeError ||
      !address
    ) {
      alert("Please fill all fields correctly.");
      return;
    }

    const employerId = localStorage.getItem("employerId");

    try {
      const response = await axios.put("http://localhost:3000/employer-profile", {
        id: Number(employerId),
        hiringfor : hiringType, 
        companyname: companyName,
        industry,
        employes: parseInt(employeeCount),
        designation,
        pincode: parseInt(pinCode),
        companyaddress: address,
      });

      if (response.data.success) {
        alert("Details submitted successfully!");
        navigate("/empPgAfterLogin"); 
      } else {
        alert("Update failed: " + response.data.error);
      }
    } catch (err) {
      console.error("Update error:", err);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="page-wrapper">
      <nav className="navbar navbar-light bg-white shadow-sm px-4 py-2 d-flex justify-content-between align-items-center">
        <a className="navbar-brand" href="#">
          <img
            className="mx-5"
            src="images/Skilled Peepal Logo.png"
            alt="Skilled Peepal Logo"
            height="50"
            width="200"
          />
        </a>
      </nav>

      <div className="container d-flex justify-content-center mt-4 mb-3">
        <div className="form-card shadow p-4 rounded">
          <div className="text-center mb-3">
            <div className="icon-circle mb-2">
              <BsBuilding className="fs-3" />
            </div>
            <h5 className="fw-semibold">Company details</h5>
            <p className="text-muted small">
              We use this information to know about the company you’re hiring for and to generate an invoice
            </p>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            {/* Hiring Type */}
            <div className="form-group">
              <label className="labelling">Hiring for :</label>
              <div className="d-flex gap-3 mt-1">
                <div className="form-check">
                  <input type="radio" id="company" name="hiringType" value="company" checked={hiringType === "company"}
                    onChange={() => setHiringType("company")} className="form-check-input" />
                  <label htmlFor="company" className="form-check-label labelling">your company</label>
                </div>
                <div className="form-check">
                  <input type="radio" id="consultancy" name="hiringType" value="consultancy" checked={hiringType === "consultancy"}
                    onChange={() => setHiringType("consultancy")} className="form-check-input" />
                  <label htmlFor="consultancy" className="form-check-label labelling">a consultancy</label>
                </div>
              </div>
            </div>

            {/* Company Name */}
            <div className="form-group mt-3">
              <label className="labelling">Company</label>
              <input type="text" className="form-control" value={companyName}
                onChange={(e) => setCompanyName(e.target.value)} placeholder="e.g. TCS, Wipro" />
            </div>

            {/* Industry */}
            <div className="form-group mt-3">
              <label className="labelling">Select industry</label>
              <select className="form-control form-select" value={industry} onChange={(e) => setIndustry(e.target.value)}>
                <option value="">Select</option>
                <option value="IT Services & Consulting">IT Services & Consulting</option>
                <option value="Finance">Finance</option>
                <option value="Education">Education</option>
              </select>
            </div>

            {/* Employee Count */}
            <div className="form-group mt-3">
              <label className="labelling">Number of employees</label>
              <select className="form-control form-select" value={employeeCount} onChange={(e) => setEmployeeCount(e.target.value)}>
                <option value="">Select</option>
                <option value="1">1-14</option>
                <option value="15">15-49</option>
                <option value="50">50-200</option>
              </select>
            </div>

            {/* Designation */}
            <div className="form-group mt-3">
              <label className="labelling">Your designation</label>
              <input type="text" className="form-control" placeholder="e.g. HR Manager" value={designation}
                onChange={(e) => setDesignation(e.target.value)} />
            </div>

            {/* PIN Code */}
            <div className="form-group mt-3">
              <label className="labelling">Pin code</label>
              <input type="text" maxLength={6} className="form-control" value={pinCode}
                onChange={handlePinChange} placeholder="e.g. 110001" />
              {location && <div className="text-success small mt-1">{location}</div>}
              {pinCodeError && <div className="text-danger small mt-1">{pinCodeError}</div>}
            </div>

            {/* Address */}
            <div className="form-group mt-3">
              <label className="labelling">Company address</label>
              <textarea rows={3} className="form-control" value={address}
                onChange={(e) => setAddress(e.target.value)} placeholder="Enter full address including city and state" />
            </div>

            <button onClick={() => navigate("/empPgAfterLogin")} type="submit" className="btn btn-primary btn-block mt-4">
              Continue
            </button>
          </form>
        </div>
      </div>

      <footer className="footer-blue-small mt-5 mb-0 py-3 text-center text-white d-flex flex-column">
        <div>Contact Us | Report a problem</div>
        <div>All rights reserved © 2025 Acculizein Tech Pvt India Ltd.</div>
      </footer>
    </div>
  );
}
