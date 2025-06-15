import React, { useState } from "react";
import "./EmploymentModal.css";

const EmploymentModal = ({ onClose, onSave }) => {
  
  const [formData, setFormData] = useState({
    isCurrent: "Yes",
    employmentType: "Full-time",
    experienceYears: "",
    experienceMonths: "",
    companyName: "",
    jobTitle: "",
    joiningYear: "",
    joiningMonth: "",
    salary: "",
    skills: "",
    jobProfile: "",
    noticePeriod: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onSave(formData);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container rounded shadow-sm p-4">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="mb-0">Add Employment Details</h4>
          <img
            onClick={onClose}
            src="./images/x-lg.svg"
            width={20}
            height={20}
            alt="Close"
            className="cursor-pointer"
          />
        </div>

        {/* Form */}
        <div className="row gy-3">
          {/* Current Employment */}
          <div className="col-12">
            <label className="form-label">Is this your current employment?</label>
            <div className="form-check form-check-inline ms-3">
              <input
                className="form-check-input"
                type="radio"
                name="isCurrent"
                value="Yes"
                checked={formData.isCurrent === "Yes"}
                onChange={handleChange}
              />
              <label className="form-check-label">Yes</label>
            </div>
            <div className="form-check form-check-inline ms-3">
              <input
                className="form-check-input"
                type="radio"
                name="isCurrent"
                value="No"
                checked={formData.isCurrent === "No"}
                onChange={handleChange}
              />
              <label className="form-check-label">No</label>
            </div>
          </div>

          {/* Employment Type */}
          <div className="col-12">
            <label className="form-label">Employment Type</label>
            <div className="form-check form-check-inline ms-3">
              <input
                className="form-check-input"
                type="radio"
                name="employmentType"
                value="Full-time"
                checked={formData.employmentType === "Full-time"}
                onChange={handleChange}
              />
              <label className="form-check-label">Full-time</label>
            </div>
            <div className="form-check form-check-inline ms-3">
              <input
                className="form-check-input"
                type="radio"
                name="employmentType"
                value="Internship"
                checked={formData.employmentType === "Internship"}
                onChange={handleChange}
              />
              <label className="form-check-label">Internship</label>
            </div>
          </div>

          {/* Experience */}
          <div className="col-md-6">
            <label className="form-label">Experience (Years)</label>
            <input
              type="number"
              name="experienceYears"
              className="form-control"
              value={formData.experienceYears}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Experience (Months)</label>
            <input
              type="number"
              name="experienceMonths"
              className="form-control"
              value={formData.experienceMonths}
              onChange={handleChange}
            />
          </div>

          {/* Company & Title */}
          <div className="col-md-6">
            <label className="form-label">Company Name</label>
            <input
              type="text"
              name="companyName"
              className="form-control"
              placeholder="e.g. Google"
              value={formData.companyName}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Job Title</label>
            <input
              type="text"
              name="jobTitle"
              className="form-control"
              placeholder="e.g. Software Engineer"
              value={formData.jobTitle}
              onChange={handleChange}
            />
          </div>

          {/* Joining Date */}
          <div className="col-md-6">
            <label className="form-label">Joining Year</label>
            <input
              type="number"
              name="joiningYear"
              className="form-control"
              placeholder="e.g. 2023"
              value={formData.joiningYear}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Joining Month</label>
            <input
              type="text"
              name="joiningMonth"
              className="form-control"
              placeholder="e.g. January"
              value={formData.joiningMonth}
              onChange={handleChange}
            />
          </div>

          {/* Salary */}
          <div className="col-md-6">
            <label className="form-label">Current Salary (INR)</label>
            <input
              type="number"
              name="salary"
              className="form-control"
              placeholder="e.g. 500000"
              value={formData.salary}
              onChange={handleChange}
            />
          </div>

          {/* Skills */}
          <div className="col-md-6">
            <label className="form-label">Skills Used</label>
            <input
              type="text"
              name="skills"
              className="form-control"
              placeholder="e.g. React, Node.js"
              value={formData.skills}
              onChange={handleChange}
            />
          </div>

          {/* Job Profile */}
          <div className="col-12">
            <label className="form-label">Job Profile</label>
            <textarea
              name="jobProfile"
              rows="3"
              className="form-control"
              placeholder="Describe your job responsibilities..."
              value={formData.jobProfile}
              onChange={handleChange}
            ></textarea>
          </div>

          {/* Notice Period */}
          <div className="col-md-6">
            <label className="form-label">Notice Period</label>
            <select
              name="noticePeriod"
              className="form-select"
              value={formData.noticePeriod}
              onChange={handleChange}
            >
              <option value="">Select Notice Period</option>
              <option value="15 days">15 days</option>
              <option value="1 month">1 month</option>
              <option value="2 months">2 months</option>
              <option value="3 months">3 months</option>
            </select>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="d-flex justify-content-end mt-4 gap-2">
          <button className="btn btn-outline-secondary" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={handleSubmit}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default EmploymentModal;
