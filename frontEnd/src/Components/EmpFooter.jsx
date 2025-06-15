import React from "react";
import { FaLinkedinIn } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import "./EmpFooter.css";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const EmpFooter = () => {
  const navigate = useNavigate();
  return (
    <footer className="employers-footer">
      <Container>
        <Row className="employers-footer-top d-flex flex-column">
          <div className="d-flex flex-row justify-content-between">
            <Col md={3}>
              <h5 className="employers-footer-title">Recruiter services</h5>
              <ul className="employers-footer-list">
                <li>
                  <a
                    onClick={() => {
                      navigate("/comingsoonpage");
                    }}
                    target="_blank"
                  >
                    Job Posting
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => {
                      navigate("/comingsoonpage");
                    }}
                    target="_blank"
                  >
                    Resume Database (Resdex)
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => {
                      navigate("/comingsoonpage");
                    }}
                    target="_blank"
                  >
                    Assisted Hiring
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => {
                      navigate("/comingsoonpage");
                    }}
                    target="_blank"
                  >
                    Employer Branding
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => {
                      navigate("/comingsoonpage");
                    }}
                    target="_blank"
                  >
                    Talent Pulse
                  </a>
                </li>
              </ul>
            </Col>

            <Col md={2}>
              <h5 className="employers-footer-title">Information</h5>
              <ul className="employers-footer-list">
                <li>
                  <a className="text-decoration-none"
                    href="https://www.acculizeintech.com/about/"
                    target="_blank"
                  >
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
                  <a  className="text-decoration-none"
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

            <Col md={2}>
              <h5 className="employers-footer-title">Legal</h5>
              <ul className="employers-footer-list">
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

            <Col md={2}>
              <h5 className="employers-footer-title">Customer support</h5>
              <ul className="employers-footer-list">
                <li>Toll Free: +91 86-5000-6677</li>
                <li>(09:30 AM to 6:30 PM, tues - Sun)</li>
                <li>sales@acculizeintech.com</li>
              </ul>
            </Col>
          </div>
          {/* <div className="d-flex flex-row">
               <Col md={3} className="d-flex flex-row"> */}
          <h5 className="employers-footer-title">Sales enquires</h5>
          <br />
          <div className="employers-footer-sales d-flex flex-row justify-content-between">
            <div>
              <strong>India:</strong>
              <p>
                Toll Free: 1800 102 2558 <br />
                (9:30 AM to 6:30 PM) <br />
                +91 800-6462-740 <br />
                sales@acculizeintech.com
              </p>
            </div>
            <div>
              <strong>USA:</strong>
              <p>
                +91 86-5000-6677<br />sales@acculizeintech.com
              </p>
            </div>
            <div>
              <strong>Europe/UK:</strong>
              <p>
                +91 800-6462-740 <br /> sales@acculizeintech.com
              </p>
            </div>
            <div>
              <strong>Middle East/Africa & South East Asia:</strong>
              <p>
                +91 - 9818317555 <br />
                Europe@acculizeintech.com <br />
                Asia@acculizeintech.com <br />
                africa@acculizeintech.com
              </p>
            </div>
          </div>
          {/* </div> */}
        </Row>

        <Row className="employers-footer-bottom align-items-center">
          <Col md={6}>
            <img
              src="images/Skilled Peepal Logo.png"
              alt="Skilled Peepal "
              height={"60px"}
              width={"210px"}
            />
          </Col>
          <Col md={6} className="text-end employers-footer-social">
            <a
              href="https://www.linkedin.com/company/acculizeintech/"
              target="_blank"
              className="employers-footer-icon"
            >
              <FaLinkedinIn />
            </a>
            <a
              href="https://www.youtube.com/@skilledpeepal"
              target="_blank"
              className="employers-footer-icon"
            >
              <FaYoutube />
            </a>
          </Col>
        </Row>
        <Row>
          <Col className="text-center employers-footer-copy">
            © 2025 Acculizein Tech Pvt India Limited | All Rights Reserved
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default EmpFooter;
