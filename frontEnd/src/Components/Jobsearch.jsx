import React, { useState } from 'react';
import './Jobsearch.css';
import { useNavigate } from 'react-router-dom';

const JobSearch = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        skills: '',
        location: '',
        experience: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSearch = () => {
        console.log("Search Parameters:");
        console.log("Skills:", formData.skills);
        console.log("Location:", formData.location);
        console.log("Experience:", formData.experience);
        navigate('/carrier' , {
           state : {
               skills : formData.skills,
               location : formData.location,
               experience : formData.experience
           } 
        })
    };

    return (
        <div>
            <div className="search-job-header">
                <h1>Find your dream job now</h1>
                <h5>5 lakh+ jobs for you to explore</h5>
            </div>

            <div className="search d-flex align-items-center justify-content-center mx-auto mt-4 shadow p-1 bg-white rounded-pill"
                style={{ maxWidth: '900px' }}>

                <i className="fas fa-search text-secondary ms-3"></i>

                <input
                    className="mx-1 flex-grow-1 custom-input"
                    type="text"
                    placeholder="Enter skills / designation / Companies"
                    name="skills"
                    value={formData.skills}
                    onChange={handleInputChange}
                    aria-label="Search by skills"
                />

                <div className="vr mx-2"></div>

                <select
                    className="border-0 mx-2 text-secondary"
                    style={{ width: '180px' }}
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    aria-label="Select experience"
                >
                    <option value="">Select experience</option>
                    <option value="Fresher">Fresher</option>
                    <option value="1 year">1 year</option>
                    <option value="2 years">2 years</option>
                    <option value="3+ years">3+ years</option>
                </select>

                <div className="vr mx-2"></div>

                <input
                    className="mx-1 custom-input"
                    type="text"
                    placeholder="Enter Location"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    aria-label="Search by location"
                />

                <button
                    className="btn btn-primary rounded-pill px-3"
                    onClick={handleSearch}
                >
                    Search
                </button>
            </div>
        </div>
    );
};

export default JobSearch;
