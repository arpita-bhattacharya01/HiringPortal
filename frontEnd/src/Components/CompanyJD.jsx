import { GrSave } from "react-icons/gr";
import { IoLocationOutline, IoBagOutline, IoNewspaperOutline } from "react-icons/io5";
import { LiaRupeeSignSolid } from "react-icons/lia";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "./CompanyJD.css";

const CompanyJD = ({ filters = {} }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [jobData, setJobData] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const { skills, location: jobLocation, experience } = location.state || {};
  const jobType = params.get("type")?.toLowerCase();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setIsLogin(true);
    }

    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/get-jobdata");
        if (response.data) {
          const jobs = Array.isArray(response.data.data)
            ? response.data.data
            : Object.values(response.data.data || {});
          setJobData(jobs);
          applyFilters(jobs, filters);
        }
      } catch (err) {
        console.error("Error fetching job data:", err);
      }
    };

    fetchData();
  }, [skills, jobLocation, experience, jobType]);

  useEffect(() => {
    if (jobData.length > 0) {
      applyFilters(jobData, filters);
    }
  }, [JSON.stringify(filters)]);

  const applyFilters = (jobs, filters) => {
    const extractYears = (expStr) => {
      if (typeof expStr === 'number') return expStr;
      const match = expStr?.match(/\d+/);
      return match ? parseInt(match[0]) : 0;
    };
    const filtered = jobs.filter((job) => {

      const jobSkills = job.skills?.toLowerCase().split(",").map(s => s.trim()) || [];
      const searchSkills = skills?.toLowerCase().split(",").map(s => s.trim()).filter(Boolean) || [];
      const skillMatch = searchSkills.length === 0 || searchSkills.some(s => jobSkills.includes(s));

      const locationMatch = !jobLocation ||
        job.location?.toLowerCase().trim().includes(jobLocation.toLowerCase().trim());

      const experienceRequired = extractYears(experience || "0");
      const jobExperience = extractYears(job.experience);
      const experienceMatch = !experience || jobExperience >= experienceRequired;

      const typeMatch = !jobType || (
        jobType === "remote" && job.jobType?.toLowerCase() === "remote" ||
        jobType === "mnc" && job.companytype?.toLowerCase().includes("mnc") ||
        jobType === "internship" && job.jobype?.toLowerCase().includes("intern") ||
        jobType === "startup" && job.companytype?.toLowerCase().includes("startup") ||
        jobType === "software & it" && job.Department?.toLowerCase().includes("software") ||
        jobType === "hr" && job.Department?.toLowerCase().includes("hr") ||
        jobType === "marketing" && job.Department?.toLowerCase().includes("marketing") ||
        jobType === "sales" && job.Department?.toLowerCase().includes("sales") ||
        jobType === "analysis" && job.Department?.toLowerCase().includes("analyst") ||
        jobType === "fortune 500" && job.companytype?.toLowerCase().includes("fortune") ||
        jobType === "project mgmt" && job.Department?.toLowerCase().includes("project")
      );

      if (filters.experience) {
        const filterExp = extractYears(filters.experience[0]);
        const jobExp = extractYears(job.experience);
        if (jobExp < filterExp) return true;
      }

      // New filter criteria
      const matchesFilter = Object.entries(filters).every(([key, values]) => {
        if (!values || values.length === 0) return true;

        let jobValue;

        // Handle nested or mapped fields
        if (['companyType', 'industryType', 'companyname'].includes(key)) {
          jobValue = job.employer?.[key]?.toString().toLowerCase().trim();
        } else if (key === 'roleCategory') {
          jobValue = job.jobTitle?.toString().toLowerCase().trim(); // ✅ Map roleCategory to jobTitle
        } else {
          jobValue = job[key]?.toString().toLowerCase().trim();
        }

        if (!jobValue) return false;

        console.log("This is job value from filter", key, jobValue);

        // Special handling for salary range filters
        if (key === 'salary') {
          return values.some(filterRange => {
            const [min, max] = filterRange.split('-').map(s => s.trim().replace(' Lakhs', '').replace(' LPA', ''));
            const jobSalary = jobValue.replace(' LPA', '').replace(' Lakhs', '');
            const jobSalaryRange = jobSalary.split('-').map(s => parseFloat(s.trim()));

            if (jobSalaryRange.length === 2) {
              return parseFloat(min) <= jobSalaryRange[1] && parseFloat(max) >= jobSalaryRange[0];
            }
            return false;
          });
        }

        // Special handling for experience filter
        if (key === 'experience') {
          const jobExp = extractYears(job.experience);
          return values.some(expRange => {
            const [min, max] = expRange.split('-').map(s => parseInt(s.trim().replace(' Yrs', '')));
            return jobExp >= min && (max ? jobExp <= max : true);
          });
        }

        // Default match for string filters
        return values.some(val =>
          jobValue.includes(val.toString().toLowerCase().trim())
        );
      });



      return skillMatch && locationMatch && experienceMatch && typeMatch && matchesFilter;
    });

    setFilteredJobs(filtered);
  };

  const formatExperience = (exp) => {
    if (exp === 0) return "Fresher";
    return `${exp}+ yrs`;
  };

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return isNaN(date.getTime()) ? "Recently" : date.toLocaleDateString();
    } catch {
      return "Recently";
    }
  };

  const formatSalary = (salary) => {
    return salary ? salary.trim() : "Not disclosed";
  };

  return (
    <div className="mt-5 w-100">
      <div className="job-section">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job, index) => (
            <div
              key={index}
              onClick={() => navigate("/JD", { state: { jobData: job } })}
              className="job-card-companyjd"
            >
              <div className="job-header">
                {job.logo ? (
                  <img src={job.logo} alt="logo" className="job-logo" />
                ) : (
                  <div className="job-logo-placeholder">No Logo</div>
                )}
                <div className="job-contenet-container">
                  <h4>{job.jobTitle}</h4>
                  <p className="comp-p">Department: {job.Department || "_"}</p>
                  <p className="comp-p">Company: {job.employer?.companyname || "_"}</p>
                </div>
              </div>
              <div className="job-meta">
                <span>
                  <IoBagOutline /> {formatExperience(job.experience)} &#8739;
                </span>
                <span>
                  <LiaRupeeSignSolid /> {formatSalary(job.salary)} &#8739;
                </span>
                <span>
                  <IoLocationOutline /> {job.location?.trim() || "Remote"}
                </span>
              </div>
              <p className="job-desc">
                <IoNewspaperOutline /> Openings: {job.openings > 0 ? job.openings : "Not specified"}
              </p>
              <p className="job-desc">
                <IoNewspaperOutline /> {job.jobDiscription}
              </p>
              <div className="job-skills">
                {job.skills &&
                  job.skills.split(",").map((skill, i) => (
                    <span key={i} className="job-skill">
                      {skill.trim()}
                    </span>
                  ))}
              </div>
              <div className="job-footer">
                <span>Posted: {formatDate(job.posted)}</span>
                {!isLogin ? (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      navigate("/login");
                    }}
                    className="save-btn"
                  >
                    <GrSave /> Save
                  </button>
                ) : (
                  <button className="save-btn">
                    <GrSave /> Saved
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="no-jobs-found">
            <h3>No jobs found matching your criteria</h3>
            <p>Try adjusting your filters or search terms</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanyJD;