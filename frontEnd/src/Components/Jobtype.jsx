import React from 'react'
import { useNavigate } from 'react-router-dom'
import "./Jobtype.css"
const Jobtype = () => {
  const navigate = useNavigate();
  
const handleClick = (label) => {
  navigate(`/carrier?type=${encodeURIComponent(label)}`);
};

  return (
    <div className="list-container">
    {/* First Category Grid */}
    <div className="category-grid my-4">
      <div className="category-card" onClick={() => handleClick("Remote")}>
        <div className="category-icon">
          <img src="images/home.svg" width="24" alt="Home" />
        </div>
        <div className="category-label">Remote</div>
      </div>
      <div className="category-card" onClick={() => handleClick("MNC")}>
        <div className="category-icon">
          <img src="images/mnconetheme.svg" width="24" alt="MNC" />
        </div>
        <div className="category-label">MNC</div>
      </div>
      <div className="category-card" onClick={() => handleClick("Internship")}>
        <div className="category-icon">
          <img src="images/internship.svg" width="24" alt="Internship" />
        </div>
        <div className="category-label">Internship</div>
      </div>
      <div className="category-card" onClick={() => handleClick("Startup")}>
        <div className="category-icon">
          <img src="images/startup.svg" width="24" alt="Startup" />
        </div>
        <div className="category-label">Startup</div>
      </div>
      <div className="category-card" onClick={() => handleClick("Software & IT")}>
        <div className="category-icon">
          <img src="images/softwareandit.svg" width="24" alt="Software & IT" />
        </div>
        <div className="category-label">Software & IT</div>
      </div>
      <div className="category-card" onClick={() => handleClick("HR")}>
        <div className="category-icon">
          <img src="images/hr.svg" width="24" alt="HR" />
        </div>
        <div className="category-label">HR</div>
      </div>
    </div>

    {/* Second Category Grid */}
    <div className="category-grid my-4">
      <div className="category-card" onClick={() => handleClick("Marketing")}>
        <div className="category-icon">
          <img src="images/marketing.svg" width="24" alt="Marketing" />
        </div>
        <div className="category-label">Marketing</div>
      </div>
      <div className="category-card" onClick={() => handleClick("Sales")}>
        <div className="category-icon">
          <img src="images/sales.svg" width="24" alt="Sales" />
        </div>
        <div className="category-label">Sales</div>
      </div>
      <div className="category-card" onClick={() => handleClick("Analysis")}>
        <div className="category-icon">
          <img src="images/analyst.svg" width="24" alt="Analysis" />
        </div>
        <div className="category-label">Analysis</div>
      </div>
      <div className="category-card" onClick={() => handleClick("Fortune 500")}>
        <div className="category-icon">
          <img src="images/fortune.svg" width="24" alt="Fortune 500" />
        </div>
        <div className="category-label">Fortune 500</div>
      </div>
      <div className="category-card" onClick={() => handleClick("Project Mgmt")}>
        <div className="category-icon">
          <img src="images/Projectmanagement.svg" width="24" alt="Project Mgmt" />
        </div>
        <div className="category-label">Project Mgmt</div>
      </div>
    </div>
  </div>
  )
}

export default Jobtype
