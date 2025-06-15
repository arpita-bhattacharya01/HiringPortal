import React, { useState } from 'react';
import './register.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    mobile: '',
    updates: false,
    workStatus: 'fresher'
  });
  console.log(formData)
  const [errors, setErrors] = useState({});
  const [selected, setSelected] = useState('fresher');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  // const [serverOtp, setServerOtp] = useState(null);
  const [otpVerified, setOtpVerified] = useState(false);


  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName) newErrors.fullName = 'Full name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password || formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    if (formData.confirmPassword !== formData.password) newErrors.confirmPassword = 'Passwords do not match';
    if (!formData.mobile) newErrors.mobile = 'Mobile number is required';
    if (!formData.updates) newErrors.updates = 'You must agree to receive updates';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSendOtp = async () => {
    try {
      const checkEmailRes = await axios.post('http://localhost:3000/check-email', {
        email: formData.email,
      });

      if (checkEmailRes.data.exists) {
        alert('Email already registered please Login');
        return;
      }
      await axios.post('http://localhost:3000/send-otp', {
        email: formData.email,
      });

      // setServerOtp(generatedOtp);
      setOtpSent(true);
      alert(`OTP sent to your ${formData.email}`);
    } catch (error) {
      alert(error.response?.data?.message || 'Error sending OTP');
    }
  };

  const handleVerifyOtp = async () => {
    console.log("Verify OTP clicked");
    try {
      const otpClean = otp.trim(); // FIXED
      const res = await axios.post('http://localhost:3000/verify-otp', {
        email: formData.email,
        otp: otpClean,
      });
      setOtpVerified(true);
      alert(res.data.message);
    } catch (err) {
      alert(err.response?.data?.message || 'OTP verification failed');
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    if (!otpVerified) {
      alert("Please verify OTP before registering");
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/register', formData);
      console.log('Registration successful:', response.data);
      alert('Registration successful!');
    } catch (error) {
      console.error('Registration failed:', error.response?.data?.message || error.message);
      alert('Registration failed');
    }
  };
  return (
    <div>
      <nav
        className="navbar navbar-expand-lg"
        style={{
          backgroundColor: 'white',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          padding: '0.5rem 2rem',
        }}
      >
        <div className="container-fluid d-flex justify-content-between align-items-center">

          <a className="navbar-brand" href="#">
            <img
              src="images\Skilled Peepal Logo.png"
              alt="Skilled Peepal"
              style={{ height: '50px', width: '200px' }}
            />
          </a>

          <div className="text-dark" style={{ fontSize: '14px' }}>
            Already Registered?{' '}
            <a
              onClick={() => navigate("/login")}
              className="text-decoration-none , onhover"
              style={{ fontWeight: 600, color: '#265df5' }}
            >
              Login
            </a>{' '}
            here
          </div>
        </div>
      </nav>
      <div className="register-by-user">
        <div className="reg-form-container">
          <div className="reg-panel">
            <span className="fs-3">Create your Naukri profile</span>
            <h6>Search & apply to jobs from India's No.1 Job Site</h6>

            <div className="reg-by-google d-flex justify-content-center align-items-center flex-column">
              <h4 className="fs-6 mt-3">Continue with</h4>
              <button type="button" className="btn btn-outline-primary rounded-pill px-3 py-2 d-flex" id="google-button">
                <span className="px-1">
                  <img src="images/google-icon.svg" alt="google" width="20" height="20" />
                </span>
                <span className="fs-5 px-2">Google</span>
              </button>
              <span className="mt-3 dash position-relative">Or</span>
            </div>

            <form id="registrationForm" onSubmit={handleSubmit}>
              <label htmlFor="fullName" className='label-all'>Full Name<sup style={{ color: 'red' }}>*</sup></label>
              <input className='input-all' type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Enter your full name" />
              {errors.fullName && <span className="error-message">{errors.fullName}</span>}

              <label htmlFor="email" className='label-all'>
                Email Id<sup style={{ color: 'red' }}>*</sup>
              </label>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
                <input className='input-all'
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  style={{ flex: 1 }}
                />
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleSendOtp}
                  disabled={!formData.email}
                  style={{ padding: '8px 5px' }}
                >
                  Send OTP
                </button>
              </div>
              {errors.email && <span className="error-message">{errors.email}</span>}

              {otpSent && !otpVerified && (
                <>
                  <label htmlFor="otp" className='label-all'>Enter OTP</label>
                  <div style={{ display: 'flex', gap: '10px', alignItems: "center" }}>
                    <input className='input-all'
                      type="text"
                      id="otp"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      placeholder="Enter the OTP"
                      style={{ flex: 1 }}
                    />
                    <button type="button" className="btn btn-success"
                      onClick={handleVerifyOtp}
                      style={{ padding: '8px 5px' }}
                    >
                      Verify OTP
                    </button>
                  </div>
                </>
              )}
              <label htmlFor="password" className='label-all'>Password<sup style={{ color: 'red' }}>*</sup></label>
              <input className='input-all' type="password" id="password" name="password" value={formData.password} onChange={handleChange} placeholder="(Minimum 8 characters)" />
              {errors.password && <span className="error-message">{errors.password}</span>}

              <label htmlFor="confirmPassword" className='label-all'>Confirm Password<sup style={{ color: 'red' }}>*</sup></label>
              <input className='input-all' type="password" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm your password" />
              {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}

              <label htmlFor="mobile" className='label-all'>Mobile Number<sup style={{ color: 'red' }}>*</sup></label>
              <input className='input-all' type="tel" id="mobile" name="mobile" value={formData.mobile} onChange={handleChange} placeholder="Enter your mobile number" />
              {errors.mobile && <span className="error-message">{errors.mobile}</span>}

              <label className='label-all'>Work status</label>
              <div className="exp">
                <div
                  className={`exp-user ${selected === 'experienced' ? 'selected' : ''}`}
                  onClick={() => {
                    setSelected('experienced');
                    setFormData({ ...formData, workStatus: 'experienced' });
                  }}
                >
                  <div className="text">
                    <h4>I'm experienced</h4>
                    <p>I have work experience (excluding internships)</p>
                  </div>
                  <div className="icon">
                    <img
                      src="images/experience.svg"
                      alt="briefcase"
                    />
                  </div>
                </div>
                <div
                  className={`fresh-user ${selected === 'fresher' ? 'selected' : ''}`}
                  onClick={() => {
                    setSelected('fresher');
                    setFormData({ ...formData, workStatus: 'fresher' });
                  }}
                >
                  <div className="text">
                    <h4>I'm a fresher</h4>
                    <p>I am a student/ Haven't worked after graduation</p>
                  </div>
                  <div className="icon">
                    <img
                      src="images/fresher.svg"
                      alt="schoolbag"
                    />
                  </div>
                </div>
              </div>
              <div className="checkbox-section">
                <input className='input-all' type="checkbox" id="updates" name="updates" checked={formData.updates} onChange={handleChange} />
                <label htmlFor="updates" className='label-all'>
                  Send me important updates & promotions via SMS, email, and <i className="fa-brands fa-whatsapp"></i> WhatsApp
                </label>
              </div>
              {errors.updates && <span className="error-message">{errors.updates}</span>}

              <div className="terms-conditions">
                <p>
                  By clicking Register, you agree to the
                  <a href="t&d.html" target="_blank"> Terms and Conditions </a>&
                  <a href="p&p.html" target="_blank"> Privacy Policy </a> of Naukri.com
                </p>
              </div>

              <div className="register-btn">
                <button type="submit" className="reg-btn button-bg-primary border-primary" disabled={
                  !formData.fullName ||
                  !formData.email ||
                  !formData.password ||
                  !formData.confirmPassword ||
                  !formData.mobile ||
                  !formData.updates
                }>Register</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <footer className="Footer-register">
        <div>
          <ul className="ul-footer">
            <li>
              <a href="https://www.acculizeintech.com/about/" target="_blank" rel="noopener noreferrer">
                About Us
              </a>
            </li>
            <li>
              <a href="https://www.acculizeintech.com/contact/" target="_blank" rel="noopener noreferrer">
                Contact Us
              </a>
            </li>
            <li>
              <a
                onClick={() => {
                  navigate("/comingsoonpage");
                }}
                target="_blank"
                rel="noopener noreferrer"
              >
                FAQs
              </a>
            </li>
            <li>
              <a
                onClick={() => {
                  navigate("/comingsoonpage");
                }}
                target="_blank"
                rel="noopener noreferrer"
              >
                Terms and Conditions
              </a>
            </li>
            <li>
              <a
                onClick={() => {
                  navigate("/comingsoonpage");
                }}
                target="_blank"
                rel="noopener noreferrer"
              >
                Report a Problem
              </a>
            </li>
            <li>
              <a style={{ border: "none" }}
                onClick={() => {
                  navigate("/comingsoonpage");
                }}
                target="_blank"
                rel="noopener noreferrer"
              >
                Privacy Policy
              </a>
            </li>
          </ul>
          <p>All rights reserved © 2025 Acculizein Tech Pvt Ltd.</p>
        </div>
      </footer>
    </div>
  );
};
export default Register;
