import { useState, useEffect } from "react";
import { Eye, Download, MessageSquare, Calendar, Search, Filter, Axis3DIcon } from "lucide-react";
import axios from 'axios'
const ApplicationManager = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [application, setapplication] = useState([])

  const token = localStorage.getItem("token")
  useEffect(() => {
    const getApplicationData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/get-application-data', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (response.data) {
          setapplication(response.data);
        }
      } catch (error) {
        console.error("Some Error Occurred", error);
      }
    };

    getApplicationData();
  }, [token]);

  console.log("This is application from application state", application)
  const getStatusClass = (status) => {
    const classes = {
      "New": "badge text-bg-primary",
      "Under Review": "badge text-bg-warning",
      "Shortlisted": "badge text-bg-success",
      "Interview Scheduled": "badge text-bg-info",
      "Rejected": "badge text-bg-danger",
      "Hired": "badge text-bg-success"
    };
    return classes[status] || "badge text-bg-secondary";
  };

  const updateApplicationStatus = (id, newStatus) => {
    console.log(`Updating application ${id} to status: ${newStatus}`);
  };

  const filteredApplications = application.filter(app => {
    const matchesSearch =
      (app.user?.fullName?.toLowerCase()?.includes(searchTerm.toLowerCase()) || false) ||
      (app.jobs?.jobTitle?.toLowerCase()?.includes(searchTerm.toLowerCase()) || false);
    const matchesStatus = statusFilter === "All" || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });
  console.log("This is filter appplication", filteredApplications)

  return (
    <div className="container py-4">
      <div className="card mb-4">
        <div className="card-header">Application Management</div>
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-8 position-relative">
              <span className="position-absolute top-50 translate-middle-y ps-2"><Search size={16} /></span>
              <input
                type="text"
                className="form-control ps-5"
                placeholder="Search by candidate name or job title..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="col-md-4 d-flex align-items-center gap-2">
              <select
                className="form-select"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="All">All Status</option>
                <option value="New">New</option>
                <option value="Under Review">Under Review</option>
                <option value="Shortlisted">Shortlisted</option>
                <option value="Interview Scheduled">Interview Scheduled</option>
                <option value="Rejected">Rejected</option>
                <option value="Hired">Hired</option>
              </select>
              <button className="btn btn-outline-secondary d-flex align-items-center">
                <Filter size={16} className="me-2" />More Filters
              </button>
            </div>
          </div>
        </div>
      </div>

      {filteredApplications.map(application => (
        <div className="card mb-3 shadow-sm" key={application.id}>
          <div className="card-body">
            <div className="d-flex justify-content-between mb-3">
              <div>
                <h5 className="mb-1">{application.firstName} {application.lastName}</h5>
                <span className={getStatusClass(application.status)}>{application.status}</span>
                <p className="text-muted mt-2 mb-1">Applied for: {application.jobs.jobTitle}</p>
                <p className="text-muted mb-2">
                  📧 {application.email} | 📱 {application.phone} | 📅 {new Date(application.appliedAt).toLocaleDateString()} | 💼 {application.experience}
                </p>
                <div className="d-flex flex-wrap gap-2">
                  {application.skills &&
                    application.skills
                      .split(',')
                      .map((skill, index) => (
                        <span key={index} className="badge text-bg-light border">
                          {skill.trim()}
                        </span>
                      ))}
                </div>
              </div>
              <div className="d-flex flex-column gap-2 ms-3">
                <button className="btn btn-outline-secondary btn-sm"><Eye size={16} className="me-1" /> View Profile</button>
                <button className="btn btn-outline-secondary btn-sm"><Download size={16} className="me-1" /> Resume</button>
                <button className="btn btn-outline-secondary btn-sm"><MessageSquare size={16} className="me-1" /> Message</button>
                <button className="btn btn-outline-secondary btn-sm"><Calendar size={16} className="me-1" /> Schedule</button>
              </div>
            </div>

            <div className="d-flex gap-2 border-top pt-3">
              <button
                className="btn btn-outline-success btn-sm"
                onClick={() => updateApplicationStatus(application.id, "Shortlisted")}
              >
                Shortlist
              </button>
              <button
                className="btn btn-outline-primary btn-sm"
                onClick={() => updateApplicationStatus(application.id, "Interview Scheduled")}
              >
                Schedule Interview
              </button>
              <button
                className="btn btn-outline-danger btn-sm"
                onClick={() => updateApplicationStatus(application.id, "Rejected")}
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ApplicationManager;
