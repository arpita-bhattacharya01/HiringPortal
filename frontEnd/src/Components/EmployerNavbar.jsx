import React, { useState } from "react";
import "./EmployerNavbar.css";
import { IoIosArrowDown } from "react-icons/io";
import { MdArrowOutward } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import EmpToggleBox from "./EmpToggleBox";
import { Link } from 'react-scroll';

const EmployerNavbar = () => {
  const navigate = useNavigate();

  const [showOfferings, setShowOfferings] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleOfferings = () => {
    setShowOfferings(!showOfferings);
  };
  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="employer-navbar">
      <div className="navbar-left">
        <img
          src="images/Skilled Peepal Logo.png"
          alt="Skilled Peepal"
          className="logo"
          height={"50px"}
          width={"200px"}
        />
        <div className="dropdown" onClick={toggleOfferings}>
          Our offerings{" "}
          <span>
            <IoIosArrowDown />
          </span>
          {showOfferings && (
            <div className="offerings-dropdown">
              {/* <div className="column">
                <p className="title">BY PRODUCTS</p>
                <ul>
                  <li>
                    <strong>Job Posting</strong>
                    <br />
                    <span>Find & attract relevant talent</span>
                  </li>
                  <li>
                    <strong>Resdex</strong>
                    <br />
                    <span>Access India’s largest database</span>
                  </li>
                  <li>
                    <strong>Expert Assist</strong>
                    <br />
                    <span>Our Assisted hiring solution</span>
                  </li>
                  <li>
                    <strong>Employer Branding</strong>
                    <br />
                    <span>Showcase your brand presence</span>
                  </li>
                  <li>
                    <strong>Talent Pulse</strong>
                    <br />
                    <span>Make informed hiring decisions</span>
                  </li>
                </ul>
              </div> */}
              <div className="column">
                <p className="title">BY BUSINESS TYPE</p>
                <ul>
                  <li>
                    <Link to="CompTypeCard" smooth={true} duration={100}>Enterprises</Link>
                  </li>
                  <li>
                    <Link to="CompTypeCard" smooth={true} duration={100}>Small & medium business</Link>
                  </li>
                  <li >
                    <Link to="CompTypeCard" smooth={true} duration={100}>Consultants & agency</Link>       
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
        {/* <div className="dropdown">
          Naukri Talent Cloud <span className="new-badge">NEW</span>{" "}
          <span><IoIosArrowDown /></span>
        </div> */}
      </div>

      <div className="navbar-right">
        <div className="phone-0">
          {/* <FaPhoneAlt className="icon" /> */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            fill="currentColor"
            className="bi bi-telephone-fill"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z"
            />
          </svg>
          {/* <p>1800-102-5558{" "}</p> */}
          1800-102-5558{" "}
          <span>
            {/* <IoIosArrowDown /> */}
          </span>
        </div>
        <button className="buy-btn-new">Buy online</button>

        <EmpToggleBox />

        <div
          className="position-absolute menu-toggle"
          onClick={toggleMenu}
          style={{ right: "0" }}
        >
          {/* <FaBars className="icon menu position-absolute" /> */}
          {menuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              fill="currentColor"
              className="bi bi-x-lg "
              viewBox="0 0 16 16"
            >
              <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              fill="currentColor"
              className="bi bi-list"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
              />
            </svg>
          )}
        </div>
      </div>
      {/* Help menu dropdown */}
      {menuOpen && (
        <div className="help-dropdown">
          <ul>
            <li onClick={()=>{navigate('/reportaproblem')}}>Help center</li>
            {/* <li>Resources</li> */}
            <li onClick={()=>{navigate('/employerfaq')}}>FAQs</li>
          </ul>
          <div className="jobseeker-box" onClick={() => navigate("/login")}>
            <strong>
              Are you a jobseeker?
              <span>
                {" "}
                <MdArrowOutward />
              </span>
            </strong>
            <br />
            <span>Takes you to the Naukri jobseeker page</span>
          </div>
        </div>
      )}
    </nav>
  );
};

export default EmployerNavbar;
