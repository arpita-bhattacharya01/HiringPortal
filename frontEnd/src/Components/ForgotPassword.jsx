import React, { useState } from 'react';
import './ForgotPassword.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [accountType, setaccountType] = useState("user")
    const [isOtpVerified, setIsOtpVerified] = useState(false);
    const navigate = useNavigate();

    const sendOtp = async (email, accountType) => {
        if (!email || !email.includes('@')) {
            alert('Please enter a valid email address.');
            return;
        }
        try {
            const res = await axios.post('http://localhost:3000/forgot-password', {
                email,
                accountType
            });
            alert(res.data.message);
        } catch (error) {
            alert(error.response?.data?.message || "Error sending email");
        }
    };

    const handleGo = async () => {
        await sendOtp(email, accountType);
    };

    const handleVerifyOtp = async () => {
        try {
            const res = await axios.post('http://localhost:3000/verify-otp', { otp, email });
            alert(res.data.message);
            setIsOtpVerified(true);
        } catch (error) {
            alert(error.response?.data?.message || 'OTP verification failed');
        }
    };
    const handlePasswordReset = async () => {
        if (newPassword !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }
        try {
            const res = await axios.post('http://localhost:3000/reset-password', {
                email,
                newPassword,
                accountType
            });
            alert(res.data.message);
            if (accountType === "user") {
                navigate('/login');
            } else {
                navigate("/EmployerLogin");
            }
        } catch (error) {
            alert(error.response?.data?.message || 'Password reset failed');
        }
    };

    return (
        <div className="forgot-container">
            <div className="forgot-card">
                <button className="close-button" onClick={() => navigate("/login")}>×</button>
                <h2>Forgot Password</h2>

                <div className='d-flex align-items-center'>
                    <button className="google-button">
                        <img src="https://img.icons8.com/color/16/000000/google-logo.png" alt="google" />
                        Sign in with Google
                    </button>
                </div>



                <div className="input-group">
                    <label>Account Type</label>
                    <select value={accountType} onChange={(e) => setaccountType(e.target.value)}>
                        <option value="user">User</option>
                        <option value="employer">Employer</option>
                    </select>
                </div>

                <div className="input-group">
                    <label>Email ID</label>
                    <div className="input-with-button">
                        <input
                            type="email"
                            placeholder="Enter Email ID"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <button onClick={handleGo} className='go-btn'>GO</button>
                    </div>
                </div>

                <div className="input-group">
                    <label>OTP</label>
                    <div className="input-with-button">
                        <input className='otp-input'
                            type="text"
                            placeholder="Enter OTP"
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
                    <span className="resend-otp" onClick={() => sendOtp(email)}>Resend OTP</span>

                </div>

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

export default ForgotPassword;
