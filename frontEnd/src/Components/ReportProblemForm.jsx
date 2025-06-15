import React, { useState } from 'react';
import './ReportProblemForm.css';
import EmpLoginNavbar from './EmpLoginNavbar';
import EmpLoginFooter from './EmpLoginFooter';
import axios from 'axios'

const ReportProblemForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    areaOfConcern: '',
    subject: '',
    details: '',
    file: null,
  });
  console.log(formData)

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();

    formDataToSend.append("name", formData.name);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("mobile", formData.mobile);
    formDataToSend.append("landline", formData.landline);
    formDataToSend.append("details", formData.details);
    formDataToSend.append("areaOfConcern", formData.areaOfConcern);
    formDataToSend.append("subject", formData.subject);
    if (formData.file) {
      formDataToSend.append("file", formData.file);
    }

    try {
      const response = await fetch("http://localhost:3000/reportaproblem", {
        method: "POST",
        body: formDataToSend,
      });

      if (!response.ok) {
        const text = await response.text(); // fallback to plain text
        throw new Error(text);
      }

      const result = await response.json();
      alert(result.message);
    } catch (err) {
      console.error("Failed to submit:", err);
      alert("Something went wrong: " + err.message);
    }
  };

  return (
    <>
      <EmpLoginNavbar />
      <div className="report-form-container">
        <h2>Report a Problem</h2>
        <p className="help-text">
          Our <a href="#">Help</a> section will provide answers to Frequently Asked Questions (<a href="#">FAQs</a>).
        </p>

        <form onSubmit={handleSubmit} className="report-form">
          <label>
            * Your Name:
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </label>

          <label>
            * Email Address:
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </label>

          <div className="phone-section">
            <label>
              * Mobile:
              <input type="text" name="mobile" value={formData.mobile} onChange={handleChange} required />
            </label>
            {/* <label>
            Landline:
            <div className="landline-group">
              <input type="text" name="landline1" value={formData.landline1} onChange={handleChange} />
              <span>-</span>
              <input type="text" name="landline2" value={formData.landline2} onChange={handleChange} />
            </div>
          </label> */}
          </div>

          <label>
            * Area of Concern:
            <select name="areaOfConcern" value={formData.areaOfConcern} onChange={handleChange} required>
              <option value="">Select Any Available Option</option>
              <option value="login">Login Issue</option>
              <option value="profile">Profile Issue</option>
              <option value="jobsearch">Job Search Issue</option>
              <option value="jobsearch">Other</option>
            </select>
          </label>

          <label>
            * Subject:
            <input type="text" name="subject" value={formData.subject} onChange={handleChange} required />
          </label>

          <label>
            * Details of Concern:
            <textarea name="details" rows="4" value={formData.details} onChange={handleChange} required />
          </label>

          <label>
            Attach Screenshot:
            <input type="file" name="file" accept="image/*" onChange={handleChange} />
            <small>Please upload a gif, png, jpg or jpeg only. [Max Size Limit 150Kb]</small>
          </label>

          <div className="captcha-placeholder">
            <input type="checkbox" id="captcha" required />
            <label htmlFor="captcha">I'm not a robot</label>
          </div>

          <button onClick={handleSubmit} className='reportproblem-submit-button' type="submit">Submit</button>
        </form>
      </div>
      <EmpLoginFooter />
    </>
  );
};

export default ReportProblemForm;
