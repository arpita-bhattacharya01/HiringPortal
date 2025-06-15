import React, { useState } from 'react';
import Navbar from './Navbar';
import { Button, Form, Nav } from 'react-bootstrap';
import FooterNew from './FooterNew';
// import './UserSettings.css'; 

function UserSettings() {

    const [activeTab, setActiveTab] = useState('account');
  const [email, setEmail] = useState('');
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [location, setLocation] = useState('');
  const [salary, setSalary] = useState('');

  const handleSendOtp = () => {
    if (email.includes('@')) {
      setShowOtp(true);
      alert('OTP sent to email'); // Replace with actual send logic
    } else {
      alert('Enter valid email');
    }
  };

  const handleVerifyOtp = () => {
    if (otp === '1234') { // Mock OTP validation
      alert('Email verified successfully');
      setShowOtp(false);
    } else {
      alert('Invalid OTP');
    }
  };

  const handleSaveChanges = () => {
    alert('Changes saved');
    console.log({ email, mobile, password, location, salary });
  };


  return (
    <>
    <Navbar/>
    
    {/* <div className="container-fluid mt-4">
      <h4 className="mb-4">Settings</h4>
      <div className="row">
    
        <div className="col-md-3">
          <ul className="list-group">
            <li
              className={`list-group-item ${activeTab === 'account' ? 'active' : ''}`}
              onClick={() => setActiveTab('account')}
              style={{ cursor: 'pointer' }}
            >
              Account
            </li>
            <li
              className={`list-group-item ${activeTab === 'preferences' ? 'active' : ''}`}
              onClick={() => setActiveTab('preferences')}
              style={{ cursor: 'pointer' }}
            >
              Job Preferences
            </li>
            <li
              className={`list-group-item ${activeTab === 'block' ? 'active' : ''}`}
              onClick={() => setActiveTab('block')}
              style={{ cursor: 'pointer' }}
            >
              Block Companies
            </li>
          </ul>
        </div> */}

        {/* Content Area */}
        {/* <div className="col-md-9">
          {activeTab === 'account' && (
            <div>
              <h5>Account Settings</h5>
              <p className="text-muted">Change your email, mobile number or password.</p>
              <div className="mb-3">
                <label>Email Address</label>
                <input type="email" className="form-control" defaultValue="youremail@example.com" />
              </div>
              <div className="mb-3">
                <label>Mobile Number</label>
                <input type="text" className="form-control" defaultValue="9876543210" />
              </div>
              <div className="mb-3">
                <label>Password</label>
                <input type="password" className="form-control" placeholder="Change Password" />
              </div>
              <button className="btn btn-primary">Save Changes</button>
            </div>
          )}

          {activeTab === 'preferences' && (
            <div>
              <h5>Job Preferences</h5>
              <p className="text-muted">Update your preferred job location and expected salary.</p>
              <div className="mb-3">
                <label>Preferred Location</label>
                <input type="text" className="form-control" placeholder="e.g. Bangalore, Delhi" />
              </div>
              <div className="mb-3">
                <label>Expected Salary (per annum)</label>
                <input type="text" className="form-control" placeholder="e.g. ₹6,00,000" />
              </div>
              <button className="btn btn-success">Save Preferences</button>
            </div>
          )}

          {activeTab === 'block' && (
            <div>
              <h5>Block Companies</h5>
              <p className="text-muted">You can block companies from viewing your profile here.</p>
              <input type="text" className="form-control" placeholder="Enter company name to block" />
              <button className="btn btn-danger mt-2">Block</button>
            </div>
          )}
        </div> */}
    

    <div className="container mt-4">
      <h4 className="mb-4">Settings</h4>
      <div className="row">
        <div className="col-md-3">
          <Nav className="flex-column nav-pills">
            <Nav.Link onClick={() => setActiveTab('account')} active={activeTab === 'account'}>
              Account
            </Nav.Link>
            <Nav.Link onClick={() => setActiveTab('preferences')} active={activeTab === 'preferences'}>
              Job Preferences
            </Nav.Link>
            <Nav.Link onClick={() => setActiveTab('block')} active={activeTab === 'block'}>
                Block
            </Nav.Link>
          </Nav>
        </div>

        <div className="col-md-9">
          {activeTab === 'account' && (
            <Form>
              <h5>Account Settings</h5>
              <Form.Group className="mb-3">
                <Form.Label>Email Address</Form.Label>
                <div className="d-flex gap-2">
                  <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter new email"
                  />
                  <Button variant="primary" onClick={handleSendOtp}>Send OTP</Button>
                </div>
              </Form.Group>

              {showOtp && (
                <Form.Group className="mb-3">
                  <Form.Label>Enter OTP</Form.Label>
                  <div className="d-flex gap-2">
                    <Form.Control
                      type="text"
                      maxLength={4}
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      placeholder="4-digit OTP"
                    />
                    <Button variant="success" onClick={handleVerifyOtp}>Verify OTP</Button>
                  </div>
                </Form.Group>
              )}

              <Form.Group className="mb-3">
                <Form.Label>Mobile Number</Form.Label>
                <Form.Control
                  type="text"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  placeholder="Enter mobile number"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter new password"
                />
              </Form.Group>

              <Button onClick={handleSaveChanges}>Save Changes</Button>
            </Form>
          )}

          {activeTab === 'preferences' && (
            <Form>
              <h5>Job Preferences</h5>
              <Form.Group className="mb-3">
                <Form.Label>Preferred Location</Form.Label>
                <Form.Control
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Enter preferred job location"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Expected Salary</Form.Label>
                <Form.Control
                  type="text"
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                  placeholder="Enter expected salary"
                />
              </Form.Group>

              <Button onClick={handleSaveChanges}>Save Preferences</Button>
            </Form>
            
          )}

          {activeTab === 'block' && (
            <div>
              <h5>Block Companies</h5>
              <p className="text-muted">You can block companies from viewing your profile here.</p>
              <input type="text" className="form-control" placeholder="Enter company name to block" />
              <button className="btn btn-danger mt-2">Block</button>
            </div>
          )}
        </div>
      </div>
    </div>
    
    <FooterNew/>
    </>
  );
}

export default UserSettings;
