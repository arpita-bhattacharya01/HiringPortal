import React, { useState, useEffect } from "react";
import "./ApplicationModal.css";
import axios from 'axios'

const ApplicationModal = ({ isOpen, onClose, onSubmitSuccess, jobId }) => {
  console.log("This is job id", jobId);
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    position: "",
    city: "",
    state: "",
    experience: "",
    education: "",
    degree: "",
    university: "",
    graduationYear: "",
    resume: null,
    photo: null,
    coverLetter: "",
    portfolio: "",
    skills: "",
    availability: "",
    salary: "",
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (field, file) => {
    setFormData((prev) => ({ ...prev, [field]: file }));
  };
  const token = localStorage.getItem("token")
  const handleSubmit = async () => {
    console.log("handlesubmit clicked")
    if (validateStep()) {
      const data = new FormData();

      // Append all fields
      for (const key in formData) {
        if (formData[key] !== null && formData[key] !== undefined) {
          data.append(key, formData[key]);
        }
      }

      // Add jobId
      data.append("jobId", jobId);

      console.log(data)

      try {
        const response = await axios.post('http://localhost:3000/applyjob', data, {
          headers: {
            'Content-Type': 'multipart/form-data',
            authorization: `bearer ${token}`
          }
        });

        console.log("Submitted: ", formData);
        console.log("Application submitted successfully!");
        setStep(3);
        setTimeout(() => {
          onSubmitSuccess();
        }, 1000);
      } catch (error) {
        console.error("Application failed:", error);
      }
    }
  };

  useEffect(() => {
    console.log("Current step:", step);
  }, [step]);
  const validateStep = () => {
    const newErrors = {};
    if (step === 1) {
      if (!formData.firstName?.trim()) newErrors.firstName = "Required";
      if (!formData.lastName?.trim()) newErrors.lastName = "Required";
      if (!formData.email?.trim()) newErrors.email = "Required";
      if (!formData.phone?.trim()) newErrors.phone = "Required";
      if (!formData.city?.trim()) newErrors.city = "Required";
      if (!formData.state?.trim()) newErrors.state = "Required";
      if (!formData.position) newErrors.position = "Required";
      if (!formData.experience) newErrors.experience = "Required";
    } else if (step === 2) {
      if (!formData.education) newErrors.education = "Required";
      if (!formData.degree?.trim()) newErrors.degree = "Required";
      if (!formData.university?.trim()) newErrors.university = "Required";
      if (!formData.graduationYear) newErrors.graduationYear = "Required";
      if (!formData.resume) newErrors.resume = "Resume is required";
      if (!formData.photo) newErrors.photo = "Photo is required";
      if (!formData.skills?.trim()) newErrors.skills = "Required";
      if (!formData.availability) newErrors.availability = "Required";
      if (!formData.salary?.trim()) newErrors.salary = "Required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const resetForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      city: "",
      state: "",
      position: "",
      experience: "",
      education: "",
      degree: "",
      university: "",
      graduationYear: "",
      resume: null,
      photo: null,
      coverLetter: "",
      portfolio: "",
      skills: "",
      availability: "",
      salary: "",
    });
    setErrors({});
    setStep(1);
    onClose();
  };

  const renderStep1 = () => (
    <div>
      <div className="row mb-3">
        <div className="col-md-6">
          <label>First Name *</label>
          <input
            type="text"
            className={`form-control ${errors.firstName && "is-invalid"}`}
            value={formData.firstName}
            onChange={(e) => handleInputChange("firstName", e.target.value)}
            required
          />
          {errors.firstName && (
            <div className="invalid-feedback">{errors.firstName}</div>
          )}
        </div>
        <div className="col-md-6">
          <label>Last Name *</label>
          <input
            type="text"
            className={`form-control ${errors.lastName && "is-invalid"}`}
            value={formData.lastName}
            onChange={(e) => handleInputChange("lastName", e.target.value)}
            required
          />
          {errors.lastName && (
            <div className="invalid-feedback">{errors.lastName}</div>
          )}
        </div>
      </div>
      <div className="mb-3">
        <label>Email Address *</label>
        <input
          type="email"
          className={`form-control ${errors.email && "is-invalid"}`}
          value={formData.email}
          onChange={(e) => handleInputChange("email", e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label>Phone Number *</label>
        <input
          type="tel"
          className={`form-control ${errors.phone && "is-invalid"}`}
          value={formData.phone}
          onChange={(e) => handleInputChange("phone", e.target.value)}
          required
        />
        {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
      </div>
      <div className="row mb-3">
        <div className="col-md-6">
          <label>City *</label>
          <input
            type="text"
            className={`form-control ${errors.city ? "is-invalid" : ""}`}
            value={formData.city}
            onChange={(e) => handleInputChange("city", e.target.value)}
            required
          />
          {errors.city && <div className="invalid-feedback">{errors.city}</div>}
        </div>
        <div className="col-md-6">
          <label>State *</label>
          <input
            type="text"
            className={`form-control ${errors.state ? "is-invalid" : ""}`}
            list="stateOptions"
            value={formData.state}
            onChange={(e) => handleInputChange("state", e.target.value)}
            required />
          <datalist id="stateOptions">
            <option value="Andhra Pradesh" />/             <option value="Arunachal Pradesh" />
            <option value="Assam" />
            <option value="Bihar" />
            <option value="Chhattisgarh" />
            <option value="Goa" />
            <option value="Haryana" />
            <option value="Himachal Pradesh" />
            <option value="Jharkhand" />
            <option value="Karnataka" />
            <option value="Kerala" />
            <option value="Madhya Pradesh" />
            <option value="Maharashtra" />/             <option value="Manipur" />
            <option value="Meghalaya" />
            <option value="Mizoram" />
            <option value="Nagaland" />
            <option value="Odisha" />
            <option value="Punjab" />
            <option value="Rajasthan" />
            <option value="Sikkim" />
            <option value="Tamil Nadu" />             <option value="Telangana" />             <option value="Tripura" />
            <option value="Uttar Pradesh" />
            <option value="Uttarakhand" />
            <option value="West Bengal" />
            <option value="Delhi" />
            <option value="Jammu and Kashmir" />
          </datalist>
          {errors.state && (
            <div className="invalid-feedback">{errors.state}</div>
          )}
        </div>
      </div>
      <div className="mb-3">
        <label>Position Applied For *</label>
        <select
          className={`form-control ${errors.position && "is-invalid"}`}
          onChange={(e) => handleInputChange("position", e.target.value)}
          required
        >
          <option>Select a position</option>
          <option value="software-engineer">Software Engineer</option>
          <option value="product-designer">Product Designer</option>
          <option value="marketing-manager">Marketing Manager</option>
          <option value="data-analyst">Data Analyst</option>
          <option value="project-manager">Project Manager</option>
          <option value="other">Other</option>
        </select>
        {errors.position && (
          <div className="invalid-feedback">{errors.position}</div>
        )}
      </div>
      <div className="mb-4">
        <label>Years of Experience *</label>
        <select
          className={`form-control ${errors.experience && "is-invalid"}`}
          onChange={(e) => handleInputChange("experience", e.target.value)}
          required
        >
          <option>Select experience</option>
          <option value="0-1">0-1 years</option>
          <option value="2-3">2-3 years</option>
          <option value="4-5">4-5 years</option>
          <option value="6-10">6-10 years</option>
          <option value="10+">10+ years</option>
        </select>
        {errors.experience && (
          <div className="invalid-feedback">{errors.experience}</div>
        )}
      </div>
      <div className="text-end">
        <button
          className="btn btn-primary"
          onClick={() => {
            if (validateStep()) {
              setStep(2);
            }
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
  const renderStep2 = () => (
    <div>
      <div className="row mb-3">
        <div className="col-md-6">
          <label>
            Education Level <span className="text-danger">*</span>
          </label>
          <select
            className={`form-select ${errors.education && "is-invalid"}`}
            value={formData.education}
            onChange={(e) => handleInputChange("education", e.target.value)}
          >
            <option value="">Select</option>
            <option value="high-school">High School</option>
            <option value="bachelors">Bachelor's Degree</option>
            <option value="masters">Master's Degree</option>
            <option value="phd">PhD</option>
            <option value="other">Other</option>
          </select>
          {errors.education && (
            <div className="invalid-feedback">{errors.education}</div>
          )}
        </div>
        <div className="col-md-6">
          <label>
            Degree/Major <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            className={`form-control ${errors.degree && "is-invalid"}`}
            value={formData.degree}
            onChange={(e) => handleInputChange("degree", e.target.value)}
          />
          {errors.degree && (
            <div className="invalid-feedback">{errors.degree}</div>
          )}
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-md-6">
          <label>
            University/Institution <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            className={`form-control ${errors.university && "is-invalid"}`}
            value={formData.university}
            onChange={(e) => handleInputChange("university", e.target.value)}
          />
          {errors.university && (
            <div className="invalid-feedback">{errors.university}</div>
          )}
        </div>
        <div className="col-md-6">
          <label>
            Graduation Year <span className="text-danger">*</span>
          </label>
          <input
            type="number"
            className={`form-control ${errors.graduationYear && "is-invalid"}`}
            value={formData.graduationYear}
            onChange={(e) =>
              handleInputChange("graduationYear", e.target.value)
            }
          />
          {errors.graduationYear && (
            <div className="invalid-feedback">{errors.graduationYear}</div>
          )}
        </div>
      </div>

      <div className="mb-3">
        <label>
          Resume/CV <span className="text-danger">*</span>
        </label>
        <input
          type="file"
          className={`form-control ${errors.resume && "is-invalid"}`}
          onChange={(e) =>
            handleFileChange("resume", e.target.files?.[0] || null)
          }
        />
        {errors.resume && (
          <div className="invalid-feedback">{errors.resume}</div>
        )}
      </div>

      <div className="mb-3">
        <label>
          Professional Photo <span className="text-danger">*</span>
        </label>
        <input
          type="file"
          className={`form-control ${errors.photo && "is-invalid"}`}
          onChange={(e) =>
            handleFileChange("photo", e.target.files?.[0] || null)
          }
        />
        {errors.photo && <div className="invalid-feedback">{errors.photo}</div>}
      </div>

      <div className="mb-3">
        <label>
          Key Skills <span className="text-danger">*</span>
        </label>
        <textarea
          className={`form-control ${errors.skills && "is-invalid"}`}
          rows="3"
          value={formData.skills}
          onChange={(e) => handleInputChange("skills", e.target.value)}
        />
        {errors.skills && (
          <div className="invalid-feedback">{errors.skills}</div>
        )}
      </div>

      <div className="mb-3">
        <label>Cover Letter</label>
        <textarea
          className="form-control"
          rows="4"
          value={formData.coverLetter}
          onChange={(e) => handleInputChange("coverLetter", e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label>Portfolio/LinkedIn</label>
        <input
          type="url"
          className="form-control"
          value={formData.portfolio}
          onChange={(e) => handleInputChange("portfolio", e.target.value)}
        />
      </div>

      <div className="row mb-4">
        <div className="col-md-6">
          <label>
            Availability <span className="text-danger">*</span>
          </label>
          <select
            className={`form-select ${errors.availability && "is-invalid"}`}
            value={formData.availability}
            onChange={(e) => handleInputChange("availability", e.target.value)}
          >
            <option value="">Select availability</option>
            <option value="immediately">Immediately</option>
            <option value="2-weeks">2 weeks</option>
            <option value="1-month">1 month</option>
            <option value="2-months">2-3 months</option>
          </select>
          {errors.availability && (
            <div className="invalid-feedback">{errors.availability}</div>
          )}
        </div>
        <div className="col-md-6">
          <label>
            Expected Salary <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            className={`form-control ${errors.salary && "is-invalid"}`}
            value={formData.salary}
            onChange={(e) => handleInputChange("salary", e.target.value)}
          />
          {errors.salary && (
            <div className="invalid-feedback">{errors.salary}</div>
          )}
        </div>
      </div>

      <div className="d-flex justify-content-between">
        <button
          className="btn btn-outline-secondary"
          onClick={() => setStep(1)}
        >
          Back
        </button>
        <button className="btn btn-success" onClick={handleSubmit}>
          Submit Application
        </button>
      </div>
    </div>
  );
  const renderCongratulations = () => (
    <div className="text-center py-4">
      <div className="congrats-icon mb-3">🎉</div>
      <h4 className="fw-bold text-success">Congratulations!</h4>
      <p className="text-muted">Your application has been submitted.</p>
      <div className="alert alert-success text-start mt-3">
        <strong>Next Steps:</strong>
        <br />
        • We’ll review your application in 3-5 business days
        <br />
        • If selected, you’ll be contacted for an interview
        <br />• Check your email for confirmation
      </div >
      <button className="btn btn-primary mt-3" onClick={resetForm}>
        Close
      </button>
    </div>

  );

  if (!isOpen) return null; return (
    <div className="modal show d-block" tabIndex="-1">
      <div className="modal-dialog modal-lg modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              {step === 1 && "Personal Information"}
              {step === 2 && "Education & Documents"}
              {step === 3 && "Application Submitted"}
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            {step === 1 && renderStep1()}
            {step === 2 && renderStep2()}
            {step === 3 && renderCongratulations()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationModal;

