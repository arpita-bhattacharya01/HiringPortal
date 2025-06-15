import React, { useState } from "react";
// import "./EducationModal.css";
import axios from 'axios';

const EducationModal = ({ onClose, onSave  }) => {
  const [formData, setFormData] = useState({
    education: "",
    university: "",
    course: "",
    specialization: "",
    courseType: "Full time",
    startingYear: "",
    endingYear: "",
    gradingSystem: ""
  });

  console.log(formData)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
  const {
    education,
    university,
    course,
    specialization,
    startingYear,
    endingYear,
    gradingSystem
  } = formData;

  if (
    !education ||
    !university ||
    !course ||
    !specialization ||
    !startingYear ||
    !endingYear ||
    !gradingSystem
  ) {
    alert("Please fill all required fields.");
    return;
  }

  if (parseInt(endingYear) < parseInt(startingYear)) {
    alert("Ending year must be after or equal to starting year.");
    return;
  }

  try {
    const token = localStorage.getItem("token"); 
    const response = await axios.post("http://localhost:3000/add-education",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    if (response.status === 200) {
      alert("Education data added successfully!");
      onSave(formData);
      onClose();
    } else {
      alert("Failed to add education data.");
    }
  } catch (error) {
    console.error("Error saving education data:", error);
    alert("Something went wrong while submitting education.");
  }
};
  const generateYearOptions = () => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: 30 }, (_, i) => currentYear - i).reverse();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container rounded shadow-sm p-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="mb-0">Add Education</h4>
          <img
            onClick={onClose}
            src="./images/x-lg.svg"
            alt="Close"
            width={20}
            height={20}
            role="button"
            aria-label="Close modal"
            className="cursor-pointer"
          />
        </div>

        {/* Form Layout */}
        <div className="row gy-3">
          {/* Education */}
          <div className="col-md-6">
            <label className="form-label">Education</label>
            <select name="education" className="form-select" value={formData.education} onChange={handleChange}>
              <option value="">Select Education</option>
              <option value="Bachelor's">Bachelor's</option>
              <option value="Master's">Master's</option>
              <option value="Diploma">Diploma</option>
              <option value="PhD">PhD</option>
            </select>
          </div>

          {/* University */}
          <div className="col-md-6">
            <label className="form-label">University/Institute</label>
            <input
              type="text"
              name="university"
              className="form-control"
              placeholder="e.g., Galgotias University"
              value={formData.university}
              onChange={handleChange}
            />
          </div>

          {/* Course */}
          <div className="col-md-6">
            <label className="form-label">Course</label>
            <select name="course" className="form-select" value={formData.course} onChange={handleChange}>
              <option value="">Select Course</option>
              <option value="B.Tech">B.Tech</option>
              <option value="MCA">MCA</option>
              <option value="BSc">BSc</option>
              <option value="MBA">MBA</option>
            </select>
          </div>

          {/* Specialization */}
          <div className="col-md-6">
            <label className="form-label">Specialization</label>
            <input
              type="text"
              name="specialization"
              className="form-control"
              placeholder="e.g., Computer Science"
              value={formData.specialization}
              onChange={handleChange}
            />
          </div>

          {/* Course Type */}
          <div className="col-12">
            <label className="form-label d-block mb-1">Course Type</label>
            {["Full time", "Part time", "Correspondence/Distance learning"].map((type) => (
              <div className="form-check form-check-inline" key={type}>
                <input
                  className="form-check-input"
                  type="radio"
                  name="courseType"
                  value={type}
                  checked={formData.courseType === type}
                  onChange={handleChange}
                />
                <label className="form-check-label">{type}</label>
              </div>
            ))}
          </div>

          {/* Course Duration */}
          <div className="col-md-6">
            <label className="form-label">Starting Year</label>
            <select name="startingYear" className="form-select" value={formData.startingYear} onChange={handleChange}>
              <option value="">Select Year</option>
              {generateYearOptions().map((year) => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>

          <div className="col-md-6">
            <label className="form-label">Ending Year</label>
            <select name="endingYear" className="form-select" value={formData.endingYear} onChange={handleChange}>
              <option value="">Select Year</option>
              {generateYearOptions().map((year) => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>

          {/* Grading System */}
          <div className="col-md-6">
            <label className="form-label">Grading System</label>
            <select name="gradingSystem" className="form-select" value={formData.gradingSystem} onChange={handleChange}>
              <option value="">Select Grading System</option>
              <option value="Percentage">Percentage</option>
              <option value="CGPA (10 scale)">CGPA (10 scale)</option>
              <option value="CGPA (4 scale)">CGPA (4 scale)</option>
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

export default EducationModal;
