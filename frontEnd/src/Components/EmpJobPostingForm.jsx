import React, { useState } from "react";
import { X, Plus } from "lucide-react";
// import { useToast } from "@/hooks/use-toast";
import { toast } from 'react-toastify';
// import { useToast } from "../hooks/use-toast"; 
import "./EmpJobPostingForm.css"; // Custom CSS
import EmpLoginNavbar from "./EmpLoginNavbar";
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';


const EmpJobPostingForm = () => {

  //   const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    salary: "",
    experience: "",
    type: "Full-time",
    description: "",
    requirements: "",
    responsibilities: "",
    benefits: "",
    openings: "",
    department: ""
  });

  const [skills, setSkills] = useState([]);
  const [currentSkill, setCurrentSkill] = useState("");

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addSkill = () => {
    if (currentSkill.trim() && !skills.includes(currentSkill.trim())) {
      setSkills([...skills, currentSkill.trim()]);
      setCurrentSkill("");
    }
  };

  const removeSkill = (skillToRemove) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const employerId = localStorage.getItem("employerId");

    const jobData = {
      jobTitle: formData.title,
      location: formData.location,
      salary: formData.salary,
      experience: parseInt(formData.experience),
      jobType: formData.type,
      skills: skills.join(', '),
      jobDiscription: formData.description,
      requirement: formData.requirements,
      responsibilities: formData.responsibilities,
      benifit: formData.benefits,
      employerId: parseInt(employerId),
      openings: parseInt(formData.openings),
      Department: formData.department
    };

    try {
      const response = await axios.post("http://localhost:3000/jobs-data", jobData);

      if (response.status == 201) {
        alert("Job Posted Successfully")

        setFormData({
          title: "",
          location: "",
          salary: "",
          experience: "",
          type: "Full-time",
          description: "",
          requirements: "",
          responsibilities: "",
          benefits: "",
          openings: "",
          department: "",
          companyName: "",
        });
        setSkills([]);
      }
    } catch (error) {
      console.error("Failed to post job:", error);
      toast.error("Failed to post job. Please try again.");
    }
  };
  return (
    <>
      <EmpLoginNavbar />
      <div className="container my-5">
        <div className="card">
          <div className="card-header">
            <h2 className="h4 mb-0">Post a New Job</h2>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit} className="job-form">
              <div className="row mb-3">
                <div>
                  <label htmlFor="title" className="form-label">Job Title *</label>
                  <select
                    id="title"
                    name="title"
                    className="form-control"
                    required
                    value={formData.title}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Job Title</option>
                    <option value="Software Development">Software Development</option>
                    <option value="Web Developer">Web Developer</option>
                    <option value="Retail & B2C Sales">Retail & B2C Sales</option>
                    <option value="BD / Pre Sales">BD / Pre Sales</option>
                    <option value="Enterprise & B2B Sales">Enterprise & B2B Sales</option>
                    <option value="Technical Support">Technical Support</option>
                    <option value="Quality Assurance (QA)">Quality Assurance (QA)</option>
                    <option value="UI/UX Design">UI/UX Design</option>
                    <option value="Marketing & Communications">Marketing & Communications</option>
                    <option value="Product Management">Product Management</option>
                    <option value="Human Resources (HR)">Human Resources (HR)</option>
                    <option value="Data Analysis & BI">Data Analysis & BI</option>
                    <option value="Operations & Supply Chain">Operations & Supply Chain</option>
                    <option value="Finance & Accounting">Finance & Accounting</option>
                    <option value="Project Management">Project Management</option>
                    <option value="Content & Copywriting">Content & Copywriting</option>
                    <option value="Video Editing">Video Editing</option>
                  </select>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-4">
                  <label htmlFor="location" className="form-label">Location *</label>
                  <input type="text" id="location" name="location" className="form-control" required
                    value={formData.location} onChange={handleInputChange}
                    placeholder="e.g. Bangalore, Karnataka" />
                </div>
                <div className="col-md-4">
                  <label htmlFor="salary" className="form-label">Salary Range *</label>
                  <input type="text" id="salary" name="salary" className="form-control" required
                    value={formData.salary} onChange={handleInputChange}
                    placeholder="e.g. ₹12-18 LPA" />
                </div>
                <div className="col-md-4">
                  <label htmlFor="experience" className="form-label">Experience Required *</label>
                  <input type="number" id="experience" name="experience" className="form-control" required
                    value={formData.experience} onChange={handleInputChange}
                    placeholder="e.g. 3-5 years" />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="department" className="form-label">Department *</label>
                  <select
                    id="department"
                    name="department"
                    className="form-select"
                    value={formData.department}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Department</option>
                    <option value="Engineering - Software">Engineering - Software</option>
                    <option value="Sales & Business Dev.">Sales & Business Dev.</option>
                    <option value="Customer Success">Customer Success</option>
                    <option value="Finance & Accounting">Finance & Accounting</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Product Management">Product Management</option>
                    <option value="Design & UI/UX">Design & UI/UX</option>
                    <option value="Operations">Operations</option>
                    <option value="Human Resources (HR)">Human Resources (HR)</option>
                    <option value="Quality Assurance (QA)">Quality Assurance (QA)</option>
                    <option value="Legal">Legal</option>
                    <option value="Administration">Administration</option>
                    <option value="Technical Support">Technical Support</option>
                    <option value="Data Science">Data Science</option>
                    <option value="Content Writing">Content Writing</option>
                    <option value="IT Services & Consulting">IT Services & Consulting</option>
                    <option value="BPM / BPO">BPM / BPO</option>
                    <option value="Banking">Banking</option>
                    <option value="Medical Services">Medical Services</option>
                  </select>
                </div>

                <div className="col-md-6">
                  <label htmlFor="openings" className="form-label">No of openings *</label>
                  <input type="number" id="openings" name="openings" className="form-control" required
                    value={formData.openings} onChange={handleInputChange}
                    placeholder="e.g. 5" />
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="type" className="form-label">Job Type *</label>
                <select id="type" name="type" className="form-select" value={formData.type} onChange={handleInputChange} required>
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Internship">Internship</option>
                  <option value="Remote">Remote</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Required Skills *</label>
                <div className="d-flex gap-2 mb-2">
                  <input type="text" className="form-control" placeholder="Add a skill"
                    value={currentSkill} onChange={(e) => setCurrentSkill(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())} />
                  <button type="button" onClick={addSkill} className="btn btn-outline-secondary">
                    <Plus size={16} />
                  </button>
                </div>
                <div className="d-flex flex-wrap gap-2">
                  {skills.map((skill, index) => (
                    <span key={index} className="badge bg-secondary d-flex align-items-center">
                      {skill}
                      <button type="button" className="btn-close btn-close-white ms-2" onClick={() => removeSkill(skill)} aria-label="Remove skill"></button>
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="description" className="form-label">Job Description *</label>
                <textarea id="description" name="description" className="form-control" required
                  value={formData.description} onChange={handleInputChange}
                  placeholder="Describe the role, responsibilities..." rows={5} maxLength={100000} ></textarea>
              </div>

              <div className="mb-3">
                <label htmlFor="requirements" className="form-label">Requirements</label>
                <textarea id="requirements" name="requirements" className="form-control"
                  value={formData.requirements} onChange={handleInputChange}
                  placeholder="List the specific requirements..." rows={4} maxLength={100000}></textarea>
              </div>

              <div className="mb-3">
                <label htmlFor="responsibilities" className="form-label">Responsibilities</label>
                <textarea id="responsibilities" name="responsibilities" className="form-control"
                  value={formData.responsibilities} onChange={handleInputChange}
                  placeholder="List the specific requirements..." rows={4} maxLength={100000}></textarea>
              </div>

              <div className="mb-4">
                <label htmlFor="benefits" className="form-label">Benefits & Perks</label>
                <textarea id="benefits" name="benefits" className="form-control"
                  value={formData.benefits} onChange={handleInputChange}
                  placeholder="Describe the benefits and company culture..." rows={4} maxLength={1000}></textarea>
              </div>

              <div className="d-flex gap-3">
                <button type="submit" className="btn btn-primary">Post Job</button>
                <button type="button" className="btn btn-outline-secondary">Save as Draft</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>

  );
};

export default EmpJobPostingForm;
