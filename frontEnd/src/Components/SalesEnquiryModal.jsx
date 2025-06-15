import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const SalesEnquiryModal = ({ show, handleClose }) => {
  const [formData, setFormData] = useState({
    fullname: '',
    mobile: '',
    companyname: '',
    hiringType: '',
    range: '',
    designation: '',
    email: '',
    city: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:3000/send-callback-email', formData);
      if (response.status === 200) {
        alert('Request submitted. We will contact you soon!');
        handleClose();
      }
    } catch (error) {
      console.error('Failed to send callback email:', error);
      alert('Failed to send request. Please try again.');
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Sales Enquiry</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <div className="row">
            <Form.Group className="col-md-6 mb-3">
              <Form.Label>Full name</Form.Label>
              <Form.Control
                type="text"
                name="fullname"
                value={formData.fullname}
                onChange={handleChange}
                placeholder="Enter your name"
              />
            </Form.Group>

            <Form.Group className="col-md-6 mb-3">
              <Form.Label>Mobile number</Form.Label>
              <Form.Control
                type="text"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                placeholder="Enter mobile number"
              />
            </Form.Group>

            <Form.Group className="col-md-6 mb-3">
              <Form.Label>Company/Consultancy name</Form.Label>
              <Form.Control
                type="text"
                name="companyname"
                value={formData.companyname}
                onChange={handleChange}
                placeholder="Enter your company/consultancy name"
              />
            </Form.Group>

            <Form.Group className="col-md-6 mb-3">
              <Form.Label>Hiring for</Form.Label>
              <div>
                <Form.Check
                  inline
                  label="your company"
                  type="radio"
                  name="hiringType"
                  value="company"
                  checked={formData.hiringType === 'company'}
                  onChange={handleChange}
                />
                <Form.Check
                  inline
                  label="a consultancy"
                  type="radio"
                  name="hiringType"
                  value="consultancy"
                  checked={formData.hiringType === 'consultancy'}
                  onChange={handleChange}
                />
              </div>
            </Form.Group>

            <Form.Group className="col-md-6 mb-3">
              <Form.Label>Number of employees</Form.Label>
              <Form.Select name="range" value={formData.range} onChange={handleChange}>
                <option value="">Select range</option>
                <option value="1-10">1-10</option>
                <option value="11-50">11-50</option>
                <option value="51-200">51-200</option>
                <option value="200+">200+</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="col-md-6 mb-3">
              <Form.Label>Designation name</Form.Label>
              <Form.Control
                type="text"
                name="designation"
                value={formData.designation}
                onChange={handleChange}
                placeholder="Enter your designation"
              />
            </Form.Group>

            <Form.Group className="col-md-6 mb-3">
              <Form.Label>Work email ID</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email ID"
              />
            </Form.Group>

            <Form.Group className="col-md-6 mb-3">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="Enter your city name"
              />
            </Form.Group>
          </div>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SalesEnquiryModal;
