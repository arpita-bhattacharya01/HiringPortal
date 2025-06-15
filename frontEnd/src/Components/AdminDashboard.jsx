import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";
import AdminStats from "./AdminStats";
import UserManagement from "./UserManagement";
import EmployerManagement from "./EmployerManagement";
import JobApproval from "./JobApproval";
import { Shield } from "lucide-react";

const AdminDashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login", { replace: true }); // Redirect if not logged in
    }
  }, [navigate]);

  return (
    <div className="bg-light d-flex justify-content-center" style={{ width: "100%" }}>
      <AdminNavbar />
      <div className="container py-5 position-absolute" style={{ top: "12%", width: "100%" }}>
        {/* Header Section */}
        <div className="d-flex align-items-center gap-3 mb-4">
          <Shield size={32} className="text-primary me-2" />
          <div>
            <h1 className="h3 fw-bold text-dark">Admin Dashboard</h1>
            <p className="text-muted mb-0">Manage users, employers, and job postings</p>
          </div>
        </div>

        {/* Admin Stats */}
        <AdminStats />

        {/* Card with Tabs */}
        <div className="card mt-4">
          <div className="card-header">
            <h5 className="card-title mb-1">Management Portal</h5>
            <p className="card-subtitle text-muted">Manage all aspects of the job portal platform</p>
          </div>
          <div className="card-body">
            {/* Bootstrap Nav Tabs */}
            <ul className="nav nav-tabs mb-3" id="adminTabs" role="tablist">
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link active"
                  id="jobs-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#jobs"
                  type="button"
                  role="tab"
                  aria-controls="jobs"
                  aria-selected="true"
                >
                  Job Approvals
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  id="users-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#users"
                  type="button"
                  role="tab"
                  aria-controls="users"
                  aria-selected="false"
                >
                  Users
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  id="employers-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#employers"
                  type="button"
                  role="tab"
                  aria-controls="employers"
                  aria-selected="false"
                >
                  Employers
                </button>
              </li>
            </ul>

            {/* Tab Content */}
            <div className="tab-content" id="adminTabsContent">
              <div
                className="tab-pane fade show active"
                id="jobs"
                role="tabpanel"
                aria-labelledby="jobs-tab"
              >
                <JobApproval />
              </div>
              <div
                className="tab-pane fade"
                id="users"
                role="tabpanel"
                aria-labelledby="users-tab"
              >
                <UserManagement />
              </div>
              <div
                className="tab-pane fade"
                id="employers"
                role="tabpanel"
                aria-labelledby="employers-tab"
              >
                <EmployerManagement />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
