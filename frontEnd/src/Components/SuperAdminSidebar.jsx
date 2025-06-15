import React from "react";
import {
  LayoutDashboard,
  Users,
  Activity,
  CheckSquare,
  BarChart3,
  Shield,
  UserCog,
  Briefcase,
  UserPlus
} from "lucide-react";
import "./SuperAdminSidebar.css"; 

const menuItems = [
  { id: "overview", label: "Dashboard", icon: LayoutDashboard },
  // { id: "admins", label: "Admin Management", icon: Users },
  { id: "activity", label: "Activity Monitor", icon: Activity },
  { id: "approvals", label: "Pending Approvals", icon: CheckSquare },
  { id: "usermanagement", label: "User Management", icon: UserCog },
  { id: "employermanagement", label: "Employer Management", icon: Briefcase },
  { id: "createadmin", label: "Create Admin", icon: UserPlus },

];

const SuperAdminSidebar = ({ activeSection, onSectionChange }) => {
  return (
    <div className="sidebar-admin bg-white border-end shadow-sm">
      <div className="sidebar-header-admin d-flex align-items-center p-3 border-bottom">
        <Shield size={32} className="me-2 text-primary" />
        <div>
          <h5 className="mb-0 fw-bold">Super Admin</h5>
          <small className="text-muted">Job Portal Control</small>
        </div>
      </div>

      <nav className="nav flex-column p-3">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              className={`btn text-start w-100 mb-2 d-flex align-items-center gap-2 ${
                activeSection === item.id
                  ? "btn-primary text-white shadow-sm"
                  : "btn-outline-secondary"
              }`}
              onClick={() => onSectionChange(item.id)}
            >
              <Icon size={18} className="me-2" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};
export default SuperAdminSidebar;
