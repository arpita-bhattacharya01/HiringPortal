import React, { useEffect } from "react";
// import Container from 'react-bootstrap/Container';
// import Navbar from 'react-bootstrap/Navbar';
import FooterNew from "./FooterNew";
import "./JobDescription.css";
import ApplicationModal from "./ApplicationModal";
import { useLocation } from "react-router-dom";
import {
  FaStar,
  FaBriefcase,
  FaRupeeSign,
  FaMapMarkerAlt,
  FaGlobe,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaFacebook, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import SendJobsLikeThisModal from "./SendJobsLikeThisModal";
import axios from 'axios'
function JobDescription() {

  const { state } = useLocation();
  const job = state?.jobData;
  console.log("this is for testing", job)
  const navigate = useNavigate();
  const [islogin, setislogin] = useState(false);
  const [isApplied, setIsApplied] = useState(false);


  const [selectedJobId, setSelectedJobId] = useState('');
  const token = localStorage.getItem("token")
  const jobId = job.id

  useEffect(() => {
    const getlocalstorage = () => {
      const data = localStorage.getItem("user");
      console.log("This Data received from localstorage", data);
      if (data) {
        setislogin(true);
      }
    };

    getlocalstorage();
  }, []);

  useEffect(() => {
    console.log("This is Second UseEffect", jobId, token)
    if (token && jobId) {
      axios
        .get(`http://localhost:3000/applied/${jobId}`, {
          headers: {
            authorization: `bearer ${token}`,
          },
        })
        .then((res) => {
          if (res.data.applied) {
            setIsApplied(true);  // user has applied
          } else {
            setIsApplied(false); // user has not applied
          }
        })
        .catch((err) => {
          console.error("Error checking application status:", err);
          setIsApplied(false); // fallback
        });
    }
  }, [jobId, token])


  const handleSocialClick = (url) => {
    window.open(url, "_blank");
  };

  console.log("This is content get from stats", job)

  const [showsendjob, setshowsendjob] = useState(false);
  const handleSave = () => {
    setshowsendjob(false);
  };
  const getSkillsArray = () => {
    if (!job.skills) return [];
    if (Array.isArray(job.skills)) return job.skills;
    return job.skills.split(",").map(skill => skill.trim());
  };

  const [isModalOpen, setIsModalOpen] = useState(false);


  console.log(selectedJobId)
  return (
    <>
      <div className="jobs-card-job-job-discription mb-3">
        {/* Left Section */}
        <div className="jobs-left">
          <div className="logo-circle">
            <span>R</span>
          </div>
          <div className="jobs-info">
            <h4 className="jobs-title">{job.jobTitle}</h4>
            <div className="company-rating">
              <span className="company-name">
                {job.employer.companyname} &#10072;
              </span>
              <FaStar className="star-icon" />
              <span className="rating">{ } &#10072;</span>
              <span className="reviews">{ } Reviews</span>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="jobs-right flex-row ">
          <button
            role="button"
            onClick={() => {
              setshowsendjob(true);
            }}
            className="jobs-suggestion-link mx-4"
          >
            Send me jobs like this
          </button>

          {isApplied ? (
            <span className="apply-btn disabled">Applied</span>
          ) : islogin ? (
            <a
              onClick={() => {
                setSelectedJobId(job.id);  // Set the selected job ID
                setIsModalOpen(true);      // Open the modal
              }}
              rel="noopener noreferrer"
              className="apply-btn"
            >
              Apply Now
            </a>
          ) : (
            <a
              onClick={() => {
                setSelectedJobId(job.id);  // Set the selected job ID
                setIsModalOpen(true);      // Open the modal
              }}
              rel="noopener noreferrer"
              className="apply-btn"
            >
              Apply Now
            </a>
          )}

          {showsendjob && (
            <SendJobsLikeThisModal
              show={showsendjob}
              onClose={() => setshowsendjob(false)}
              onSave={handleSave}
            />
          )}
        </div>
      </div>

      <div
        className="position-relative d-flex justify-center flex-column align-items-center"
        style={{ top: "100px" }}
      >
        <div
          className="job-card-job-discription company-card-jobdiscription mb-3"
          width={"80%"}
        >
          <div className="r-1 d-flex justify-content-between align-items-center w-100">
            <div className="jobs-left d-flex flex-column">
              <h3 className="jobs-title-job-discription">
                {job.jobTitle}
              </h3>
              <div className="company-rating">
                <span className="company-name">
                  {job.employer.companyname} &#10072;
                </span>
                <FaStar className="star-icon" />
                <span className="rating">{job.rating} &#10072;</span>
                <span className="reviews">{job.reviews} Reviews</span>
              </div>
              <div className="jobs-details-job-siscription">
                <span>
                  <FaBriefcase className="icon-job" /> {job.experience} years &#10072;
                </span>
                <span>
                  <FaRupeeSign className="icon-job" />
                  {job.salary && job.salary.trim() !== "" ? job.salary : "Not Disclosed"} &#10072;
                </span>
                <span>
                  <FaMapMarkerAlt className="icon-job" /> {job.location}
                </span>
              </div>
            </div>
            <div className="jobs-right-job-discription">
              <img
                src={job.logo}
                alt={job.employer.companyname}
                className="company-logo"
              />
              <button
                role="button"
                onClick={() => {
                  setshowsendjob(true);
                }}
                className="jobs-suggestion-link mx-4"
              >
                Send me jobs like this
              </button>
            </div>
          </div>
          <hr />
          <div className="r-2 d-flex justify-content-between align-items-center w-100">
            <div className="meta-info">
              <span>
                <strong>Posted:</strong> {new Date(job.posted).toLocaleDateString()}
              </span>
              <span>
                <strong>Openings:</strong> {job.openings}
              </span>
              <span>
                <strong>Applicants:</strong> 39
              </span>
            </div>

            {isApplied ? (
              <div className="btn-group">
                <button className="btn-outline disabled">Applied</button>
              </div>
            ) : islogin ? (
              <div className="btn-group">
                <a
                  onClick={() => {
                    setSelectedJobId(job.id);  // Set the selected job ID
                    setIsModalOpen(true);      // Open the modal
                  }}
                  rel="noopener noreferrer"
                  className="apply-btn"
                >
                  Apply Now
                </a>
              </div>
            ) : (
              <div className="btn-group">
                <button
                  className="btn-outline"
                  onClick={() => {
                    navigate("/register");
                  }}
                >
                  Register to apply
                </button>
                <button
                  className="btn-filled"
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  Login to apply
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="jobs-detail-container">
          {/* <h2 className='heading'>{jobsData[0].title}</h2> */}
          <h3 className="heading mb-2">Job Description:</h3>
          {/* <p><strong>Role:</strong> {jobsData[0].role}</p> */}
          <p className="font-sizes">
            <strong>Industry Type:</strong> {job.employer.industryType}
          </p>
          <p className="font-sizes">
            <strong>Company Type:</strong> {job.employer.companyType}
          </p>
          <p className="font-sizes">
            <strong>Department:</strong> {job.Department}
          </p>
          <p className="font-sizes">
            <strong>Employment Type:</strong> {job.jobType}
          </p>
          <p className="font-sizes">
            <strong>Role Category:</strong> {job.jobTitle}
          </p>

          <h4 className="heading">Description:</h4>
          <p className="font-sizes">
            {job.jobDiscription}
          </p>

          <h4 className="heading">Responsibilities:</h4>
          <p className="font-sizes">
            {job.responsibilities}
          </p>
          <h4 className="heading">Requirement:</h4>
          <p className="font-sizes">
            {job.requirement}
          </p>

          <h4 className="heading">Education:</h4>
          <ul>
            <li className="font-sizes">
              <strong>UG:</strong> {job.education}
            </li>
            <li className="font-sizes">
              <strong>PG:</strong> {job.education}
            </li>
          </ul>

          <h4 className="heading">Key Skills:</h4>
          <div className="skills-container">
            {getSkillsArray().map((skill, index) => (
              <span className="font-sizes skill-badge" key={index}>
                {skill}
              </span>
            ))}
          </div>

          <div>
            <div className="d-flex mt-2 justify-content-end">
              <a
                href={job.employer.website}
                target="_blank"
                rel="noreferrer"
                className="m-2 icons-bg-job"
              >
                <FaGlobe />
              </a>
              <a
                href={job.employer.twitter}
                target="_blank"
                rel="noreferrer"
                className="m-2 icons-bg-job"
              >
                <FaXTwitter />
              </a>
              <a
                href={job.employer.linkedin}
                target="_blank"
                rel="noreferrer"
                className="m-2 icons-bg-job"
              >
                <FaLinkedin />
              </a>
              <a
                href={job.employer.facebook}
                target="_blank"
                rel="noreferrer"
                className="m-2 icons-bg-job"
              >
                <FaFacebook />
              </a>
            </div>
          </div>
        </div>
      </div>
      <FooterNew />

      {/* Application Modal */}
      <ApplicationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmitSuccess={() => {
          setIsApplied(true);
          setIsModalOpen(false);

        }}
        jobId={selectedJobId}
      />
    </>
  );
}

export default JobDescription;
