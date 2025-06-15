import React, { useState } from 'react';
import { Modal, Button, Form, Badge } from 'react-bootstrap';
import axios from 'axios'

const CareerProfileForm = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({
    industry: 'IT Services & Consulting',
    department: 'Project & Program Management',
    roleCategory: 'Technology / IT',
    jobRole: 'IT Project Lead',
    jobType: 'Permanent',
    employmentType: 'Full time',
    shift: '',
    locations: ['New Delhi', 'Gurgaon/Gurugram', 'Bangalore/Bengaluru', 'Mumbai', 'Pune', 'Chennai', 'Agra', 'Ghaziabad', 'Noida', 'Greater Noida'],
    salary: ''
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSalaryChange = (e) => {
    const salary = e.target.value.replace(/[^\d]/g, '');
    handleChange('salary', salary);
  };

  const handleSubmit = () => {
    const token = localStorage.getItem("token")
    const response = axios.post('http://localhost:3000/user-carrier-data',
      {
        ...formData
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    onSave(formData);
    onClose();
  };

  return (
    <Modal show onHide={onClose} centered>
      <Modal.Header closeButton className="border-0">
        <Modal.Title>Career Profile</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Current Industry</Form.Label>
            <Form.Select value={formData.industry} onChange={(e) => handleChange('industry', e.target.value)}>
              <option>IT Services & Consulting</option>
              <option>Software Development</option>
              <option>Finance</option>
              <option>Healthcare</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Department</Form.Label>
            <Form.Select value={formData.department} onChange={(e) => handleChange('department', e.target.value)}>
              <option>Project & Program Management</option>
              <option>Software Engineering</option>
              <option>Product Management</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Role Category</Form.Label>
            <Form.Select value={formData.roleCategory} onChange={(e) => handleChange('roleCategory', e.target.value)}>
              <option>Technology / IT</option>
              <option>Business / Management</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Job Role</Form.Label>
            <Form.Select value={formData.jobRole} onChange={(e) => handleChange('jobRole', e.target.value)}>
              <option>IT Project Lead</option>
              <option>Project Manager</option>
              <option>Scrum Master</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Desired Job Type</Form.Label><br />
            <Form.Check inline label="Permanent" checked={formData.jobType === 'Permanent'} onChange={() => handleChange('jobType', 'Permanent')} />
            <Form.Check inline label="Contractual" checked={formData.jobType === 'Contractual'} onChange={() => handleChange('jobType', 'Contractual')} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Desired Employment Type</Form.Label><br />
            <Form.Check inline label="Full time" checked={formData.employmentType === 'Full time'} onChange={() => handleChange('employmentType', 'Full time')} />
            <Form.Check inline label="Part time" checked={formData.employmentType === 'Part time'} onChange={() => handleChange('employmentType', 'Part time')} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Preferred Shift</Form.Label><br />
            <Form.Check inline label="Day" checked={formData.shift === 'Day'} onChange={() => handleChange('shift', 'Day')} />
            <Form.Check inline label="Night" checked={formData.shift === 'Night'} onChange={() => handleChange('shift', 'Night')} />
            <Form.Check inline label="Flexible" checked={formData.shift === 'Flexible'} onChange={() => handleChange('shift', 'Flexible')} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Preferred Work Locations (Max 10)</Form.Label><br />
            <div>
              {formData.locations.map((loc, idx) => (
                <Badge key={idx} bg="secondary" className="me-1 mb-1 p-2 rounded-pill">{loc}</Badge>
              ))}
            </div>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Expected Salary</Form.Label>
            <Form.Control
              type="text"
              placeholder="Eg. 4,50,000"
              value={formData.salary}
              onChange={handleSalaryChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer className="border-0">
        <Button variant="secondary" onClick={onClose}>Cancel</Button>
        <Button variant="primary" onClick={handleSubmit}>Save</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CareerProfileForm;
