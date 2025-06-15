import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const Login = () => {

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
        try {
            const response = await axios.post('http://localhost:3000/login', logindata);

            if (response.status === 200) {
                alert(response.data.message);

                // Store token and user info in localStorage
                const user = response.data.user;
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', JSON.stringify(response.data.user)); 
                console.log(user)
                navigate('/user-dashboard');  
            }

        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                alert(error.response.data.message); // shows "User not found", "Invalid credentials", etc.
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
            <Navbar />
            <div className='Login-main'>
                <div className="login-container d-flex">
                    {/* Left Side */}
                    <div className="left p-3">
                        <h3>New to Naukri</h3>
                        <div className="info-list">
                            <p>✓ One click apply using naukri profile.</p>
                            <p>✓ Get relevant job recommendations.</p>
                            <p>✓ Showcase profile to top companies and consultants.</p>
                            <p>✓ Know application status on applied jobs.</p>
                        </div>
                        <div className="mt-3">
                            <div className="btn btn-outline-primary w-100" onClick={() => navigate("/register")}>
                                Register for Free
                            </div>
                        </div>
                        <div className="mt-3 d-flex justify-content-center">
                            <img src="images/register2.jpg" alt="register" height="200px" width="100px" />
                        </div>
                    </div>

                    {/* Right Side */}
                    <div className="right p-4 flex-grow-1">
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
                                    <a className = "Forget-password"onClick={() => navigate("/forgetpassword")}>Forgot Password?</a>
                                </div>
                                <div className="d-flex gap-2 mb-3 d-flex flex-column">
                                    <button className="btn btn-primary" onClick={handleSubmit} type="submit">Log In</button>
                                   
                                </div>
                                <div className="orSec text-center my-3"></div>
                                <button className="btn btn-outline-danger w-100 d-flex align-items-center justify-content-center">
                                    <img src="//static.naukimg.com/s/5/105/i/ic-google.png" alt="Google" width="25" height="25" className="me-2" />
                                    Sign in with Google
                                </button>
                            </form>
                        ) : (
                            <form id="form-Otp">
                                <h1 className="mb-3">Login</h1>
                                <div className="orSec text-center my-3"></div>
                                <button type="button" className="btn btn-outline-primary w-100">
                                    Use Email to Login
                                </button>
                                <div className="orSec text-center my-3"></div>
                                <button className="btn btn-outline-danger w-100 d-flex align-items-center justify-content-center">
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
export default Login;
