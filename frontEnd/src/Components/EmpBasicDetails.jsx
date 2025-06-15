import React, { useState, useRef } from 'react';
import { BsFillPersonVcardFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import './EmpBasicDetails.css';
import axios from 'axios';

export default function EmpBasicDetails() {
  const [fullName, setFullName] = useState('');
  const [officialEmail, setOfficialEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [otpVerified, setOtpVerified] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(officialEmail);
  const loginEmail = localStorage.getItem('loginEmail');

  const validate = () => {
    const newErrors = {};
    if (!fullName) newErrors.fullName = 'Full name is required';
    if (!officialEmail.includes('@')) newErrors.officialEmail = 'Email must contain "@"';
    if (!password || password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    if (!otpVerified) newErrors.otp = 'Please verify OTP';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      try {
        const loginEmail = localStorage.getItem('loginEmail'); // Get from local storage
        console.log("this is a login email", loginEmail)
        const response = await axios.post("http://localhost:3000/employer-registration", {
          fullName: fullName,
          officialEmail,
          password,
          loginEmail,
        });
        if (response.data.success) {
          const employerId = response.data.employer.id; 
          console.log("Registered Employer ID:", employerId);

          localStorage.setItem('employerId', employerId);

        } else {
          console.error("Registration failed:", response.data.error);
        }
        console.log(response)
        alert('Basic Regitration successfully done!');
        navigate("/empCompDetails");
      } catch (error) {
        console.error("Registration error:", error);
        console.log(error.response?.data || error.message);
        alert(error.response?.data?.message || "Something went wrong during registration.");
      }
    }
  };
  const handleSendOtp = async () => {
    if (isEmailValid) {
      try {
        // console.log("this is a offical email", officialEmail);
        const checkEmailRes = await axios.post("http://localhost:3000/check-employer-email", {
          email: officialEmail, // Fix is here
        });

        if (checkEmailRes.data.exists) {
          alert("Email already registered. Please login.");
          return;
        }

        await axios.post("http://localhost:3000/send-otp", {
          email: officialEmail,
        });

        setOtpSent(true);
        alert(`OTP sent to your ${officialEmail}`);
      } catch (error) {
        alert(error.response?.data?.message || "Error sending OTP");
      }
    }
  };
  const handleVerifyOtp = async () => {
    try {
      const res = await axios.post("http://localhost:3000/verify-otp", {
        email: officialEmail,
        otp: otp,
      });
      alert(res.data.message);
      setOtpVerified(true);
    } catch (error) {
      alert(error.response?.data?.message || "OTP verification failed");
    }
  };
  return (
    <div className="page-wrapper">
      {/* Navbar */}
      <nav className="navbar navbar-light bg-white shadow-sm px-4 py-2 d-flex justify-content-between align-items-center">
        <a className="navbar-brand" href="#">
          <img className='mx-5'
            src="images/Skilled Peepal Logo.png"
            alt="Skilled Peepal Logo"
            height="50"
            width="200"
          />
        </a>
      </nav>

      {/* Form Card */}
      <div className="container d-flex justify-content-center mt-4 mb-3">
        <div className="form-card shadow p-4 rounded">
          <div className="text-center mb-3">
            <div className="icon-circle mb-2">
              <BsFillPersonVcardFill className="fs-3" />
            </div>
            <p className="text-muted mb-0">We need these details to identify you</p>
            <p className="text-muted">and create your account</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group mt-3">
              <label>Full name</label>
              <input
                type="text"
                className={`form-control ${errors.fullName ? 'is-invalid' : ''}`}
                placeholder="Name as per PAN"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
              {errors.fullName && <div className="invalid-feedback">{errors.fullName}</div>}
            </div>

            <div className="form-group mt-3">
              <label>Official email ID</label>
              <div className="d-flex gap-2">
                <input
                  type="email"
                  className={`form-control ${errors.officialEmail ? 'is-invalid' : ''}`}
                  placeholder="Enter email ID"
                  value={officialEmail}
                  onChange={(e) => setOfficialEmail(e.target.value)}
                />
                <button type="button" className="btn btn-send-otp" onClick={handleSendOtp}>Send OTP</button>
              </div>
              {errors.officialEmail && <div className="invalid-feedback">{errors.officialEmail}</div>}
            </div>

            {otpSent && (
              <div className="form-group mt-3 d-flex gap-2 align-items-center">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter 4-digit OTP"
                  value={otp}
                  maxLength={4}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                  disabled={otpVerified}
                />
                <button
                  type="button"
                  className="btn btn-verify-otp"
                  onClick={handleVerifyOtp}
                  disabled={otpVerified}
                >
                  {otpVerified ? 'Verified' : 'Verify OTP'}
                </button>
              </div>
            )}
            {errors.otp && <div className="text-danger mt-1">{errors.otp}</div>}

            <div className="form-group mt-3">
              <label>Create password</label>
              <input
                type="password"
                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && <div className="invalid-feedback">{errors.password}</div>}
            </div>

            <div className="form-group mt-3">
              <label>Confirm password</label>
              <input
                type="password"
                className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                placeholder="Re-enter password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
            </div>

            <button type="submit" className="btn btn-primary btn-block mt-4 cursor-pointer">
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
