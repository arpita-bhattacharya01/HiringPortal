import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const ProjectModal = ({ onClose, onSave, projectData }) => {
  const [formData, setFormData] = useState({
    projectTitle: "",
    client: "",
    projectEmployment: "",
    projectStatus: "",
    startYear: "",
    startMonth: "",
    endYear: "",
    endMonth: "",
    projectSite: "",
    employmentNature: "",
    teamSize: "",
    role: "",
    skills: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
  console.log("inside handlesubmit");
  try {
    const token = localStorage.getItem("token");
    console.log("Token:", token);

    const response = await axios.post(
      "http://localhost:3000/project-data",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("Response:", response);

    if (response.status === 200) {
      alert("Project data saved successfully");
      const copyData = [...projectData,formData]
      onSave(copyData);
      onClose();
    } else {
      alert("Failed to add project data");
    }
  } catch (error) {
    console.error("Error saving project data", error);
    alert("Something went wrong while submitting project data");
  }
};


const generateYearOptions = () => {
  const currentYear = new Date().getFullYear();
  return Array.from({ length: 30 }, (_, i) => currentYear - i);
};

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

return (
  <div className="modal-overlay d-flex align-items-center justify-content-center">
    <div className="modal-container bg-white p-4 rounded shadow w-100" style={{ maxWidth: "600px" }}>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="mb-0">Project</h4>
        <img
          onClick={onClose}
          src="./images/x-lg.svg"
          alt="close"
          width={22}
          height={22}
          style={{ cursor: "pointer" }}
        />
      </div>

      <div className="mb-3">
        <label>Project Title</label>
        <input
          type="text"
          name="projectTitle"
          className="form-control"
          placeholder="Project title"
          value={formData.projectTitle}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label>Tag this project with your employment/education</label>
        <select
          name="projectEmployment"
          className="form-select"
          value={formData.projectEmployment}
          onChange={handleChange}
        >
          <option value="">Select</option>
          <option value="UG">UG</option>
          <option value="PG">PG</option>
          <option value="Class XII">Class XII</option>
          <option value="Class X">Class X</option>
        </select>
      </div>

      <div className="mb-3">
        <label>Client</label>
        <input
          type="text"
          name="client"
          className="form-control"
          placeholder="Enter Client Name"
          value={formData.client}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label>Project Status</label>
        <div className="d-flex gap-3">
          {["In Progress", "Finished"].map((status) => (
            <div key={status} className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="projectStatus"
                value={status}
                checked={formData.projectStatus === status}
                onChange={handleChange}
              />
              <label className="form-check-label">{status}</label>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-3">
        <label>Worked From</label>
        <div className="d-flex gap-2">
          <select
            className="form-select"
            name="startYear"
            value={formData.startYear}
            onChange={handleChange}
          >
            <option value="">Year</option>
            {generateYearOptions().map((year) => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>

          <select
            className="form-select"
            name="startMonth"
            value={formData.startMonth}
            onChange={handleChange}
          >
            <option value="">Month</option>
            {months.map((month) => (
              <option key={month} value={month}>{month}</option>
            ))}
          </select>
        </div>
      </div>

      {formData.projectStatus === "Finished" && (
        <div className="mb-3">
          <label>Worked Till</label>
          <div className="d-flex gap-2">
            <select
              className="form-select"
              name="endYear"
              value={formData.endYear}
              onChange={handleChange}
            >
              <option value="">Year</option>
              {generateYearOptions().map((year) => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>

            <select
              className="form-select"
              name="endMonth"
              value={formData.endMonth}
              onChange={handleChange}
            >
              <option value="">Month</option>
              {months.map((month) => (
                <option key={month} value={month}>{month}</option>
              ))}
            </select>
          </div>
        </div>
      )}

      <div className="mb-3">
        <label>Details of Project</label>
        <textarea
          name="details"
          className="form-control"
          placeholder="Project Description..."
        />
      </div>

      <div className="mb-3">
        <label>Project Site</label>
        <div className="d-flex gap-3">
          {["Offsite", "Onsite"].map((site) => (
            <div key={site} className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="projectSite"
                value={site}
                checked={formData.projectSite === site}
                onChange={handleChange}
              />
              <label className="form-check-label">{site}</label>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-3">
        <label>Nature of Employment</label>
        <div className="d-flex gap-3">
          {["Full Time", "Part time"].map((type) => (
            <div key={type} className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="employmentNature"
                value={type}
                checked={formData.employmentNature === type}
                onChange={handleChange}
              />
              <label className="form-check-label">{type}</label>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-3">
        <label>Team Size</label>
        <select
          className="form-select"
          name="teamSize"
          value={formData.teamSize}
          onChange={handleChange}
        >
          <option value="">Select Team Size</option>
          {[...Array(10)].map((_, i) => (
            <option key={i + 1} value={i + 1}>{i + 1}</option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label>Role</label>
        <select
          className="form-select"
          name="role"
          value={formData.role}
          onChange={handleChange}
        >
          <option value="">Select Role</option>
          <option value="Domain Expert">Domain Expert</option>
          <option value="Sr. Project Leader">Sr. Project Leader</option>
          <option value="Solution Architect">Solution Architect</option>
          <option value="Quality Analyst">Quality Analyst</option>
          <option value="Database Architect / DBA">Database Architect / DBA</option>
          <option value="Network / System Administrator">Network / System Administrator</option>
          <option value="Project Leader">Project Leader</option>
          <option value="Module Leader">Module Leader</option>
          <option value="Sr. Programmer">Sr. Programmer</option>
          <option value="Programmer">Programmer</option>
          <option value="Test Engineer">Test Engineer</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div className="mb-3">
        <label>Skills Used</label>
        <input
          type="text"
          name="skills"
          className="form-control"
          placeholder="Enter Skills Used"
          value={formData.skills}
          onChange={handleChange}
        />
      </div>

      <div className="d-flex justify-content-end gap-2">
        <button className="btn btn-outline-secondary" onClick={onClose}>Cancel</button>
        <button className="btn btn-primary" onClick={handleSubmit}>Save</button>
      </div>
    </div>
  </div>
);
};

export default ProjectModal;
