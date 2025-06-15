import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { IoPersonCircleOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import Offcanvas from "react-bootstrap/Offcanvas";
import React, { useState, useEffect } from "react";
import FeedbackModal from "./FeedbackModal";
import {
  FaChevronDown,
  FaChevronUp,
  FaRegUser,
  FaCogs,
  FaQuestionCircle,
  FaSignOutAlt,
  FaBuilding,
  FaClipboardList,
  FaCommentDots,
} from "react-icons/fa";

const EmpLoginNavbar = () => {
  console.log("[EmpLoginNavbar] Component rendering");
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [showFeedabackModal, setShowFeedabackModal] = useState(false);
  const [login, setLogin] = useState(false);
  const [userdata, setUserdata] = useState(null);

  useEffect(() => {
    // console.log("[EmpLoginNavbar] useEffect running");
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    // console.log("[EmpLoginNavbar] Token:", token);
    // console.log("[EmpLoginNavbar] User from localStorage:", user);
    if (token && user) {
      try {
        const parsedUser = JSON.parse(user);
        // console.log("[EmpLoginNavbar] Parsed user:", parsedUser);
        setLogin(true);
        setUserdata(parsedUser);
      } catch (error) {
        console.error("[EmpLoginNavbar] Error parsing user:", error);
      }
    }
  }, []);

  const handleLogout = () => {
    console.log("[EmpLoginNavbar] Logging out");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setLogin(false);
    navigate("/EmployerLogin"); // Relative to basename
  };

  const handleCompanyProfileEdit = () => {
    // console.log("[EmpLoginNavbar] Navigating to /companyprofileedit with userdata:", userdata);
    navigate("/companyprofileedit", { state: { userdata } }); // Relative to basename
  };

  const handleSave = () => {
    setShowFeedabackModal(false);
    console.log("[EmpLoginNavbar] Feedback saved");
  };

  return (
    <>
      <Navbar expand="lg" className="custom-navbar" sticky="top">
        <Container>
          <Navbar.Brand href="/" className="navbar-brand d-flex align-items-center">
            <img
              src="images/Skilled Peepal Logo.png"
              alt="Skilled peepal"
              height="60"
              width="200"
              className="me-2 mb-3"
            />
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="main-navbar-nav" />
          <Navbar.Collapse id="main-navbar-nav" style={{ justifyContent: "space-between", alignItems: "center" }}>
            <Nav className="">
              <NavDropdown title="Jobs & Responses" id="jobs-dropdown" className="custom-dropdown">
                <NavDropdown.Item onClick={() => navigate("/postajob")}>Post a Hot Vacancy</NavDropdown.Item>
                <NavDropdown.Item onClick={() => navigate("/postajob")}>Post an Internship</NavDropdown.Item>
                <NavDropdown.Item onClick={() => navigate("/postajob")}>Post a Classified</NavDropdown.Item>
              </NavDropdown>
            </Nav>

            <Nav style={{ alignItems: "inherit" }}>
              <button onClick={() => navigate("/postajob")} type="button" className="btn btn-primary">
                Post a job
              </button>
              <Nav.Link>
                <IoPersonCircleOutline
                  onClick={() => {
                    console.log("[EmpLoginNavbar] Profile icon clicked");
                    setShow(true);
                  }}
                  className="fs-1"
                  style={{ color: "grey" }}
                />
              </Nav.Link>
              <Offcanvas show={show} onHide={() => setShow(false)} placement="end" className="offcanvas-profile">
                <Offcanvas.Header closeButton></Offcanvas.Header>
                <Offcanvas.Body>
                  <div className="profile-header-section">
                    <div className="profile-avatar">
                      <FaRegUser className="avatar-icon" />
                    </div>
                    <div className="profile-info">
                      <h5 className="profile-name">{userdata?.fullName || "N/A"}</h5>
                      <span className="profile-role">{userdata?.designation || "N/A"}</span>
                      <div className="profile-email">{userdata?.loginEmail || "N/A"}</div>
                    </div>
                  </div>

                  <ul className="profile-menu">
                    <li
                      onClick={() => {
                        // console.log("[EmpLoginNavbar] Company Profile clicked");
                        handleCompanyProfileEdit();
                      }}
                    >
                      <FaBuilding /> Company Profile
                    </li>
                    <li>
                      <FaClipboardList /> My Subscriptions
                    </li>
                    <li onClick={() => setShowSettings(!showSettings)} className="flex-column">
                      <div className="dropdown-toggle-drop">
                        <FaCogs /> Settings
                        {showSettings ? <FaChevronUp /> : <FaChevronDown />}
                      </div>
                      {showSettings && (
                        <ul className="submenu">
                          <li onClick={() => navigate("/changepassword")}>Change Password</li>
                        </ul>
                      )}
                    </li>
                    <li onClick={() => setShowHelp(!showHelp)} className="flex-column">
                      <div className="dropdown-toggle-drop">
                        <FaQuestionCircle /> Help
                        {showHelp ? <FaChevronUp /> : <FaChevronDown />}
                      </div>
                      {showHelp && (
                        <ul className="submenu">
                          <li onClick={() => navigate("/reportaproblem")}>Report a problem</li>
                          <li onClick={() => navigate("/employerfaq")}>FAQs</li>
                        </ul>
                      )}
                    </li>
                    <li onClick={() => setShowFeedabackModal(true)}>
                      <FaCommentDots /> Give Feedback
                    </li>
                    {showFeedabackModal && (
                      <FeedbackModal onClose={() => setShowFeedabackModal(false)} onSave={handleSave} />
                    )}
                    <li onClick={handleLogout} className="logout">
                      <FaSignOutAlt /> Logout from Naukri
                    </li>
                  </ul>
                </Offcanvas.Body>
              </Offcanvas>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default EmpLoginNavbar;