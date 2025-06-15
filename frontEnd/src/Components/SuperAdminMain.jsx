import { useState } from "react";
import SuperAdminSidebar from "./SuperAdminSidebar"; // ensure Sidebar uses Bootstrap classes
import SuperDashboardOverview from "./SuperDashboardOverview";
import AdminNavbar from "./AdminNavbar";
import JobApproval from "./JobApproval";
import ActivityMonitor from "./ActivityMonitor";
import UserManagement from "./UserManagement";
import EmployerManagement from "./EmployerManagement";
import CreateAdmin from "./CreateAdmin";
// import AdminManagement from "./AdminManagement";
// import ActivityMonitor from "./ActivityMonitor";
// import PendingApprovals from "./PendingApprovals";
// import Analytics from "./Analytics";
// import "./AdminDashboard.css"; // optional: your custom CSS

const SuperAdminMain = () => {
const [activeSection, setActiveSection] = useState();

  const renderContent = () => {
  switch (activeSection) {
    case "overview":
      return <SuperDashboardOverview />;
    case "admins":
      // return <AdminManagement />;
    case "activity":
      return <ActivityMonitor />;
    case "approvals":
      return <JobApproval />;
    case "usermanagement":
      return <UserManagement/>;
    case "employermanagement":
      return <EmployerManagement/>
    case "createadmin":
      return <CreateAdmin/>
    default:
      return <SuperDashboardOverview />;
  }
};


  return (

    <>
     <AdminNavbar />
    <div className="d-flex" style={{ minHeight: "100vh", backgroundColor: "#f8f9fa" }}>
      <SuperAdminSidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      <main className="flex-grow-1 ms-0 ms-md-5 p-4">
        <div className="container-fluid">
          {renderContent()}
        </div>
      </main>
    </div>

      </>
  );
};

export default SuperAdminMain;
