import React, { useState } from 'react';
import './ChangePassword.css'; // Optional: add your custom styles here
import EmpLoginFooter from './EmpLoginFooter';
import EmpLoginNavbar from './EmpLoginNavbar';
import axios from 'axios';

const ChangePassword = ({ username }) => {
const [oldPassword, setOldPassword] = useState('');
const [newPassword, setNewPassword] = useState('');
const [confirmPassword, setConfirmPassword] = useState('');


  const handleSubmit = async (e) => {
  console.log("handle Submit click");
  e.preventDefault();

  if (newPassword !== confirmPassword) {
    alert("New Password and Confirm Password do not match.");
    return;
  }

  try {
    const token = localStorage.getItem('token');
    console.log("This is the token:", token);

    const loginEmail = localStorage.getItem("loginEmail");
    console.log("This is login email:", loginEmail);

    const response = await axios.post("http://localhost:3000/update-password",
      {
        loginEmail,
        password: oldPassword,
        newPassword,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 200) {
      alert("Password updated successfully");
    }
  } catch (error) {
    console.error("Error response:", error.response?.data || error.message);
    alert("Password updation failed. Try again!");
  }
};

  return (
    <>
      <EmpLoginNavbar />
      <div style={{ padding: '40px' }}>
        <h2 style={{ color: '#f58220' }}>Change Password</h2>
        <p style={{ textAlign: 'right', color: 'red' }}>* Mandatory Fields</p>
        <form onSubmit={handleSubmit} style={{ maxWidth: '600px' }}>
          <div style={{ marginBottom: '10px' }}>
            <label><strong>Username:</strong> {localStorage?.loginEmail}</label>
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label>*Enter Old Password: </label><br />
            <input
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
              style={{ width: '100%' }}
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label>*Enter New Password: </label><br />
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              style={{ width: '100%' }}
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label>*Confirm New Password: </label><br />
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              style={{ width: '100%' }}
            />
          </div>
          <div style={{ backgroundColor: '#e8f1f9', padding: '20px', textAlign: 'center', border: '1px solid #0056a6' }}>
            <button type="submit" style={{ padding: '10px 30px', fontSize: '16px' }}>Save</button>
          </div>
        </form>
      </div>
      <EmpLoginFooter />
    </>
  );
};

export default ChangePassword;
