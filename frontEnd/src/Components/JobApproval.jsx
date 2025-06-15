import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button as BootstrapButton } from 'react-bootstrap';
import axios from 'axios'

const JobApproval = () => {
  const [pendingJobs, setPendingJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('http://localhost:3000/pending')
        setPendingJobs(response.data)
      } catch (error) {
        console.error("Failed to fetch job", error)
      }
    }
    fetchJobs();

  }, [])

  const [selectedJob, setSelectedJob] = useState(null);
  const token = localStorage.getItem("token");

  const handleApprove = async (jobId) => {
    try {
      const response = await axios.patch(`http://localhost:3000/${jobId}/approve`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      if (response.status == 200) {
        setPendingJobs(prev => prev.filter(job => job.id !== jobId));
        alert("Job Approved: The job posting has been approved and is now live.");
      }
    } catch (error) {
      console.error("Failed to approved job", error)
      alert("Something went wrong while approving the job.")
    }
  };

  const handleReject = async (jobId) => {
    try {
      const response = await axios.patch(`http://localhost:3000/${jobId}/reject`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      if (response.status == 200) {
        setPendingJobs(prev => prev.filter(job => job.id !== jobId));
        alert("Job Rejected: The job posting has been rejected.");
      }
    } catch (error) {
      console.error("Failed to reject job", error)
      alert("Something went wrong while rejecting job")
    }

  };

  return (
    <div className="card mt-4">
      <div className="card-header">
        <h5 className="mb-0">Pending Job Approvals</h5>
      </div>
      <div className="card-body">
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead className="table-light">
              <tr>
                <th>Job Title</th>
                <th>Company</th>
                <th>Location</th>
                <th>Salary</th>
                <th>Posted Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {pendingJobs.map((job) => (
                <tr key={job.id}>
                  <td>{job.jobTitle}</td>
                  <td>{job.employer?.companyname}</td>
                  <td>{job.location}</td>
                  <td>{job.salary}</td>
                  <td>{job.posted}</td>
                  <td><span className="badge bg-warning text-dark">{job.status}</span></td>
                  <td>
                    <div className="d-flex gap-2">
                      <button
                        className="btn btn-outline-primary btn-sm"
                        onClick={() => setSelectedJob(job)}
                      >
                        View
                      </button>
                      <button
                        className="btn btn-outline-success btn-sm"
                        onClick={() => handleApprove(job.id)}
                      >
                        Approve
                      </button>
                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => handleReject(job.id)}
                      >
                        Reject
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {pendingJobs.length === 0 && (
          <div className="text-center py-4 text-muted">
            No pending job approvals
          </div>
        )}
      </div>

      <Modal show={!!selectedJob} onHide={() => setSelectedJob(null)}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedJob?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p><strong>Company:</strong> {selectedJob?.employer?.companyname}</p>
          <p><strong>Location:</strong> {selectedJob?.location}</p>
          <p><strong>Salary:</strong> {selectedJob?.salary}</p>
          <p><strong>Description:</strong></p>
          <p>{selectedJob?.jobDiscription}</p>
        </Modal.Body>
        <Modal.Footer>
          <BootstrapButton variant="secondary" onClick={() => setSelectedJob(null)}>
            Close
          </BootstrapButton>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default JobApproval;
