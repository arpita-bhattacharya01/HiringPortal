import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const AdminLogin = () => {

    const [logindata, setlogindata] = useState({
        email: "",
        password: ""
    })
    console.log(logindata);

    const navigate = useNavigate();
    const [isOtpLogin, setIsOtpLogin] = useState(false);
    const [mobile, setMobile] = useState('');
    const [isOtpEnabled, setIsOtpEnabled] = useState(false);

    const handleMobileChange = (e) => {
        const number = e.target.value.trim();
        setMobile(number);
        setIsOtpEnabled(/^\d{10}$/.test(number));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("handleSubmit called");

        try {
            console.log("Sending request", logindata);

            const response = await axios.post('http://localhost:3000/admin-login', logindata);

            console.log("Response received", response);

            if (response.status === 200) {
                alert(response.data.message);
                const user = response.data.user;
                console.log("User from response:", user);

                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', JSON.stringify(user));

                if (user.role?.toLowerCase().trim() === "super admin") {
                    console.log("Navigating to Super Admin");
                    navigate('/superAdmin');
                } else {
                    console.log("Navigating to Admin Dashboard");
                    navigate('/admin-dashboard');
                }
            }
        } catch (error) {
            console.error("Login error:", error);
            if (error.response?.data?.message) {
                alert(error.response.data.message);
            } else {
                alert("Something went wrong");
            }
        }
    }

    const handleChange = (e) => {
        console.log(e.target.name, e.target.value);
        setlogindata({
            ...logindata,
            [e.target.name]: e.target.value
        })
    };
    return (
        <div>
            <div className='Login-main'>
                <div className="login-container d-flex">
                    <div className="right p-4 flex-grow-1 ">
                        {!isOtpLogin ? (
                            <form id="form-login">
                                <h1>Login</h1>
                                <div className="mb-3">
                                    <label>Email ID</label>
                                    <input
                                        className="form-control"
                                        type="email"
                                        name='email' // 🔧 fix here
                                        onChange={handleChange}
                                        value={logindata.username}
                                        placeholder="Enter Email ID / Username"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label>Password</label>
                                    <input className="form-control" type="password" name='password' onChange={handleChange} value={logindata.password} placeholder="Enter Password" />
                                    <a className="Forget-password" onClick={() => navigate("/adminforgetpassword")}>Forgot Password?</a>
                                </div>
                                <div className="d-flex gap-2 mb-3 d-flex flex-column">
                                    <button className="btn btn-primary" onClick={handleSubmit} type="submit">Log In</button>
                                    {/* <div className="orSec text-center my-3"></div> */}
                                    {/* <button className="btn btn-outline-primary" type="button" onClick={() => setIsOtpLogin(true)}>
                                        Use OTP to login
                                    </button> */}
                                </div>
                                <div className="orSec text-center my-3"></div>
                                <div className='d-flex justify-content-center'>
                                    <button className="btn btn-danger text-light btn-outline-danger w-50 d-flex align-items-center justify-content-center">
                                        <img src="//static.naukimg.com/s/5/105/i/ic-google.png" alt="Google" width="25" height="25" className="me-2" />
                                        Sign in with Google
                                    </button>
                                </div>

                            </form>
                        ) : (
                            <form id="form-Otp">
                                <h1 className="mb-3">Login</h1>

                                <div className="orSec text-center my-3"></div>
                                <button type="button" className="btn btn-outline-primary w-100">
                                    Use Email to Login
                                </button>
                                <div className="orSec text-center my-3"></div>
                                <button className="btn btn-outline-danger bg-danger w-100 d-flex align-items-center justify-content-center">
                                    <img src="//static.naukimg.com/s/5/105/i/ic-google.png" alt="Google" width="25" height="25" className="me-2" />
                                    Sign in with Google
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default AdminLogin;
