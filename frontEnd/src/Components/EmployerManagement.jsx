import { useState, useEffect } from "react";
import { FaSearch, FaBan, FaCheckCircle, FaEye } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal } from 'bootstrap';
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./EmployerManagement.css";
import axios from 'axios';

const EmployerManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEmployer, setSelectedEmployer] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [employers, setEmployers] = useState([]);

  const getStatusBadge = (status) => {
    const statusLower = (status || "").toLowerCase();
    switch (statusLower) {
      case "verified":
        return <span className="badge bg-success">Verified</span>;
      case "pending":
        return <span className="badge bg-warning text-dark">Pending</span>;
      case "suspended":
        return <span className="badge bg-danger">Suspended</span>;
      default:
        return <span className="badge bg-secondary">{status}</span>;
    }
  };

  const filteredEmployers = employers.filter((employer) => {
    const nameMatch = (employer.companyName || employer.fullName || "").toLowerCase().includes(searchTerm.toLowerCase());
    const emailMatch = (employer.contactEmail || employer.loginEmail || "").toLowerCase().includes(searchTerm.toLowerCase());
    return nameMatch || emailMatch;
  });

  const token = localStorage.getItem('token')

  const handleVerifyEmployer = async (employerId) => {
    try {
      const response = await axios.patch(`http://localhost:3000/${employerId}/verify`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }

      );
      if (response.status === 200) {
        setEmployers(prev =>
          prev.map(employer =>
            employer.id === employerId ? { ...employer, status: "verified" } : employer
          )
        );
        alert("Employer verified successfully");
      }
    } catch (error) {
      console.error("Failed to verify employer", error);
      alert("Failed to verify employer");
    }
  };
  const handleSuspendEmployer = async (employerId) => {
    try {
      const response = await axios.patch(`http://localhost:3000/${employerId}/suspended`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      if (response.status === 200) {
        setEmployers(prev =>
          prev.map(employer =>
            employer.id === employerId ? { ...employer, status: "suspended" } : employer
          )
        );
        alert("Employer suspended successfully");
      }
    } catch (error) {
      console.error("Failed to suspend employer", error);
      alert("Failed to suspend employer");
    }
  };

  const handleView = (employer) => {
    setSelectedEmployer(employer);
    setShowModal(true);
  };

  useEffect(() => {
    const fetchEmployerData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/get-employers");
        setEmployers(response.data);
      } catch (error) {
        console.error("Error fetching employers:", error);
      }
    };

    fetchEmployerData();
  }, []);

  return (
    <div className="card">
      <div className="card-header d-flex justify-content-start align-items-start flex-column">
        <h5 className="mb-3 mt-3">Employer Management</h5>
        <div className="mb-3" style={{ width: "320px" }}>
          <input
            type="text"
            className="form-control search-bar"
            placeholder="Search employers by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <div className="card-body">
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead className="table-light">
              <tr>
                <th>Company Name</th>
                <th>Contact Email</th>
                <th>Join Date</th>
                <th>Jobs Posted</th>
                <th>Active Jobs</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployers.map((employer) => (
                <tr key={employer.id}>
                  <td>{employer.companyName || employer.fullName}</td>
                  <td>{employer.contactEmail || employer.loginEmail}</td>
                  <td>{new Date(employer.joinDate).toLocaleDateString()}</td>
                  <td>{employer.jobsPosted}</td>
                  <td>{employer.activeJobs}</td>
                  <td>{getStatusBadge(employer.status)}</td>
                  <td>
                    <div className="d-flex gap-2">
                      {/* View button - always shown */}
                      <button
                        className="btn btn-outline-primary btn-sm"
                        onClick={() => handleView(employer)}
                      >
                        <FaEye className="me-1" /> View
                      </button>

                      {/* Show Verify + Suspend for Pending status */}
                      {employer.status?.toLowerCase() === 'pending' && (
                        <>
                          <button
                            className="btn btn-outline-success btn-sm"
                            onClick={() => handleVerifyEmployer(employer.id)}
                          >
                            <FaCheckCircle className="me-1" /> Verify
                          </button>
                          <button
                            className="btn btn-outline-danger btn-sm"
                            onClick={() => handleSuspendEmployer(employer.id)}
                          >
                            <FaBan className="me-1" /> Suspend
                          </button>
                        </>
                      )}

                      {/* Show only Suspend for Verified status */}
                      {employer.status?.toLowerCase() === 'verified' && (
                        <button
                          className="btn btn-outline-danger btn-sm"
                          onClick={() => handleSuspendEmployer(employer.id)}
                        >
                          <FaBan className="me-1" /> Suspend
                        </button>
                      )}

                      {/* No action buttons for Suspended status */}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredEmployers.length === 0 && (
            <div className="text-center text-muted py-4">
              No employers found
            </div>
          )}
        </div>
      </div>

      {/* Employer Details Modal */}
      {showModal && (
        <div
          className="modal fade show"
          style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}
          id="employerModal"
          tabIndex="-1"
          aria-labelledby="employerModalLabel"
          aria-hidden={!showModal}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title" id="employerModalLabel">
                  {selectedEmployer?.companyName || selectedEmployer?.fullName || 'Employer Details'}
                </h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setShowModal(false)}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="row mb-3">
                  <div className="col-md-4 fw-bold">Contact Person:</div>
                  <div className="col-md-8">{selectedEmployer?.fullName || 'N/A'}</div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-4 fw-bold">Email:</div>
                  <div className="col-md-8">{selectedEmployer?.contactEmail || selectedEmployer?.loginEmail || 'N/A'}</div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-4 fw-bold">Phone:</div>
                  <div className="col-md-8">{selectedEmployer?.contactPhone || 'N/A'}</div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-4 fw-bold">Industry:</div>
                  <div className="col-md-8">{selectedEmployer?.industry || 'N/A'}</div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-4 fw-bold">Location:</div>
                  <div className="col-md-8">{selectedEmployer?.location || 'N/A'}</div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-4 fw-bold">Join Date:</div>
                  <div className="col-md-8">
                    {selectedEmployer?.joinDate ? new Date(selectedEmployer.joinDate).toLocaleDateString() : 'N/A'}
                  </div>
                </div>
                <hr />
                <h6 className="fw-bold mb-3">Company Statistics</h6>
                <div className="row mb-2">
                  <div className="col-md-6 fw-bold">Total Jobs Posted:</div>
                  <div className="col-md-6">{selectedEmployer?.jobsPosted || 0}</div>
                </div>
                <div className="row mb-2">
                  <div className="col-md-6 fw-bold">Active Jobs:</div>
                  <div className="col-md-6">{selectedEmployer?.activeJobs || 0}</div>
                </div>
                <div className="row">
                  <div className="col-md-6 fw-bold">Status:</div>
                  <div className="col-md-6">
                    {selectedEmployer?.status ? (
                      <span className={`badge ${selectedEmployer.status.toLowerCase() === 'verified' ? 'bg-success' :
                        selectedEmployer.status.toLowerCase() === 'pending' ? 'bg-warning text-dark' :
                          selectedEmployer.status.toLowerCase() === 'suspended' ? 'bg-danger' : 'bg-secondary'
                        }`}>
                        {selectedEmployer.status}
                      </span>
                    ) : 'N/A'}
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
                {/* Modal action buttons follow same visibility rules */}
                {selectedEmployer?.status?.toLowerCase() === 'pending' && (
                  <>
                    <button
                      type="button"
                      className="btn btn-success"
                      onClick={() => {
                        handleVerifyEmployer(selectedEmployer.id);
                        setShowModal(false);
                      }}
                    >
                      Verify Employer
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => {
                        handleSuspendEmployer(selectedEmployer.id);
                        setShowModal(false);
                      }}
                    >
                      Suspend Employer
                    </button>
                  </>
                )}
                {selectedEmployer?.status?.toLowerCase() === 'verified' && (
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => {
                      handleSuspendEmployer(selectedEmployer.id);
                      setShowModal(false);
                    }}
                  >
                    Suspend Employer
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployerManagement;