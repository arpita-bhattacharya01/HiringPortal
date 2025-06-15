import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./EmpLoginFooter.css";
import { useNavigate } from "react-router-dom";

const EmpLoginFooter = () => {
  const navigate = useNavigate();
  return (
    <footer className="emp-footer">
      <Container>
        {/* Main Footer Links */}
        <Row className="footer-links">
          <Col md={3}>
            <h6 className="mb-2">Recruiter Helpline</h6>
            <ul>
              <li>+91 86-5000-6677</li>
              <li>+91 800-6462-740</li>
              <li>09:30 AM to 6:30 PM, tues - Sun</li>
              <li>
                <a href="https://www.acculizeintech.com/contact/">
                  Contact Us - Report a Problem
                </a>
              </li>
            </ul>
            <img
              src="images/Skilled Peepal Logo.png"
              alt="Skilled Peepal"
              height={"50px"}
              width={"200px"}
            />
          </Col>
          {/* Recruiter Solutions */}
          <Col md={3}>
            <h6>Recruiter Solutions</h6>
            <ul>
              <li>
                <a
                  onClick={() => {
                    navigate("/EmployerLogin");
                  }}
                  target="_blank"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  onClick={() => {
                    navigate("/comingsoonpage");
                  }}
                  target="_blank"
                >
                  Jobs & Responses
                </a>
              </li>
              <li>
                <a
                  onClick={() => {
                    navigate("/comingsoonpage");
                  }}
                  target="_blank"
                >
                  Resdex
                </a>
              </li>
              <li>
                <a
                  onClick={() => {
                    navigate("/comingsoonpage");
                  }}
                  target="_blank"
                >
                  Analytics
                </a>
              </li>
            </ul>
          </Col>

          {/* Information */}
          <Col md={3}>
            <h6>Information</h6>
            <ul>
              <li>
                <a
                  onClick={() => {
                    navigate("/comingsoonpage");
                  }}
                  target="_blank"
                >
                  Jobseeker Home
                </a>
              </li>
              <li>
                <a href="https://www.acculizeintech.com/about/" target="_blank">
                  About Us
                </a>
              </li>
              <li>
                <a
                  onClick={() => {
                    navigate("/comingsoonpage");
                  }}
                  target="_blank"
                >
                  Clients
                </a>
              </li>
              <li>
                <a
                  href="https://www.acculizeintech.com/careers/"
                  target="_blank"
                >
                  Careers
                </a>
              </li>
              <li>
                <a
                  onClick={() => {
                    navigate("/comingsoonpage");
                  }}
                  target="_blank"
                >
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a
                  onClick={() => {
                    navigate("/comingsoonpage");
                  }}
                  target="_blank"
                >
                  Privacy policy
                </a>
              </li>
              <li>
                <a
                  onClick={() => {
                    navigate("/comingsoonpage");
                  }}
                  target="_blank"
                >
                  FAQs
                </a>
              </li>
              <li>
                <a
                  onClick={() => {
                    navigate("/comingsoonpage");
                  }}
                  target="_blank"
                >
                  Site Map
                </a>
              </li>
            </ul>
          </Col>

          {/* Legal */}
          <Col md={3}>
            <h6>Legal</h6>
            <ul>
              <li>
                <a
                  onClick={() => {
                    navigate("/comingsoonpage");
                  }}
                  target="_blank"
                >
                  Grievances
                </a>
              </li>
              <li>
                <a
                  onClick={() => {
                    navigate("/comingsoonpage");
                  }}
                  target="_blank"
                >
                  Summons and Notice
                </a>
              </li>
              <li>
                <a
                  onClick={() => {
                    navigate("/comingsoonpage");
                  }}
                  target="_blank"
                >
                  Trust and Safety
                </a>
              </li>
              <li>
                <a
                  onClick={() => {
                    navigate("/comingsoonpage");
                  }}
                  target="_blank"
                >
                  Whitehall
                </a>
              </li>
            </ul>
          </Col>

          {/* Empty Column for spacing */}
          <Col md={3}></Col>
        </Row>

        {/* Copyright */}
        <Row className="copyright">
          <Col>
            <p>All rights reserved ©2025 Skilled Peepal</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default EmpLoginFooter;
