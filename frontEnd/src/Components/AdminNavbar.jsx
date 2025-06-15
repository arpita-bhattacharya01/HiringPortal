import React, { useState, useRef } from 'react';
import {
  Navbar,
  Dropdown,
  Container,
  Modal,
  Button
} from 'react-bootstrap';
import { Camera } from 'lucide-react';
import { FaBars } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import AvatarEditor from 'react-avatar-editor';
// import logo from './logo.png'; // Replace with your logo path
// import profileImg from './admin.png'; // Replace with admin image path

const AdminNavbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [profileImage, setProfileImage] = useState('https://www.pinclipart.com/picdir/middle/95-958614_man-icon-person-logo-png-clipart.png');
  const [zoom, setZoom] = useState(1.2);
  const [showEditor, setShowEditor] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [userdata, setuserdata] = useState()
  const [isLoggedIn, setisLoggedIn] = useState(false)
  const navigate = useNavigate();
  const editorRef = useRef();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setisLoggedIn(false);
    navigate('/admin-login');
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log("token inside useeffect", token)
    const user = JSON.parse(localStorage.getItem('user'))
    console.log("data inside useeffect", user)
    if (token) setisLoggedIn(true);
    setuserdata(user)
  }, []);





  const handleCameraClick = () => {
    document.getElementById("adminProfileUpload").click();
  };


  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setShowEditor(true);
    }
  };

  const handleSaveImage = async () => {
    if (editorRef.current) {
      const canvas = editorRef.current.getImageScaledToCanvas().toDataURL();
      setProfileImage(canvas); // Update UI preview
      setShowEditor(false);

    }
  };

  return (
    <Navbar bg="light" expand="lg" className="shadow-sm px-3 w-100">
      <Container fluid className="d-flex justify-content-between align-items-center flex-column flex-sm-row">
        {/* Left Side: Logo */}
        <Navbar.Brand href="/admin-dashboard" className="d-flex align-items-center gap-2">
          <img
            src="images/Skilled Peepal Logo.png " height={"50px"} width={"200px"}
            alt="skilled peepal" style={{ marginBottom: '19px' }}
          />
        </Navbar.Brand>

        {/* Right Side: Admin Info and Menu */}

        <div className="d-flex align-items-center gap-3">
          <img
            src={profileImage} className='position-relative'
            alt="Admin"
            height="45"
            width="45"
            style={{
              borderRadius: '50%', objectFit: 'cover', cursor: 'pointer', border: "3px solid #70b8e4",
              borderRadius: "50%"
            }}
            onClick={handleCameraClick}
            title="Click to change profile image"
          />
          <button
            className="btn btn-sm btn-primary position-absolute"
            style={{ top: '6px', right: '8.5%', borderRadius: '50%', padding: '6px' }}
            onClick={handleCameraClick}
            disabled={uploading}
          >
            <Camera size={16} />
          </button>
          <input
            type="file"
            accept="image/*"
            id="adminProfileUpload"
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
          <div className="d-none d-md-block text-end flex-direction-row">
            <div className="fw-bold">{userdata?.name}</div>
          </div>
          <Dropdown show={showMenu} onToggle={() => setShowMenu(!showMenu)} align="end">
            <Dropdown.Toggle as="span" id="dropdown-custom" onClick={() => setShowMenu(!showMenu)} style={{ cursor: 'pointer' }}>
              <FaBars size={20} />
            </Dropdown.Toggle>
            <Dropdown.Menu style={{ top: "33px" }}>
              {userdata?.role === "Super Admin " ? (
                <Dropdown.Item onClick={() => navigate('/superAdmin')}>
                  Dashboard
                </Dropdown.Item>
              ) : (
                <Dropdown.Item onClick={() => navigate('/admin-dashboard')}>
                  Dashboard
                </Dropdown.Item>
              )}
              <Dropdown.Item onClick={() => { navigate('/admin-change-password') }}>Change Password</Dropdown.Item>
              <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </Container>
      {/* Avatar Editor Modal */}
      <Modal show={showEditor} onHide={() => setShowEditor(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile Image</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          {selectedImage && (
            <AvatarEditor
              ref={editorRef}
              image={selectedImage}
              width={250}
              height={250}
              border={50}
              borderRadius={125}
              color={[255, 255, 255, 0.6]}
              scale={zoom}
              rotate={0}
            />
          )}

          {/* 🔍 Zoom Slider */}
          <div className="my-2 text-center">
            <label htmlFor="zoomRange" className="form-label fw-semibold">
              Zoom
            </label>
            <input
              id="zoomRange"
              type="range"
              min="1"
              max="3"
              step="0.01"
              value={zoom}
              onChange={(e) => setZoom(parseFloat(e.target.value))}
              className="form-range"
              style={{ width: "200px", margin: "0 auto" }}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditor(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleSaveImage}>Save Image</Button>
        </Modal.Footer>
      </Modal>
    </Navbar>
  );
};

export default AdminNavbar;
