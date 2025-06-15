import React from "react";
import {
  FaFacebookSquare,
  FaInstagramSquare,
  FaLinkedin,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import "./FooterNew.css";

const Footer = () => {
  const navigate = useNavigate();
const logos = [
  {
    src: "https://static.naukimg.com/s/0/0/i/new-homepage/footer-logos/jeevansathi.png",
    url: "https://www.jeevansathi.com",
  },
  {
    src: "https://static.naukimg.com/s/0/0/i/new-homepage/footer-logos/iimjobs.png",
    url: "https://www.iimjobs.com",
  },
  {
    src: "https://static.naukimg.com/s/0/0/i/new-homepage/footer-logos/ng_v1.png",
    url: "https://www.naukri.com",
  },
  {
    src: "https://static.naukimg.com/s/0/0/i/new-homepage/footer-logos/shiksha.png",
    url: "https://www.shiksha.com",
  },
  {
    src: "https://static.naukimg.com/s/0/0/i/new-homepage/footer-logos/jobhai.png",
    url: "https://www.jobhai.com",
  },
  {
    src: "https://static.naukimg.com/s/0/0/i/new-homepage/footer-logos/minis.png",
    url: "https://play.google.com/store/apps/details?id=com.naukri.android.minis", // hypothetical
  },
  {
    src: "https://static.naukimg.com/s/0/0/i/new-homepage/footer-logos/jeevansathi.png",
    url: "https://www.jeevansathi.com",
  },
  {
    src: "https://static.naukimg.com/s/0/0/i/new-homepage/footer-logos/ng_v1.png",
    url: "https://www.naukri.com",
  },
];

  return (
    <footer className="footer-main">
      <div className="container">
        <section className="row my-4 border-bottom pb-4">
          <div className="col-md-3 col-sm-6 mb-4">
            <img
              src="public/images/Skilled Peepal Logo.png" width={"200px"} height={"50px"}
              alt="skilled peepal"
              style={{ cursor: "pointer" }}
            />
            <h6 className="pt-3 m-2">Connect with us</h6>
            <div className="d-flex">
              <a
                href="https://www.facebook.com/acculizeintech/"
                target="_blank"
                rel="noreferrer"
                className="m-2 icons-bg"
              >
                <FaFacebookSquare />
              </a>
              <a
                href="https://www.instagram.com/acculizeintech/"
                target="_blank"
                rel="noreferrer"
                className="m-2 icons-bg"
              >
                <FaInstagramSquare />
              </a>
              <a
                href="https://www.acculizeintech.com/"
                target="_blank"
                rel="noreferrer"
                className="m-2 icons-bg"
              >
                <FaXTwitter />
              </a>
              <a
                href="https://www.linkedin.com/company/acculizeintech"
                target="_blank"
                rel="noreferrer"
                className="m-2 icons-bg"
              >
                <FaLinkedin />
              </a>
            </div>
          </div>

          <div className="col-md-2 col-sm-6 mb-4">
            <ul className="footer-links">
              <li>
                <a href="https://www.acculizeintech.com/about/" target="_blank">About us</a>
              </li>
              <li>
                <a href="https://www.acculizeintech.com/careers/" target="_blank">Careers</a>
              </li>
              <li>
                <a onClick={()=>{navigate('/EmployerLogin')}} target="_blank">Employer home</a>
              </li>
              <li>
                <a onClick={()=>{navigate('/comingsoonpage')}} target="_blank">Credits</a>
              </li>
            </ul>
          </div>

          <div className="col-md-2 col-sm-6 mb-4">
            <ul className="footer-links">
              <li>
                <a onClick={()=>{navigate('/comingsoonpage')}} target="_blank">Help center</a>
              </li>
              <li>
                <a onClick={()=>{navigate('/comingsoonpage')}}target="_blank">Summons/Notices</a>
              </li>
              <li>
                <a onClick={()=>{navigate('/comingsoonpage')}}target="_blank">Grevances</a>
              </li>
              <li>
                <a onClick={()=>{navigate('/comingsoonpage')}}target="_blank">Report issue</a>
              </li>
            </ul>
          </div>

          <div className="col-md-2 col-sm-6 mb-4">
            <ul className="footer-links">
              <li>
                <a onClick={()=>{navigate('/comingsoonpage')}}target="_blank">Privacy & Policy</a>
              </li>
              <li>
                <a onClick={()=>{navigate('/comingsoonpage')}}target="_blank">Terms & Condition</a>
              </li>
              <li>
                <a onClick={()=>{navigate('/comingsoonpage')}}>Fraud alert</a>
              </li>
              <li>
                <a onClick={()=>{navigate('/comingsoonpage')}}target="_blank">Trust & Safety</a>
              </li>
            </ul>
          </div>

          <div className="col-md-3 mb-4">
            <div className="borderToGp">
              <div className="fs-6 fw-bold">Apply on the go</div>
              <div
                className="mb-2"
                style={{ fontSize: "13px", color: "#808080" }}
              >
                Get real-time job updates on our App
              </div>
              <div className="d-flex">
                <a
                  onClick={()=>{navigate('/comingsoonpage')}}
                  target="_blank"
                  rel="noreferrer"
                  className="me-2"
                >
                  <img
                    src="https://static.naukimg.com/s/0/0/i/new-homepage/android-app_v1.png"
                    alt="android"
                    width="120"
                  />
                </a>
                <a
                  onClick={()=>{navigate('/comingsoonpage')}}target="_blank"
                  rel="noreferrer"
                >
                  <img
                    src="https://static.naukimg.com/s/0/0/i/new-homepage/ios-app_v1.png"
                    alt="ios"
                    width="120"
                  />
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="row mt-4 align-items-center text-center text-md-start">
          <div className="col-md-5 mb-3 d-flex align-items-center">
            <a href="https://www.acculizeintech.com/" className="me-3">
              <img
                src="https://www.acculizeintech.com/wp-content/uploads/2023/07/Acculizein_Final_Logo_Design-01_copy_2-removebg-preview-300x88.png"
                width={140}
                alt="Acculizein Tech"
              />
            </a>
            <div style={{ fontSize: "14px", color: "#808080" }}>
              <div>
                All trademarks are the property of their respective owners
              </div>
              <div>All rights reserved © 2025 Acculizein Tech Pvt. Ltd.</div>
            </div>
          </div>

          <div
            className="col-md-1 mb-3"
            style={{ fontSize: "14px", color: "#808080" }}
          >
            Our businesses
          </div>

          <div className="col-md-6">
            <div className="nI-gNb-slider">
              <div className="marquee-container">
                <div className="marquee-track">
                  {logos.map((logo, index) => (
                    <a href={logo.url} target="_blank"arel="noopener noreferrer"key={index}>
                       <img src={logo.src} alt={`logo-${index}`} />
                     </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </footer>
  );
};

export default Footer;
