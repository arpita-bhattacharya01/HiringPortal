import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./EmployerRegister.css";
import axios from "axios";

const EmployerRegister = () => {
  const navigate = useNavigate();
  const [loginemail, setloginEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginemail);
  const isOtpValid = otp.length === 4;

 const handleVerifyOtp = async () => {
    try {
      const res = await axios.post("http://localhost:3000/verify-otp", {
        email: loginemail,  
        otp: otp,
      });
      alert(res.data.message); 
      localStorage.setItem("loginEmail", loginemail); 
      navigate("/empbasicDetails");
    } catch (error) {
      alert(error.response?.data?.message || "OTP verification failed");
    }
  };

  const handleSendOtp = async () => {
    if (isEmailValid) {
      try {
        console.log(loginemail);
        const checkEmailRes = await axios.post("http://localhost:3000/check-employer-email", {
          email: loginemail,
        });
        if (checkEmailRes.data.exists) {
          alert("Email already registered. Please login.");
          return;
        }

        await axios.post("http://localhost:3000/send-otp", {
          email: loginemail,
        });
        setOtpSent(true);
        alert(`OTP sent to your ${loginemail}`);
      } catch (error) {
        alert(error.response?.data?.message || "Error sending OTP");
      }
    }
  };
  return (
    <>
      <nav className="empreg-navbar position-fixed  w-100">
        <div className="container my-3">
          <a className="navbar-brand" href="#">
            <img
              src="images/Skilled Peepal Logo.png"
              height={"70px"}
              width={"150px"}
              alt="Logo"
            />
          </a>
        </div>
      </nav>
      <div className="empreg-wrapper d-flex justify-content-center">
        <div className="empreg-container">
          <div className="empreg-left">
            <h1>
              Find & hire
              <br />
              the right talent with us
            </h1>
            <p>Trusted by 9 Cr+ candidates | 5 Lakh+ employers</p>
            <div className="empreg-avatars">
              {[...Array(5)].map((_, i) => (
                <div className="empreg-avatar" key={i}>
                  <img
                    className="rounded-pill"
                    height={"50px"}
                    width={"50px"}
                    src="https://www.profilebakery.com/wp-content/uploads/2023/04/Profile-Image-AI.jpg"
                    alt=""
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="empreg-right">
            <div className="empreg-form">
              <h2>Continue with email</h2>

              <label className="empreg-label">Email address</label>
              <input
                className="empreg-input"
                type="email"
                placeholder="Enter email address"
                value={loginemail}
                onChange={(e) => setloginEmail(e.target.value)}
              />

              <button
                className="empreg-btn"
                onClick={handleSendOtp}
                disabled={!isEmailValid}
              >
                Send OTP
              </button>

              {otpSent && (
                <>
                  <label className="empreg-label">Enter 4-digit OTP</label>
                  <input
                    className="empreg-input"
                    type="text"
                    maxLength={4}
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) =>
                      setOtp(e.target.value.replace(/\D/g, ""))
                    }
                  />
                  <button
                    onClick={handleVerifyOtp}
                    // onClick={() => navigate("/empbasicDetails")}
                    className="empreg-btn"
                    disabled={!isOtpValid}
                  >
                    Verify OTP
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default EmployerRegister;
