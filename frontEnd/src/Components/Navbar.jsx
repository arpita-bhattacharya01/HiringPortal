import React from "react";
import { useState, useEffect } from "react";
import "./Navbar.css";
import { Navigate, NavLink } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { ImMenu } from "react-icons/im";
import { FaGear } from "react-icons/fa6";
import { FaQuestionCircle } from "react-icons/fa";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
// import { useNavigate } from "react-router-dom";
import "./offCanvasLogin.css";

import { FaUserCircle } from 'react-icons/fa';
import SearchBar from "./SearchBar";
import JobSearch from "./Jobsearch";


const Navbar = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [isLoggedIn, setisLoggedIn] = useState(false)
  const [userdata, setuserdata] = useState(null)
  const navigate = useNavigate();
  const [searchclick, setsearchclick] = useState(true)
  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'))
    if (token) setisLoggedIn(true);
    setuserdata(user)
  }, []);
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setisLoggedIn(false);
    navigate('/login');
  };

  const handleSearch = () => {
    console.log("Search clicked!");
    setsearchclick((prev) => !prev);
  };

  return (
    <div id="navwidth">
      <div id="navbar">
        <div id="imgs">
          <img
            src="images/Skilled Peepal Logo.png " height={"50px"} width={"200px"}
            alt="skilled peepal" style={{marginBottom: '19px'}}
          />
        </div>
        
        {!isLoggedIn ? (
          <>
          <nav>
            <ul className="container ul-reset">
              <li className="droppable">
                <a href="#">Jobs</a>
                <div className="mega-menu">
                  <div className="container cf">
                    <ul className="ul-reset py-3">
                      <h5>Popular categories</h5>
                      <li><a  onClick={() => { navigate("/carrier") }}>IT jobs</a></li>
                      <li><a  onClick={() => { navigate("/carrier") }} >Sales jobs</a></li>
                      <li><a  onClick={() => { navigate("/carrier") }} >Marketing jobs</a></li>
                      <li><a  onClick={() => { navigate("/carrier") }} >Data Science jobs</a></li>
                      <li><a  onClick={() => { navigate("/carrier") }}>HR jobs</a></li>
                      <li><a  onClick={() => { navigate("/carrier") }} >Engineering jobs</a></li>
                    </ul>
                   
                    <ul className="ul-reset py-3">
                      <h5>Jobs in demand</h5>
                      <li><a onClick={() => { navigate("/carrier") }}>Fresher jobs</a></li>
                      <li><a onClick={() => { navigate("/carrier") }}>MNC jobs</a></li>
                      <li><a onClick={() => { navigate("/carrier") }}>Remote jobs</a></li>
                      <li><a onClick={() => { navigate("/carrier") }}>Work from home jobs</a></li>
                      <li><a onClick={() => { navigate("/carrier") }}>Walk-in jobs</a></li>
                    </ul>
                    <ul className="ul-reset py-3">
                      <h5>Explore more jobs</h5>
                      <li><a  onClick={() => { navigate("/carrier") }}>Jobs by category</a></li>
                      <li><a  onClick={() => { navigate("/carrier") }}>Jobs by skill</a></li>
                      <li><a  onClick={() => { navigate("/carrier") }}>Jobs by location</a></li>
                      <li><a  onClick={() => { navigate("/carrier") }}>Jobs by designation</a></li>
                      <li><a  onClick={() => { navigate("/carrier") }}>Create free job alert</a></li>
                    </ul>
                    <ul className="ul-reset py-3">
                      <h5>Jobs by location</h5>
                      <li><a  onClick={() => { navigate("/carrier") }}>Jobs in Delhi</a></li>
                      <li><a  onClick={() => { navigate("/carrier") }}>Jobs in Mumbai</a></li>
                      <li><a  onClick={() => { navigate("/carrier") }}>Jobs in Bangalore</a></li>
                      <li><a  onClick={() => { navigate("/carrier") }}>Jobs in Hyderabad</a></li>
                      <li><a  onClick={() => { navigate("/carrier") }}>Jobs in Chennai</a></li>
                      <li><a  onClick={() => { navigate("/carrier") }}>Pune</a></li>
                    </ul>
                  </div>
                </div>
              </li>
              <li className="droppable">
                <a href="#">Companies</a>
                <div className="mega-menu">
                  <div className="container cf">
                    <ul className="ul-reset py-3">
                      <h5>Explore categories</h5>
                      <li><a  onClick={() => { navigate("/carrier") }}>Unicorn</a></li>
                      <li><a  onClick={() => { navigate("/carrier") }}>MNCs</a></li>
                      <li><a  onClick={() => { navigate("/carrier") }}>Startup</a></li>
                      <li><a  onClick={() => { navigate("/carrier") }}>Product based</a></li>
                      <li><a  onClick={() => { navigate("/carrier") }}>Internet</a></li>
                    </ul>
                    <ul className="ul-reset py-3">
                      <h5>Explore collections</h5>
                      <li><a  onClick={() => { navigate("/carrier") }}>Top companies</a></li>
                      <li><a  onClick={() => { navigate("/carrier") }}>Fintech companies</a></li>
                      <li><a  onClick={() => { navigate("/carrier") }}>Edtech companies</a></li>
                      <li><a  onClick={() => { navigate("/carrier") }}>Featured companies</a></li>
                      <li><a  onClick={() => { navigate("/carrier") }}>Sponsored companies</a></li>
                    </ul>
                    <ul className="ul-reset py-3">
                      <h5>Research companies</h5>
                      <li><a onClick={()=>{navigate('/comingsoonpage')}}>Interview questions</a></li>
                      <li><a onClick={()=>{navigate('/comingsoonpage')}}>Company salaries</a></li>
                      <li><a onClick={()=>{navigate('/comingsoonpage')}}>About companies</a></li>
                      <li><a onClick={()=>{navigate('/comingsoonpage')}}>Company reviews</a></li>
                    </ul>
                  </div>
                </div>
              </li>
              <li className="droppable">
                <a href="#">Services</a>
                <div className="mega-menu">
                  <div className="container cf">
                    <ul className="ul-reset py-3">
                      <h5>Resume writing</h5>
                      <li><a onClick={()=>{navigate('/comingsoonpage')}}>Text resume</a></li>
                      <li><a onClick={()=>{navigate('/comingsoonpage')}}>Visual resume</a></li>
                      <li><a onClick={()=>{navigate('/comingsoonpage')}}>Resume critique</a></li>
                    </ul>
                    <ul className="ul-reset py-3">
                      <h5>Find jobs</h5>
                      <li><a onClick={()=>{navigate('/comingsoonpage')}}>Jobs4u</a></li>
                      <li><a onClick={()=>{navigate('/comingsoonpage')}}>Priority applicant</a></li>
                    </ul>
                    <ul className="ul-reset py-3">
                      <h5>Get recruiter's attention</h5>
                      <li><a onClick={()=>{navigate('/comingsoonpage')}}>Resume display</a></li>
                      <li><a onClick={()=>{navigate('/comingsoonpage')}}>Recruiter connection</a></li>
                      <li><a onClick={()=>{navigate('/comingsoonpage')}}>Job search booster</a></li>
                    </ul>
                  </div>
                </div>
              </li>
              <li className="droppable">
                <a href="#">Resources</a>
                <div className="mega-menu">
                  <div className="container cf">
                    <ul className="ul-reset py-3">
                      <h5>Free resume resources</h5>
                      <li><a onClick={()=>{navigate('/comingsoonpage')}}>Resume maker for freshers</a></li>
                      <li><a onClick={()=>{navigate('/comingsoonpage')}}>Resume quality score</a></li>
                      <li><a onClick={()=>{navigate('/comingsoonpage')}}>Resume samples</a></li>
                      <li><a onClick={()=>{navigate('/comingsoonpage')}}>Job letter samples</a></li>
                    </ul>
                    <ul className="ul-reset py-3">
                      <h5>More resources</h5>
                      <li><a onClick={()=>{navigate('/comingsoonpage')}}>How to use Naukri</a></li>
                      <li><a onClick={()=>{navigate('/comingsoonpage')}}>Naukri blog</a></li>
                      <li><a onClick={()=>{navigate('/comingsoonpage')}}>FAQs</a></li>
                      <li><a onClick={()=>{navigate('/comingsoonpage')}}>Take home salary calculator</a></li>
                      <li><a onClick={()=>{navigate('/comingsoonpage')}}>Naukri labs</a></li>
                    </ul>
                  </div>
                </div>
              </li>
            </ul>
          </nav>
            <div id="btn">
              <div className="login text-primary" onClick={() => { navigate("/login") }}>Login</div>
              <div className="reg" onClick={() => { navigate("/register") }}>Register</div>
            </div>
            <ul className="m-0">
              <li className="droppable">
                <a href="#">For Employer</a>
                <div className="mega-menu py-2 right-margin">
                  <div className="container cf">
                    <ul className="ul-reset">
                      <li><a href="#">Buy Online</a></li>
                      {/* <li><a href="#">Our Hiring Solution</a></li> */}
                      <li><a onClick={() =>{navigate("/EmployerLogin")}}>Employer Login</a></li>
                    </ul>
                  </div>
                </div>
              </li>
            </ul>
          </>
        ) : (
          <>
          <nav>
            <ul className="container ul-reset">
              <li className="droppable">
                <a href="#">Prepare</a>
                <div className="mega-menu">
                  <div className="container cf">
                    <ul className="ul-reset py-3">
                      <li><a  onClick={() => { navigate("/carrier") }}>PathFinder</a></li>
                      <li><a  onClick={() => { navigate("/carrier") }} >NCAT</a></li>
                      <li><a  onClick={() => { navigate("/carrier") }} >Expert Speak</a></li>
                      <li><a  onClick={() => { navigate("/carrier") }} >Resume Maker</a></li>
                      <li><a  onClick={() => { navigate("/carrier") }} >Personalised interview Q/A</a></li>
                      <li><a  onClick={() => { navigate("/carrier") }} >Career Guidance</a></li>
                    </ul>
                  </div>
                </div>
              </li>
              <li className="droppable">
                <a href="#">Participate</a>
                <div className="mega-menu">
                  <div className="container cf">
                    <ul className="ul-reset py-3">
                      <li><a  onClick={() => { navigate("/carrier") }}>Contest</a></li>
                      <li><a  onClick={() => { navigate("/carrier") }}>All India NCAT</a></li>
                      <li><a  onClick={() => { navigate("/carrier") }}>Skilled Campus Young Turks</a></li>
                      <li><a  onClick={() => { navigate("/carrier") }}>Skilled Campus Squad</a></li>
                      <li><a  onClick={() => { navigate("/carrier") }}>Engineer's Ring of Honour</a></li>
                    </ul>
                  </div>
                </div>
              </li>
              <li className="droppable">
                <a href="#">Opportunities</a>
                <div className="mega-menu">
                  <div className="container cf">
                    <ul className="ul-reset py-3">                     
                      <li><a onClick={()=>{navigate('/comingsoonpage')}}>Recommended Jods</a></li>
                      <li><a onClick={()=>{navigate('/comingsoonpage')}}>Job Invites</a></li>
                      <li><a onClick={()=>{navigate('/comingsoonpage')}}>Job Alerts</a></li>
                      <li><a onClick={()=>{navigate('/comingsoonpage')}}>Application Status</a></li>
                      <li><a onClick={()=>{navigate('/comingsoonpage')}}>Saved Jobs</a></li>
                    </ul>
                  </div>
                </div>
              </li>
            </ul>
            {searchclick ? (
                <div onClick={handleSearch} className="search-box d-flex align-items-center">
                  <SearchBar />
                </div>
              ) : (
                <Offcanvas show={!searchclick} onHide={handleSearch} placement="top" style={{height: "300px"}}>
                  <Offcanvas.Body>
                    <JobSearch/>
                  </Offcanvas.Body>
                </Offcanvas>
              )}

            
          </nav>
            <Offcanvas show={show} onHide={handleClose} placement="end">
              <Offcanvas.Header closeButton>
                <Offcanvas.Title>User Profile</Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                {/* Profile Info */}
                <div className="profile-header">
                  <div className="profile-img-wrapper">
                    <div className="profile-progress">86%</div>
                    <img
                      src="https://tse1.mm.bing.net/th/id/OIP.jQc294WED8p75DlIKBgMNAHaE8?cb=iwc2&rs=1&pid=ImgDetMain" // Replace with actual image
                      alt="Profile"
                      className="profile-img"
                    />
                  </div>
                  <div>
                    <h6 className="profile-name">{userdata.fullName}</h6>
                    <p className="profile-edu">
                      B.Tech/B.E. Computers at HINDUSTAN COLLEGE OF SCIENCE
                      AND...
                    </p>
                    <a onClick={()=> {navigate("/updateProfile")}} className="profile-link">
                      View & Update Profile
                    </a>
                  </div>
                </div>

                <hr />

                {/* Profile Performance */}
                <div className="performance-section">
                  <div className="performance-title">
                    <span>Your profile performance</span>
                    <span className="performance-sub">Last 90 days</span>
                  </div>

                  <div className="performance-cards">
                    <div className="performance-card">
                      <div className="performance-value">
                        1<sup className="dot">•</sup>
                      </div>
                      <div className="performance-label">
                        Search Appearances
                      </div>
                      <a href="#" className="view-all-link">
                        View all
                      </a>
                    </div>

                    <div className="performance-card">
                      <div className="performance-value">
                        3<sup className="dot">•</sup>
                      </div>
                      <div className="performance-label">Recruiter Actions</div>
                      <a href="#" className="view-all-link">
                        View all
                      </a>
                    </div>
                  </div>
                </div>

                {/* Navigation Links */}
                <ul className="menu-list">
                  <li>
                    <ImMenu /><span className="mx-2">Career guidance</span>
                  </li>
                  <li>
                    <FaGear /><span className="mx-2" onClick={()=>{navigate('/user-settings')}}>Settings</span>
                  </li>
                  <li>
                    <FaQuestionCircle /><span className="mx-2" onClick={()=> {navigate("/user-faq")}} >FAQs</span>
                  </li>
                  <li>
                    <FaArrowRightFromBracket /><span onClick={handleLogout} className="mx-2">Logout</span>
                  </li>
                </ul>
              </Offcanvas.Body>
            </Offcanvas>
            <div className="navbar-custom d-flex align-items-center justify-content-between">
              
              {/* Profile Section */}
              <div onClick={handleShow} className="position-relative profile-wrapper d-flex">
                {userdata.profile ? (
                  <img
                    src={userdata.profile}
                    onError={(e) => { e.target.onerror = null; e.target.src = "/default-profile.png"; }}
                    alt="Profile"
                    className="profile-pic"
                  />
                ) : (
                  <div className="default-icon mx-3">
                    <FaUserCircle size={32} />
                  </div>
                )}
                <span className="profile-badge">2</span>
                <div>{userdata.fullName}</div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
export default Navbar;
