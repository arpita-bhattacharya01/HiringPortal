import React from "react";
import { FaMapMarkerAlt, FaUserGraduate, FaCalendarAlt, FaPhone, FaEnvelope } from "react-icons/fa";
import "./ProfileCard.css";
import Navbar from "./Navbar";
import FooterNew from "./FooterNew"
import EmploymentModal from "./EmploymentModel";
import ResumeHeadlineModal from "./ResumeHeadlineModal";
import EducationModal from "./EducationModal";
import ProjectModal from "./projectmodal";
import CareerProfileForm from "./CareerProfileForm";
import PersonalDetailsForm from "./PersonalDetailsForm";
import KeySkillsComponent from "./KeySkillsComponent";
import OnlineProfileComponent from "./OnlineProfileComponent ";




import { Modal, Button } from 'react-bootstrap';
import AvatarEditor from 'react-avatar-editor';
import { Camera } from 'lucide-react';
import "./ProfileCard.css";
import { useState, useEffect, useRef } from "react";



import axios from 'axios'


const careerdata = {
    currentIndustry: "IT Services & Consulting",
    department: "Project & Program Management",
    roleCategory: "Technology / IT",
    jobRole: "IT Project Lead",
    desiredJobType: "",
    desiredEmploymentType: "",
    preferredShift: "",
    expectedSalary: "",
    preferredLocations: [
        "Greater Noida", "Agra", "Pune", "Gurgaon/Gurugram", "Noida",
        "Ghaziabad", "New Delhi", "Chennai", "Mumbai", "Bangalore/Bengaluru"
    ]
};


const accomplishmentsData = {
    "Online profile": [
        { platform: "Leet Code", url: "https://leetcode.com/u/Aman_113/" },
        { platform: "LinkedIn", url: "https://www.linkedin.com/in/aman-khan-0a63b71aa/" }
    ],
    "Work sample": null,
    "White paper / Research publication / Journal entry": null,
    "Presentation": null,
    "Patent": null,
    "Certification": null
};

const renderField = ({ label, value, placeholder = "Not specified" }) => {
    // Helper function to safely render values
    const renderValue = (val) => {
        // Handle null/undefined/empty
        if (val == null || val === '') return placeholder;

        // Handle arrays
        if (Array.isArray(val)) {
            return val.length > 0
                ? val.map(item => renderValue(item)).join(', ')
                : placeholder;
        }

        // Handle language objects specially
        if (label === "Languages" && typeof val === 'object') {
            return val.language || placeholder;
        }

        // Handle date objects
        if (label === "Date of Birth") {
            if (typeof val === 'object' && val.day && val.month && val.year) {
                return `${val.day} ${val.month} ${val.year}`;
            }
            if (typeof val === 'string') {
                const [day, month, year] = val.split('-');
                if (day && month && year) {
                    return new Date(`${year}-${month}-${day}`).toLocaleDateString();
                }
                return val; // Return as-is if not in expected format
            }
        }

        // Handle address objects
        if (label === "Address") {
            if (typeof val === 'string') return val;
            if (typeof val === 'object') {
                return `${val.street || ''}, ${val.city || ''}, ${val.state || ''}${val.pincode ? ` - ${val.pincode}` : ''}`.trim();
            }
        }

        // Handle other objects
        if (typeof val === 'object') {
            return JSON.stringify(val);
        }

        // Default case for strings/numbers
        return String(val);
    };

    return (
        <div className="profile-field">
            <label>{label}</label>
            <div className="field-value">
                {renderValue(value)}
            </div>
        </div>
    );
};
const ProfileCard = ({ onClose, onSave }) => {
    const [headline, setHeadline] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [showEmploymentModal, setShowEmploymentModal] = useState(false)
    const [showEducationModal, setShowEducationModal] = useState(false);
    const [showProjectModal, setShowProjectModal] = useState(false);
    const [showCareerProfile, setShowCareerProfile] = useState(false);
    const [showPersonalProfile, setShowPesonalProfile] = useState(false);
    const [showSkillModal, setShowSkillModal] = useState(false);
    const [showOnlineProfile, setShowOnlineProfile] = useState(false);
    const [skills, setSkills] = useState([]);
    const [educationData, setEducationData] = useState([])
    const [projectData, setprojectData] = useState([])
    const [personalData, setPersonalData] = useState({
        gender: '',
        maritalStatus: '',
        dob: '',
        category: '',
        differentlyAbled: '',
        careerBreak: '',
        address: {},
        hometown: '',
        pincode: '',
        languages: []
    });
    const [careerdata, setcareerdata] = useState([])

    

const [uploading, setUploading] = useState(false);
const [profileImage, setProfileImage] = useState("https://cdn-icons-png.flaticon.com/512/149/149071.png");
const [selectedImage, setSelectedImage] = useState(null);
const [zoom, setZoom] = useState(1.2);
const [showEditor, setShowEditor] = useState(false);
const editorRef = useRef();



const handleCameraClick = () => {
    document.getElementById('profileUpload').click();
};

const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
        setSelectedImage(file);
        setShowEditor(true);
    }
};

const handleSaveImage = async () => {
    if (editorRef.current) {
        const canvas = editorRef.current.getImageScaledToCanvas().toDataURL();
        setProfileImage(canvas); // Show preview
        setShowEditor(false);

        // Optional: upload to server
        const blob = await (await fetch(canvas)).blob();
        const formData = new FormData();
        formData.append("profilePhoto", blob, "avatar.jpg");

        setUploading(true);
        try {
            const response = await fetch("http://localhost:3000/upload_user_profile", {
                method: "POST",
                body: formData,
            });
            const result = await response.json();
            if (response.ok) {
                setMessage("Profile photo uploaded successfully!");
            } else {
                setMessage("Upload failed: " + result.error);
            }
        } catch (error) {
            console.error(error);
            setMessage("Error uploading image.");
        } finally {
            setUploading(false);
        }
    }
};



    const handleSave = (newHeadline) => {
        setHeadline(newHeadline);
        setShowModal(false);
    };
    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('user'));
        console.log("User data from localStorage:", userData);
        console.log(userData.keySkills)

        if (userData) {
            setHeadline(userData.heading || '');
            const safeSkills = Array.isArray(userData.keySkills)
                ? userData.keySkills
                : (userData.keySkills || '').split(',').map(s => s.trim());

            console.log("Setting skills:", safeSkills);
            setSkills(safeSkills);
        }

        const fetchEducationData = async () => {
            try {
                console.log("Inside fetchEducationData");
                const token = localStorage.getItem("token");
                console.log(token)

                if (!token) {
                    console.warn("No token found in localStorage.");
                    setEducationData([]);
                    return;
                }

                const res = await axios.get("http://localhost:3000/get-education-data", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                console.log('Education API Response:', res.data);

                const safeData = Array.isArray(res.data.data)
                    ? res.data.data.map((edu) => ({
                        ...edu,
                        projects: Array.isArray(edu.projects) ? edu.projects : [],
                    }))
                    : [];
                console.log("this is a safe data ", safeData)
                setEducationData(safeData);

            } catch (error) {
                console.error('Failed to fetch education data:', error);
                setEducationData([]);
            }
        };

        const fetchProjectdata = async () => {
            console.log("inside fetchprojectdata")
            try {
                const token = localStorage.getItem("token")
                if (!token) {
                    console.log("no token found in local storage.")
                    setprojectData([])
                    return;
                }
                const response = await axios.get('http://localhost:3000/get-project-data', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                const safeData = Array.isArray(response.data.data)
                    ? response.data.data.map((project) => ({
                        ...project

                    }))
                    : [];
                console.log("This is a safe data for project", safeData)
                setprojectData(safeData)

            } catch (error) {
                console.error("failed to fetch education data", error)
                setprojectData([])
            }
        }


        // In your fetchpersonaldata function:
        const fetchpersonaldata = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) return;

                const response = await axios.get('http://localhost:3000/get-personal-data', {
                    headers: { Authorization: `Bearer ${token}` }
                });

                if (response.data.success && response.data.data) {
                    setPersonalData({
                        ...response.data.data,
                        // Ensure languages is always an array
                        languages: response.data.data.languages || []
                    });
                }
            } catch (error) {
                console.error("Failed to fetch personal data", error);
            }
        };
        fetchProjectdata();
        fetchEducationData();
        fetchpersonaldata();
    }, []);


    const handleSkillsSave = (updatedSkills) => {
        setSkills(updatedSkills);
    };

    return (
        <>
            <Navbar />
            <div className="profile-card">
                <div className="profile-left">
                    <div className="profile-image-wrapper">
                        <img
                            src={profileImage}
                            alt="Aman Khan"
                            className="profile-image"
                        />
                        <button
                            className="btn btn-sm btn-primary position-absolute"
                            style={{
                                bottom: "0",
                                right: "0",
                                borderRadius: "50%",
                                padding: "6px",
                            }}
                            onClick={handleCameraClick}
                            disabled={uploading}
                        >
                            <Camera size={16} />
                        </button>
                        <input
                            type="file"
                            accept="image/*"
                            id="profileUpload"
                            style={{ display: "none" }}
                            onChange={handlePhotoChange}
                        />
                        <div className="profile-completion">88%</div>

                        {/* Avatar Editor Modal */}
                        <Modal show={showEditor} onHide={() => setShowEditor(false)} centered>
                            <Modal.Header closeButton>
                                <Modal.Title>Edit Profile Image</Modal.Title>
                            </Modal.Header>
                            <Modal.Body className="text-center">
                                {selectedImage && (
                                    <AvatarEditor
                                        ref={editorRef}
                                        image={selectedImage}
                                        width={250}
                                        height={250}
                                        border={50}
                                        borderRadius={125}
                                        color={[255, 255, 255, 0.6]}
                                        scale={zoom}
                                        rotate={0}
                                    />
                                )}

                                {/* 🔍 Zoom Slider */}
                                <div className="my-2 text-center">
                                    <label htmlFor="zoomRange" className="form-label fw-semibold">
                                        Zoom
                                    </label>
                                    <input
                                        id="zoomRange"
                                        type="range"
                                        min="1"
                                        max="3"
                                        step="0.01"
                                        value={zoom}
                                        onChange={(e) => setZoom(parseFloat(e.target.value))}
                                        className="form-range"
                                        style={{ width: "200px", margin: "0 auto" }}
                                    />
                                </div>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={() => setShowEditor(false)}>Cancel</Button>
                                <Button variant="primary" onClick={handleSaveImage}>Save Image</Button>
                            </Modal.Footer>
                        </Modal>

                    </div>

                    <div className="profile-details">
                        <div>
                            <h2 className="profile-name">Aman Khan</h2>
                            <p className="profile-update">Profile last updated - <strong>09 May, 2025</strong></p>
                        </div>
                        <hr />
                        <div className="profile-info d-flex">
                            <div>
                                <p><FaMapMarkerAlt /> Noida, INDIA</p>
                                <p><FaUserGraduate /> Fresher</p>
                                <p><FaCalendarAlt /> Available to join in 1 Month</p>
                            </div>
                            <div className="horizontal-line-div">
                                <hr className="rotate" />
                                {/* this div is used to show line */}
                            </div>
                            <div>
                                <p><FaPhone /> 9368070856 <span className="verify-link">Verify</span></p>
                                <p><FaEnvelope /> mrkhan9368@gmail.com <span className="verified-icon">✔</span></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="profile-card-copy">
                <div className="container-for-quick-link">
                    <h5 className="fw-bold m-4">Quick Link</h5>
                    <div className="quick-link-btn">Resume</div>
                    <div className="quick-link-btn">Resume Headline</div>
                    <div className="quick-link-btn">Key Skills</div>
                    <div className="quick-link-btn">Education </div>
                    <div className="quick-link-btn">IT Skills </div>
                    <div className="quick-link-btn">Project </div>
                    <div className="quick-link-btn">Prooject Summary </div>
                    <div className="quick-link-btn">Accomplishment </div>
                    <div className="quick-link-btn">Carrier Profile </div>
                    <div className="quick-link-btn">Personal Profile</div>
                </div>
                <div>
                    <div className="resume-section">
                        <div className="resume-header">
                            <div>
                                <h3>Resume</h3>
                                <p className="resume-file">Aman_Khan_Resume_2.pdf</p>
                                <p className="resume-date">Uploaded on May 09, 2025</p>
                            </div>
                            <div className="resume-actions">
                                <img className="delete-download-icon" src="./images/download.svg" width={20} height={20} alt="Not found" />
                                <img className="delete-download-icon" src="./images/trash3.svg" width={20} height={20} alt="Not Found" />
                            </div>
                        </div>

                        <div className="resume-upload-box">
                            <input type="file" name="file" id="file" />
                            <p className="upload-hint">
                                Supported Formats: doc, docx, rtf, pdf, upto 2 MB
                            </p>
                        </div>
                    </div>
                    <div className="resume-heading-section">
                        <div className="resume-header">
                            <h6 className="fw-bold">Resume Headline </h6>
                            <span onClick={() => setShowModal(true)} className="edit-icon">✏️</span>
                        </div>
                        <div className="resume-upload-box">
                            {headline}
                        </div>
                    </div>
                    {showModal && (
                        <ResumeHeadlineModal
                            initialHeadline={headline}
                            onSave={(data, callback) => {
                                handleSave(data);
                                if (callback) callback();
                            }}
                            onClose={() => setShowModal(false)}
                        />
                    )}
                    <div className="resume-heading-section">
                        <div className="resume-header">
                            <h6 className="fw-bold">Key Skills</h6>
                            <span
                                onClick={() => setShowSkillModal(true)}
                                className="edit-icon"
                                style={{ cursor: "pointer" }}
                                title="Edit key skills"
                            >
                                ✏️
                            </span>
                        </div>
                        <div className="skills-list" style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                            {skills.length === 0 ? (
                                <p>No skills added yet.</p>
                            ) : (
                                skills.map((skill, idx) => (
                                    <div
                                        key={idx}
                                        className="skill-badge"
                                        style={{
                                            backgroundColor: "#ddd",
                                            padding: "5px 10px",
                                            borderRadius: "12px",
                                            fontSize: "0.85rem",
                                        }}
                                    >
                                        {skill}
                                    </div>
                                ))
                            )}
                        </div>

                        <KeySkillsComponent
                            show={showSkillModal}
                            onClose={() => setShowSkillModal(false)}
                            onSave={handleSkillsSave}
                            initialSkills={skills}
                        />
                    </div>
                    <div className="resume-heading-section">
                        <div className="resume-header">
                            <h6 className="fw-bold">Employment</h6>
                            <span onClick={() => setShowEmploymentModal(true)} className="add-link">Add Employment</span>
                        </div>
                        <div className="resume-upload-box">
                            Your employment details will help recruiters understand your experience
                        </div>

                        {showEmploymentModal && (
                            <EmploymentModal
                                onClose={() => setShowEmploymentModal(false)}
                                onSave={handleSave}
                            />
                        )}
                    </div>
                    <div className="resume-heading-section">
                        <div className="header">
                            <h4>Education</h4>
                            <span onClick={() => setShowEducationModal(true)} className="add-link">Add education</span>
                        </div>
                        {educationData.map((edu, idx) => (
                            <div className="education-entry" key={idx}>
                                <div className="degree-line">
                                    <strong>{edu.course}</strong> <span className="edit-icon">✏️</span>
                                </div>
                                <div className="institution">{edu.university}</div>
                                <div className="duration-type">{edu.startingYear} - {edu.endingYear} | {edu.education}</div>
                            </div>
                        ))}
                        <div className="add-doctorate">Add doctorate/PhD</div>
                        {showEducationModal && (
                            <EducationModal
                                onClose={() => setShowEducationModal(false)}
                                onSave={setEducationData}
                            />
                        )}
                    </div>
                    <div className="resume-heading-section">
                        <div className="projects-header">
                            <h4>Projects</h4>
                            <span onClick={() => setShowProjectModal(true)} className="add-link">Add project</span>
                        </div>

                        {projectData.length > 0 && projectData.map((project, index) => (
                            <div className="project-entry" key={index}>
                                <div className="project-title">
                                    <strong>{project.projectTitle}</strong> <span className="edit-icon">✏️</span>
                                </div>
                                <div className="project-org">{project.client} ({project.projectSite})</div>
                                <div className="project-duration">{project.startMonth}-{project.startYear} to {project.endMonth}-{project.endYear} ({project.employmentNature})</div>
                                <div className="project-description">{project.skills}</div>
                            </div>
                        ))}
                        {showProjectModal && (
                            <ProjectModal
                                onClose={() => setShowProjectModal(false)}
                                onSave={setprojectData}
                                projectData={projectData}
                            />
                        )}
                    </div>
                    <div className="resume-heading-section">
                        <div className="accomplishments-section">
                            <h4>Accomplishments</h4>
                            {Object.entries(accomplishmentsData).map(([title, entries]) => (
                                <div key={title} className="accomplishment-field">
                                    <strong>{title}</strong>
                                    {entries && Array.isArray(entries) ? (
                                        <ul>
                                            {entries.map((item, index) => (
                                                <li key={index}>
                                                    <a href={item.url} target="_blank" rel="noopener noreferrer">
                                                        {item.platform}
                                                    </a>
                                                </li>
                                            ))}
                                            <a onClick={() => setShowOnlineProfile(true)} href="#" className="add-link">Add</a>
                                        </ul>


                                    ) : (
                                        <a onClick={() => setShowOnlineProfile(true)} href="#" className="add-link">Add</a>
                                    )}
                                </div>
                            ))}
                        </div>
                        {showOnlineProfile && (
                            <OnlineProfileComponent
                                onClose={() => setShowOnlineProfile(false)}
                                onSave={handleSave}
                            />
                        )}
                    </div>
                    <div className="resume-heading-section">
                        <div className="career-profile-header">
                            <h4>Career profile</h4>
                            <span onClick={() => setShowCareerProfile(true)} className="edit-icon">✏️</span>
                        </div>
                        <div className="career-profile-grid">
                            {renderField("Current industry", careerdata.currentIndustry, "current industry")}
                            {renderField("Department", careerdata.department, "department")}
                            {renderField("Role category", careerdata.roleCategory, "role category")}
                            {renderField("Job role", careerdata.jobRole, "job role")}
                            {renderField("Desired job type", careerdata.desiredJobType, "desired job type")}
                            {renderField("Desired employment type", careerdata.desiredEmploymentType, "employment type")}
                            {renderField("Preferred shift", careerdata.preferredShift, "preferred shift")}
                            {renderField("Expected salary", careerdata.expectedSalary, "expected salary")}
                            <div>
                                <label>Preferred work location</label>
                                <p>{careerdata.preferredLocations ? careerdata.preferredLocations.join(", ") : "NA"}</p>
                            </div>
                            {renderField("Expected salary", careerdata.expectedSalary, "expected salary")}
                        </div>
                        {showCareerProfile && (
                            <CareerProfileForm
                                onClose={() => setShowCareerProfile(false)}
                                onSave={setcareerdata}
                            />
                        )}
                    </div>
                    <div className="resume-heading-section">
                        <div className="career-profile-header">
                            <h4>Personal Detail</h4>
                            <span onClick={() => setShowPesonalProfile(true)} className="edit-icon">✏️</span>
                        </div>
                        <div className="career-profile-grid">
                            {renderField({
                                label: "Gender",
                                value: personalData?.gender,
                                placeholder: "Not specified"
                            })}

                            {renderField({
                                label: "Marital Status",
                                value: personalData?.maritalStatus,
                                placeholder: "Not specified"
                            })}

                            {renderField({
                                label: "Date of Birth",
                                value: personalData?.dob ? `${personalData.dob.day} ${personalData.dob.month} ${personalData.dob.year}` : null,
                                placeholder: "Not specified"
                            })}

                            {renderField({
                                label: "Category",
                                value: personalData?.category,
                                placeholder: "Not specified"
                            })}

                            {renderField({
                                label: "Differently Abled",
                                value: personalData?.differentlyAbled,
                                placeholder: "Not specified"
                            })}

                            {renderField({
                                label: "Career Break",
                                value: personalData?.careerBreak,
                                placeholder: "Not specified"
                            })}

                            {renderField({
                                label: "Home town",
                                value: personalData?.hometown,
                                placeholder: "Not specified"
                            })}

                            {renderField({
                                label: "Address",
                                value: typeof personalData?.address === 'string'
                                    ? personalData.address
                                    : personalData?.address
                                        ? `${personalData.address.street || ''}, ${personalData.address.city || ''}, ${personalData.address.state || ''} ${personalData.address.pincode ? `- ${personalData.address.pincode}` : ''}`.trim()
                                        : null,
                                placeholder: "Not specified"
                            })}

                            {renderField({
                                label: "Pincode",
                                value: personalData?.pincode,
                                placeholder: "Not specified"
                            })}

                            {renderField({
                                label: "Languages",
                                value: personalData?.languages ? personalData.languages.map(l => l.language) : null,
                                placeholder: "Not specified"
                            })}
                        </div>
                        {showPersonalProfile && (
                            <PersonalDetailsForm
                                onClose={() => setShowPesonalProfile(false)}
                                onSave={setPersonalData}
                            />
                        )}
                    </div>
                </div>
            </div>
            <FooterNew />
        </>
    );
};

export default ProfileCard;
