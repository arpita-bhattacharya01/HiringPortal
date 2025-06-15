import React, { useState } from "react";
import axios from "axios";
// import "./CreateAdmin.css"; 

const CreateAdmin = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "Admin", 
  });

  const [message, setMessage] = useState(null);
  const [variant, setVariant] = useState("success");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!form.name || !form.email || !form.password || !form.confirmPassword) {
    setVariant("danger");
    setMessage("All fields are required.");
    return;
  }

  if (form.password !== form.confirmPassword) {
    setVariant("danger");
    setMessage("Passwords do not match.");
    return;
  }

  try {
    const response = await axios.post("http://localhost:3000/create-admin", {
      name: form.name,
      email: form.email,
      password: form.password,
      role: form.role || "Admin",
    });

    if (response.status === 201) {
      setVariant("success");
      setMessage("Admin created successfully!");
      setForm({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "Admin",
      });
    }
  } catch (error) {
    setVariant("danger");
    setMessage(error.response?.data?.error || "Failed to create admin.");
  }
};


  return (
    <div className="container mt-4">
      <h4 className="mb-4">Create New Admin</h4>
      {message && (
        <div className={`alert alert-${variant}`} role="alert">
          {message}
        </div>
      )}
      <form onSubmit={handleSubmit} className="border p-4 rounded shadow-sm bg-white">
        <div className="mb-3">
          <label className="form-label">Full Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter full name"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Email Address</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter email"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter password"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            className="form-control"
            placeholder="Confirm password"
          />
        </div>

        {/* Optional Role Dropdown */}
        <div className="mb-3">
          <label className="form-label">Role</label>
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="form-select"
          >
            <option value="Admin">Admin</option>
            <option value="HR">HR</option>
            <option value="Manager">Manager</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Create Admin
        </button>
      </form>
    </div>
  );
};

export default CreateAdmin;
