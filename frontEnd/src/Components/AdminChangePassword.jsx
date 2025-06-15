import React, { useState , useEffect } from "react";
import { Container, Form, Button, Alert, Card } from "react-bootstrap";
import AdminNavbar from "./AdminNavbar";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

const AdminChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [variant, setVariant] = useState("success");
  const navigate = useNavigate();
  useEffect(() => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login", { replace: true }); // Redirect if not logged in
      }
    }, [navigate]);


console.log(oldPassword);
const handleSubmit = async (e) => {
  console.log("handle submit click")
  e.preventDefault();

  if (!oldPassword || !newPassword || !confirmPassword) {
    setMessage("Please fill in all fields.");
    setVariant("danger");
    return;
  }

  if (newPassword !== confirmPassword) {
    setMessage("New passwords do not match.");
    setVariant("danger");
    return;
  }

  try {
    const token = localStorage.getItem("token"); 
    console.log(token)
    const response = await axios.post("http://localhost:3000/change-admin-password",
      {
        oldPassword,
        newPassword
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    console.log(response)
    setMessage("Password updated successfully.");
    setVariant("success");

    // Clear fields
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");

  } catch (error) {
    const errMsg =
      error.response?.data?.message || "Something went wrong. Please try again.";
    setMessage(errMsg);
    setVariant("danger");
  }
};


  return (
    <>
     <AdminNavbar/>
    <Container className="mt-5 d-flex justify-content-center">
       
      <Card style={{ width: "100%", maxWidth: "500px" }}>
        <Card.Body>
          <Card.Title className="mb-4 text-center">Change Password</Card.Title>
          {message && <Alert variant={variant}>{message}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Current Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter current password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Confirm New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Update Password
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
    </>
  );
};

export default AdminChangePassword;
