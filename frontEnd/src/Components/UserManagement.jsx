import { useEffect, useState } from "react";
import { FaSearch, FaBan, FaCheckCircle } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import './EmployerManagement.css';
import axios from 'axios'

const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState("")

  const [users, setUsers] = useState([]);


  const filteredUsers = users.filter(
    (user) =>
      user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const token = localStorage.getItem('token')
  console.log("this is token inside user management", token)
  // Suspend a user
  const handleSuspendUser = async (userId) => {
    try {
      const response = await axios.patch(`http://localhost:3000/${userId}/suspend`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }

      );
      if (response.status === 200) {
        setUsers((prev) =>
          prev.map((user) =>
            user.id === userId ? { ...user, status: "suspended" } : user
          )
        );
        alert("The user has been suspended successfully.");
      }
    } catch (error) {
      console.error("Failed to suspend user:", error);
      alert("Something went wrong while suspending the user.");
    }
  };

  const handleActivateUser = async (userId) => {
    try {
      const response = await axios.patch(`http://localhost:3000/${userId}/activate`, 
      {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      
    );
    if (response.status === 200) {
      setUsers((prev) =>
        prev.map((user) =>
          user.id === userId ? { ...user, status: "active" } : user
        )
      );
      alert("The user has been activated successfully.");
    }
  } catch (error) {
    console.error("Failed to activate user:", error);
    alert("Something went wrong while activating the user.");
  }
};




useEffect(() => {
  const fetchuserdata = async () => {
    try {
      const response = await axios.get("http://localhost:3000/get-user");
      setUsers(response.data);
      console.log(response.data)
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  fetchuserdata();
}, []);


return (
  <div className="card">
    <div className="card-header d-flex justify-content-start align-items-start flex-column">
      <h5 className="mb-3 mt-3">User Management</h5>
      <div className="mb-3" style={{ width: "320px" }}>
        <input
          type="text"
          className="form-control search-bar"
          placeholder="Search users by name or email..."
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
              <th>Name</th>
              <th>Email</th>
              <th>Join Date</th>
              <th>Jobs Applied</th>
              <th>Profile Complete</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user?.id}>
                <td>{user?.fullName}</td>
                <td>{user?.email}</td>
                <td>{new Date(user?.joinDate).toLocaleDateString()}</td>
                <td>{user?.jobsApplied}</td>
                <td>{user?.profileComplete}%</td>
                <td>
                  <span
                    className={`badge ${user.status === "active" ? "bg-success" : "bg-danger"
                      }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td>
                  {user.status === "active" ? (
                    <button
                      className="btn btn-outline-danger btn-sm me-2"
                      onClick={() => handleSuspendUser(user.id)}
                    >
                      <FaBan className="me-1" /> Suspend
                    </button>
                  ) : (
                    <button
                      className="btn btn-outline-success btn-sm"
                      onClick={() => handleActivateUser(user.id)}
                    >
                      <FaCheckCircle className="me-1" /> Activate
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredUsers.length === 0 && (
          <div className="text-center text-muted py-4">No users found</div>
        )}
      </div>
    </div>
  </div>
);
};

export default UserManagement;
