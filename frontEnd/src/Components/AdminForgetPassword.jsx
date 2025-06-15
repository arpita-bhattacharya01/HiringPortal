import React, { useState } from 'react';
import './ForgotPassword.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const navigate = useNavigate();
  console.log(email)
  const sendOtp = async () => {
    if (!email || !email.includes('@')) {
      alert('Please enter a valid email address.');
      return;
    }
    try {
      const response = await axios.post('http://localhost:3000/send-otp',{
          email : email
      })
      if (response.status === 200) {
        setIsOtpSent(true);
        alert(`OTP sent to ${email}`);
      }
    } catch (error) {
      console.log("An error accured while sending otp")
    } 
  };

  const handleVerifyOtp = async() => {
    try {
      const response = await axios.post('http://localhost:3000/verify-otp', {
          email : email, 
          otp : otp
      })
      if(response.status === 200){
         alert("otp verified successfully")
         setIsOtpVerified(true)
      }
    } catch (error) {
      console.error("Error in verifying otp")
      alert("Invalid OTP")
    }  
  };

  const handlePasswordReset = async () => {
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
    try {
       const response = await axios.patch("http://localhost:3000/setadmin-password", {
       newpassword : newPassword,
       email : email
    })
    if(response.status === 200){
      alert("Password updated Successfully")
      navigate('/admin-login');
    } 
    } catch (error) {
       console.log("Am error accured", error)
       alert("Password Updation Failed") 
    }
  };

  return (
    <div className="forgot-container">
      <div className="forgot-card">
        <button className="close-button" onClick={() => navigate("/AdminLogin")}>×</button>
        <h2>Admin</h2><h4>Forgot Password</h4>

        <div className='d-flex justify-content-center'>
          <button className="google-button">
            <img src="https://img.icons8.com/color/16/000000/google-logo.png" alt="google" />
            Sign in with Google
          </button>
        </div>



        <div className="input-group">
          <label>Email ID</label>
          <div className="input-with-button">
            <input
              type="email"
              placeholder="Enter Admin Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button onClick={sendOtp} className='go-btn'>GO</button>
          </div>
        </div>

        {isOtpSent && (
          <div className="input-group">
            <label>OTP</label>
            <div className="input-with-button">
              <input
                type="text"
                placeholder="Enter OTP (mock: 1234)"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
              <button
                className="verify-button"
                disabled={!otp}
                onClick={handleVerifyOtp}
              >
                VERIFY OTP
              </button>
            </div>
            <span className="resend-otp" onClick={sendOtp}>Resend OTP</span>
          </div>
        )}

        {isOtpVerified && (
          <>
            <div className="input-group">
              <label>New Password</label>
              <input
                type="password"
                placeholder="Enter New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div className="input-group">
              <label>Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <button
              className="submit-button"
              disabled={!newPassword || !confirmPassword}
              onClick={handlePasswordReset}
            >
              RESET PASSWORD
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminForgotPassword;
