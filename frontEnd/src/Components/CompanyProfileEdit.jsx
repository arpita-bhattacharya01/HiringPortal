import React, { useState, useEffect } from "react";
import EmpLoginFooter from "./EmpLoginFooter";
import EmpLoginNavbar from "./EmpLoginNavbar";
import { useLocation } from "react-router-dom";
import axios from 'axios'

const CompanyProfileEdit = () => {
  const location = useLocation();
  const { userdata } = location.state || {};

  const [isEditingAccount, setIsEditingAccount] = useState(false);
  const [isEditingCompany, setIsEditingCompany] = useState(false);
  const [localUserdata, setLocalUserdata] = useState(null);

  const [isEditingLinks, setIsEditingLinks] = useState(false);
  const [companyLinks, setCompanyLinks] = useState({
    website: localUserdata?.website || '',
    linkedin: localUserdata?.linkedin || '',
    twitter: localUserdata?.twitter || '',
    facebook: localUserdata?.facebook || '',
    others: localUserdata?.others || '',
  });

  const handleLinksChange = (e) => {
    const { name, value } = e.target;
    setCompanyLinks((prev) => ({ ...prev, [name]: value }));
  };

  const handleLinksSave = async () => {
    console.log("Inside handleLinkSave")
    const token = localStorage.getItem("token")

    const response = await axios.post('http://localhost:3000/update-link',
      {
        ...companyLinks
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    if (response.status === 200) {
      alert("Link updated successfully")
      setIsEditingLinks(false);
      window.location.reload();
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    if (token && user) {
      try {
        const parsedUser = JSON.parse(user);
        console.log("[CompanyProfileEdit] Parsed user from localStorage:", parsedUser);
        setLocalUserdata(parsedUser);
      } catch (error) {
        console.error("[CompanyProfileEdit] Error parsing user:", error);
      }
    }
  }, []);

  const [formData, setFormData] = useState({
    username: localUserdata?.fullName || "",
    email: localUserdata?.loginEmail || "",
    role: localUserdata?.designation || "",
    reportingManager: localUserdata?.reportingmanager || "",
    mobile: localUserdata?.mobile || "",
  });

  const [companyData, setCompanyData] = useState({
    companyType: localUserdata?.companyType || "",
    industryType: localUserdata?.industryType || "",
    contactPerson: localUserdata?.contactPerson || localUserdata?.fullName || "",
    alias: localUserdata?.alias || "",
    designation: localUserdata?.designation || "",
    website: localUserdata?.website || "",
    classifieds: localUserdata?.classifieds || "",
    phone1: localUserdata?.phone1 || "",
    phone2: localUserdata?.phone2 || "",
    fax: localUserdata?.fax || "",
    tan: localUserdata?.tan || "",
    discription : localUserdata?.discription || "",
    noOfEmployes : localUserdata?.noOfEmployes || "",
    aboutus : localUserdata?.aboutus || "",
  });

  // First useEffect: fetch and store user data
useEffect(() => {
  const fetchUserData = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(`http://localhost:3000/fetch-employer`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        const updatedUser = response.data;
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setLocalUserdata(updatedUser);
      }
    } catch (error) {
      console.error("Error fetching employer data:", error);
    }
  };
  fetchUserData();
}, []);

// Second useEffect: set form fields after localUserdata is updated
useEffect(() => {
  if (!localUserdata) return;

  setFormData({
    username: localUserdata.fullName || "",
    email: localUserdata.loginEmail || "",
    role: localUserdata.designation || "",
    reportingManager: localUserdata.reportingmanager || "",
    mobile: localUserdata.mobile || "",
  });

  setCompanyData({
    companyType: localUserdata.companyType || "",
    industryType: localUserdata.industryType || "",
    contactPerson: localUserdata.contactPerson || localUserdata.fullName || "",
    alias: localUserdata.alias || "",
    designation: localUserdata.designation || "",
    website: localUserdata.website || "",
    classifieds: localUserdata.classifieds || "",
    phone1: localUserdata.phone1 || "",
    phone2: localUserdata.phone2 || "",
    fax: localUserdata.fax || "",
    tan: localUserdata.tan || "",
    discription : localUserdata.discription || "",
    noOfEmployes : localUserdata.noOfEmployes || "",
    aboutus : localUserdata.aboutus || ""
  });

  setCompanyLinks({
    website: localUserdata.website || "",
    linkedin: localUserdata.linkedin || "",
    twitter: localUserdata.twitter || "",
    facebook: localUserdata.facebook || "",
    others: localUserdata.others || "",
  });
}, [localUserdata]);


  const handleAccountChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCompanyChange = (e) => {
    const { name, value } = e.target;
    setCompanyData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAccountSave = async () => {
    console.log("inside handleAccountSave")

    const token = localStorage.getItem("token")
    console.log(token)
    console.log("This is from data", formData)
    try {
      const response = await axios.post("http://localhost:3000/update-account",
        {
          ...formData,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      if (response.status === 200) {
        alert("Data updated successfully")
        setIsEditingAccount(false);
        window.location.reload();
      }
      console.log(response)
    } catch (error) {
      console.error("An error accured while updatiing", error)
    }
  };

  const handleCompanySave = async () => {
    console.log("handle Company save clicked")
    const token = localStorage.getItem("token")
    console.log(token)
    try {
      const response = await axios.post('http://localhost:3000/company-deatils',
        {
          ...companyData
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      if (response.status === 200) {
        alert("Company Data Updated Successfully")
        setIsEditingCompany(false);
        window.location.reload();
      }
    } catch (error) {
      console.error("An error accured while updating")
    }
  };

  return (
    <>
      <EmpLoginNavbar />
      <div className="container my-5">
        <h3 className="fw-bold mb-1">Company Profile</h3>
        <h5 className="text-secondary mb-3">mcs</h5>
        <p className="text-danger small">* Mandatory Fields</p>

        {/* Account Details */}
        <div className="card shadow-sm mb-4">
          <div className="card-header d-flex justify-content-between align-items-center bg-primary-subtle">
            <h5 className="mb-0">Account Details</h5>
            {!isEditingAccount && (
              <button
                className="btn btn-sm btn-outline-primary"
                onClick={() => setIsEditingAccount(true)}
              >
                Edit
              </button>
            )}
          </div>
          <div className="card-body">
            {isEditingAccount ? (
              <>
                <div className="mb-3">
                  <strong>Username:</strong> {localUserdata?.fullName || "N/A"}
                </div>
                <div className="mb-3">
                  <strong>Email:</strong> {localUserdata?.loginEmail || "N/A"}
                </div>
                <div className="mb-3">
                  <label className="form-label">
                    <strong>Role:</strong>
                  </label>
                  <select
                    name="role"
                    className="form-select"
                    value={formData.role}
                    onChange={handleAccountChange}
                  >
                    <option value="Recruiter">Recruiter</option>
                    <option value="Manager">Manager</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">
                    <strong>Reporting Manager:</strong>
                  </label>
                  <input
                    type="text"
                    name="reportingManager"
                    className="form-control"
                    value={formData.reportingManager}
                    onChange={handleAccountChange}
                    placeholder="Enter reporting manager"
                  />
                </div>
                <div className="mb-4">
                  <label className="form-label">
                    <strong>Mobile Number:</strong>
                  </label>
                  <div className="input-group">
                    <input
                      type="tel"
                      name="mobile"
                      className="form-control w-100"
                      value={formData.mobile}
                      onChange={handleAccountChange}
                      placeholder="Enter 10-digit mobile number"
                      maxLength={10}
                    />
                  </div>
                </div>
                <div className="d-flex gap-2">
                  <button className="btn btn-success" onClick={handleAccountSave}>
                    Save
                  </button>
                  <button
                    className="btn btn-secondary"
                    onClick={() => setIsEditingAccount(false)}
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <p>
                  <strong>Username:</strong> {localUserdata?.fullName || "N/A"}
                </p>
                <p>
                  <strong>Email:</strong> {localUserdata?.loginEmail || "N/A"}
                </p>
                <p>
                  <strong>Role:</strong> {localUserdata?.designation || "N/A"}
                </p>
                <p>
                  <strong>Reporting Manager:</strong> {localUserdata?.reportingmanager || "N/A"}
                </p>
                <p>
                  <strong>Mobile Number:</strong> {localUserdata?.mobile || "N/A"}
                </p>
              </>
            )}
          </div>
        </div>

        {/* Company Details */}
        <div className="card shadow-sm">
          <div className="card-header d-flex justify-content-between align-items-center bg-primary-subtle">
            <h5 className="mb-0">Company Details</h5>
            {!isEditingCompany && (
              <button
                className="btn btn-sm btn-outline-primary"
                onClick={() => setIsEditingCompany(true)}
              >
                Edit
              </button>
            )}
          </div>
          <div className="card-body">
            {isEditingCompany ? (
              <>
                <label className="form-label">*Company Type:</label>
                <select
                  name="companyType"
                  value={companyData.companyType}
                  className="form-select mb-3"
                  onChange={handleCompanyChange}
                >
                  <option>Corporate</option>
                  <option>Foreign MNC</option>
                  <option>Indian MNC</option>
                  <option>Startup</option>
                  <option>Public Sector</option>
                  <option>Government</option>
                  <option>Non-Profit / NGO</option>
                  <option>Educational Institution</option>
                  <option>Freelance / Individual</option>
                  <option>Joint Venture</option>
                  <option>Other</option>
                </select>
                <label className="form-label">*Industry Type:</label>
                <select
                  name="industryType"
                  value={companyData.industryType}
                  className="form-select mb-3"
                  onChange={handleCompanyChange}
                >
                  <option>IT Services & Consulting</option>
                  <option>BPM / BPO</option>
                  <option>Banking</option>
                  <option>Medical Services</option>
                  <option>Engineering & Construction</option>
                  <option>Education & Training</option>
                  <option>Finance & Insurance</option>
                  <option>Advertising & Media</option>
                  <option>Automobile & Auto Ancillaries</option>
                  <option>Retail</option>
                  <option>Telecom</option>
                  <option>Hospitality</option>
                  <option>Travel & Tourism</option>
                  <option>Real Estate</option>
                  <option>Legal</option>
                  <option>E-commerce</option>
                  <option>Government & Defence</option>
                  <option>Pharmaceuticals</option>
                  <option>Oil & Gas</option>
                  <option>Agriculture & Forestry</option>
                  <option>Other</option>
                </select>
                <label className="form-label">*Contact Person:</label>
                <input
                  name="contactPerson"
                  value={companyData.contactPerson}
                  onChange={handleCompanyChange}
                  className="form-control mb-3"
                />
                <label className="form-label">Alias:</label>
                <input
                  name="alias"
                  value={companyData.alias}
                  onChange={handleCompanyChange}
                  className="form-control mb-3"
                />
                <label className="form-label">Designation:</label>
                <input
                  name="designation"
                  value={companyData.designation}
                  onChange={handleCompanyChange}
                  className="form-control mb-3"
                />
                <label className="form-label">Website:</label>
                <input
                  name="website"
                  value={companyData.website}
                  onChange={handleCompanyChange}
                  className="form-control mb-3"
                />
                <label className="form-label">Classifieds:</label>
                <input
                  name="classifieds"
                  value={companyData.classifieds}
                  onChange={handleCompanyChange}
                  className="form-control mb-3"
                />
                <label className="form-label">*Phone Number 1:</label>
                <input
                  name="phone1"
                  value={companyData.phone1}
                  onChange={handleCompanyChange}
                  className="form-control mb-3"
                />
                <label className="form-label">Phone Number 2:</label>
                <input
                  name="phone2"
                  value={companyData.phone2}
                  onChange={handleCompanyChange}
                  className="form-control mb-3"
                />
                <label className="form-label">Fax Number:</label>
                <input
                  name="fax"
                  value={companyData.fax}
                  onChange={handleCompanyChange}
                  className="form-control mb-3"
                />
                <label className="form-label">TAN Number:</label>
                <input
                  name="tan"
                  value={companyData.tan}
                  onChange={handleCompanyChange}
                  className="form-control mb-4"
                />
                <label className="form-label">No of Employes:</label>
                <input
                  name="noOfEmployes"
                  value={companyData.noOfEmployes}
                  onChange={handleCompanyChange}
                  className="form-control mb-4"
                />
                <label className="form-label">Discription:</label>
                <input
                  name="discription"
                  value={companyData.discription}
                  onChange={handleCompanyChange}
                  className="form-control mb-4"
                />
                <label className="form-label">About us:</label>
                <input
                  name="aboutus"
                  value={companyData.aboutus}
                  onChange={handleCompanyChange}
                  className="form-control mb-4"
                />
                <div className="d-flex gap-2">
                  <button className="btn btn-success" onClick={handleCompanySave}>
                    Save
                  </button>
                  <button
                    className="btn btn-secondary"
                    onClick={() => setIsEditingCompany(false)}
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              localUserdata ? (
                Object.entries({
                  CompanyType: localUserdata.companyType,
                  IndustryType: localUserdata.industryType,
                  ContactPerson: localUserdata.contactPerson,
                  Alias: localUserdata.alias,
                  Designation: localUserdata.designation,
                  Website: localUserdata.website,
                  Classifieds: localUserdata.classifieds,
                  Phone1: localUserdata.phone1,
                  Phone2: localUserdata.phone2,
                  Fax: localUserdata.fax,
                  Tan: localUserdata.tan,
                  Discription : localUserdata.discription,
                  NoOfEmployes : localUserdata.noOfEmployes,
                  AboutUs : localUserdata.aboutus,
                }).map(([key, value]) => (
                  <p key={key}>
                    <strong>{key.replace(/([A-Z])/g, " $1")}:</strong> {value}
                  </p>
                ))
              ) : (
                <p>No company data available in localStorage.</p>
              )
            )}
          </div>
        </div>

        {/* Company Links */}
        <div className="card shadow-sm mt-4">
          <div className="card-header d-flex justify-content-between align-items-center bg-primary-subtle">
            <h5 className="mb-0">Company Links</h5>
            {!isEditingLinks && (
              <button className="btn btn-sm btn-outline-primary" onClick={() => setIsEditingLinks(true)}>Edit</button>
            )}
          </div>
          <div className="card-body">
            {isEditingLinks ? (
              <>
                <label className="form-label">Website:</label>
                <input name="website" value={companyLinks.website} onChange={handleLinksChange} className="form-control mb-3" />

                <label className="form-label">LinkedIn:</label>
                <input name="linkedin" value={companyLinks.linkedin} onChange={handleLinksChange} className="form-control mb-3" />

                <label className="form-label">Twitter:</label>
                <input name="twitter" value={companyLinks.twitter} onChange={handleLinksChange} className="form-control mb-3" />

                <label className="form-label">Facebook:</label>
                <input name="facebook" value={companyLinks.facebook} onChange={handleLinksChange} className="form-control mb-3" />

                <label className="form-label">Others:</label>
                <input name="others" value={companyLinks.others} onChange={handleLinksChange} className="form-control mb-4" />

                <div className="d-flex gap-2">
                  <button className="btn btn-success" onClick={handleLinksSave}>Save</button>
                  <button className="btn btn-secondary" onClick={() => setIsEditingLinks(false)}>Cancel</button>
                </div>
              </>
            ) : (
              <>
                <p><strong>Website:</strong> {localUserdata?.website || 'NA'}</p>
                <p><strong>LinkedIn:</strong> {localUserdata?.linkedin || 'NA'}</p>
                <p><strong>Twitter:</strong> {localUserdata?.twitter || 'NA'}</p>
                <p><strong>Facebook:</strong> {localUserdata?.facebook || 'NA'}</p>
                <p><strong>Others:</strong> {localUserdata?.others || 'NA'}</p>
              </>
            )}
          </div>
        </div>
      </div>
      <EmpLoginFooter />
    </>
  );
};

export default CompanyProfileEdit;