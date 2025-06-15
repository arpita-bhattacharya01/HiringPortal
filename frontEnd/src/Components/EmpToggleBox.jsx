import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Make sure this is imported
import "./EmpToggleBox.css";

const EmpToggleBox = () => {
  const [activeTab, setActiveTab] = useState("enquiry");
  const [hiringType, setHiringType] = useState('');
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [requestCallData, setrequestCallData] = useState({
    fullname: "",
    mobile: "",
    email: "",
    hiringType: "",
    designation: "",
    companyname: "",
    city: ""
  })

  const handleChange = (e) => {
    setrequestCallData({ ...requestCallData, [e.target.name]: e.target.value });
  }
  const handleRequest = async (requestCallData) => {
    try {
      const response = await axios.post('http://localhost:3000/send-callback-email', requestCallData);
      if (response.status === 200) {
        alert('Request submitted. We will contact you soon!');
      }
    } catch (error) {
      console.error(error);
      alert('Failed to send the request.');
    }
  };

  const handleHiringTypeChange = (type) => {
    setHiringType(type);
    setrequestCallData((prev) => ({ ...prev, hiringType: type }));
  }
  const handlesubmit = async (e) => {
    e.preventDefault(); // Prevent form reload
    try {
      const response = await axios.post("http://localhost:3000/employer-login", {
        email,
        password,
      });

      if (response.status === 200) {
        alert(response.data.message);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("employerId", response.data.employer.id);
        localStorage.setItem("user", JSON.stringify(response.data.employer));
        localStorage.setItem("companyName", response.data.employer.companyname);
        // console.log("Company Name from response:", response.data.employer.companyname);
        // console.log(localStorage.length);
        navigate("/empPgAfterLogin"); // Navigate after successful login
      }
    } catch (error) {
      if (error.response?.data?.message) {
        alert(error.response.data.message);
      } else {
        alert("Something went wrong");
      }
    }
  };

  return (
    <div className="auth-container">
      <div className="tab-switcher">
        <button
          className={`tab-btn ${activeTab === "enquiry" ? "active" : ""}`}
          onClick={() => setActiveTab("enquiry")}
        >
          Sales enquiry
        </button>
        <button
          className={`tab-btn ${activeTab === "login" ? "active" : ""}`}
          onClick={() => setActiveTab("login")}
        >
          Register/Log in
        </button>
      </div>

      {activeTab === "enquiry" ? (
        <form className="auth-form">
          <input name="fullname" value={requestCallData.fullname} onChange={handleChange} type="text" placeholder="Full name" required />
          <input name="mobile" value={requestCallData.mobile} onChange={handleChange} type="text" placeholder="Mobile number" required />
          <input name="email" value={requestCallData.email} onChange={handleChange} type="email" placeholder="Work email" required />
          <div className="enquiry-form">
            <p className="label">HIRING FOR</p>
            <div className="toggle-buttons">
              <button
                className={hiringType === 'company' ? 'active' : ''}
                type="button"
                onClick={() => handleHiringTypeChange('company')}
              >
                Your company
              </button>
              <button
                className={hiringType === 'consultancy' ? 'active' : ''}
                type="button"
                onClick={() => handleHiringTypeChange('consultancy')}
              >
                Your consultancy
              </button>
            </div>
            {hiringType && (
              <div className="conditional-fields">
                <input name="designation" value={requestCallData.designation} onChange={handleChange} type="text" placeholder="Designation name" />
                <input name="companyname" value={requestCallData.companyname} onChange={handleChange} type="text" placeholder="Company name" />
                <select name="range" value={requestCallData.range} onChange={handleChange}>
                  <option value="">Select range</option>
                  <option value="1-10">1-10</option>
                  <option value="11-50">11-50</option>
                  <option value="51-200">51-200</option>
                  <option value="200+">200+</option>
                </select>
                <input name="city" value={requestCallData.city} onChange={handleChange} type="text" placeholder="City" />
                <button onClick={() => handleRequest(requestCallData)} className="request-btn" type="button">Request callback</button>
              </div>
            )}
          </div>
        </form>
      ) : (
        <form className="auth-form" onSubmit={handlesubmit}>
          <input
            value={email}
            type="email"
            placeholder="Enter registered email ID"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Enter password"
            required
          />
          <a onClick={() => { navigate('/forgetpassword') }} href="#" className="forgot-link">
            Forgot password?
          </a>
          <button type="submit" className="submit-btn">
            Log in
          </button>

          <div className="separator">or</div>
          <p className="small-text">Don't have a registered email ID?</p>
          <button type="button" className="create-btn" onClick={() => navigate('/EmpRegistration')}>
            Create account
          </button>
        </form>
      )}
    </div>
  );
};

export default EmpToggleBox;
