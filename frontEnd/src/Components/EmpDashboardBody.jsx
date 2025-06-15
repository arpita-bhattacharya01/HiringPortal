import React from "react";
import "./EmpDashboardBody.css";
import { useNavigate } from "react-router-dom";
const EmpDashboardBody = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="hero-section">
        <div className="hero-content">
          <h1>Decode India’s largest talent pool with the power of ✨ AI</h1>
          <p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-person-circle mx-1"
              viewBox="0 0 16 16"
            >
              <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
              <path
                fillRule="evenodd"
                d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
              />
            </svg>
            <strong>10 crore+ registered</strong> jobseekers for all your talent
            needs
          </p>
          <p><svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-bar-chart-line mx-1"
            viewBox="0 0 16 16"
          >
            <path d="M11 2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v12h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h1V7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7h1zm1 12h2V2h-2zm-3 0V7H7v7zm-5 0v-3H2v3z" />
          </svg>
          Most advanced recruitment AI</p>
          

          <button className="explore" onClick={()=>{navigate('/EmpRegistration')}}>Post Your First Job Now</button>
        </div>

        <div className="hero-form"></div>
      </div>
    </>
  );
};
export default EmpDashboardBody;
