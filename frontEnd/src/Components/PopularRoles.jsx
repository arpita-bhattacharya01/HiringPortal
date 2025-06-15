import React, { useState } from "react";
import "./PopularRoles.css";

const jobRoles = [
  { title: "Automation Test Engineer", jobs: "3K+" },
  { title: "Cyber Security", jobs: "1.1K+" },
  { title: "Technical Architect", jobs: "5.5K+" },
  { title: "Business Analyst", jobs: "4.9K+" },
  { title: "Data Scientist", jobs: "1.4K+" },
  { title: "Program Manager", jobs: "711" },
  { title: "Product Manager", jobs: "3K+" },
  { title: "UI/UX Designer", jobs: "1.1K+" },
  { title: "Research Analyst", jobs: "5.5K+" },
  { title: "Branch Manager", jobs: "4.9K+" },
  { title: "Functionl Consultant", jobs: "1.4K+" },
  { title: "Charted Accountant", jobs: "711" },
  { title: "Full Stack developer", jobs: "3K+" },
  { title: "Mobile App Devekopment", jobs: "1.1K+" },
  { title: "Froontend Developer ", jobs: "5.5K+" },
  { title: "DevOps Engineer", jobs: "4.9K+" },
  { title: "Engineering Management", jobs: "1.4K+" },
  { title: "Technical Lead", jobs: "711" },
];

const PopularRoles = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const cardsPerPage = 6;

  const nextSlide = () => {
    if (currentIndex + cardsPerPage < jobRoles.length) {
      setCurrentIndex(currentIndex + cardsPerPage);
    }
  };

  const prevSlide = () => {
    if (currentIndex - cardsPerPage >= 0) {
      setCurrentIndex(currentIndex - cardsPerPage);
    }
  };

  return (
    <div className="main-container-popularroles">
      <div className="popular-roles-container">
        {/* <div className="left-section">
          <div>
             <img className='popularrole-image' src="images\role-collection-ot.png" alt="Search Icon" />
          </div>
          <div>
             <h2>Discover jobs across<br />popular roles</h2>
            <p>Select a role and we'll show you relevant jobs for it!</p>
          </div>
          
        </div> */}
        <div className="left-section">
          <img
            className="popularrole-image"
            src="images/role-collection-ot.png"
            alt="Search Icon"
          />
          <div className="Right-text">
            <h2>
              Discover jobs across
              <br />
              popular roles
            </h2>
            <p>Select a role and we'll show you relevant jobs for it!</p>
          </div>
        </div>

        <div className="right-section">
          <div className="card-slider">
            <button className="nav-btn left-btn" onClick={prevSlide}>
              ‹
            </button>

            <div className="cards">
              {jobRoles
                .slice(currentIndex, currentIndex + cardsPerPage)
                .map((role, idx) => (
                  <div key={idx} className="card">
                    <h4>{role.title}</h4>
                    <p>{role.jobs} Jobs &rarr;</p>
                  </div>
                ))}
            </div>

            <button className="nav-btn right-btn" onClick={nextSlide}>
              ›
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopularRoles;
