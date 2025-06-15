import React from 'react';
import { useState, useEffect } from 'react';
import { Card, Badge } from 'react-bootstrap';
import { Users, UserCheck, UserX, AlertTriangle } from 'lucide-react';
import './SuperDashboardOverview.css'; // We'll create this for custom styles
import AdminNavbar from './AdminNavbar';
import axios from 'axios'

const SuperDashboardOverview = () => {


  const [state, setstate] = useState({
    totalActiveUsers: 0,
    totalSuspendedUsers: 0,
    totalActiveEmployers: 0,
    totalSuspendedEmployer: 0,
    totalPendingEmployer: 0,
    activeJobs: 0,
    pendingApprovals: 0,
    totalAdmin: 0
  })

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get('http://localhost:3000/state');
        console.log(response)
        setstate(response.data)
      } catch (error) {
        console.error("Error fetching stats", error)
      }
    }
    fetchStats();
  }, [])
  const stats = [
    {
      title: "Total Admins",
      value: state.totalAdmin,
      icon: Users,
      color: "text-primary",
      bgColor: "bg-primary-light",
    },
    {
      title: "Suspended Employer",
      value: state.totalSuspendedEmployer,
      icon: UserX,
      color: "text-success",
      bgColor: "bg-success-light",
    },
    {
      title: "Pending Approval",
      value: state.pendingApprovals,
      icon: AlertTriangle,
      color: "text-warning",
      bgColor: "bg-warning-light",
    },
    {
      title: "Suspended User",
      value: state.totalSuspendedUsers,
      icon: UserX,
      color: "text-danger",
      bgColor: "bg-danger-light",
    },
    {
      title: "Total Active User",
      value: state.totalActiveUsers,
      icon: UserCheck,
      color: "text-danger",
      bgColor: "bg-danger-light",
    },
    {
      title: "Total Active Employer",
      value: state.totalActiveEmployers,
      icon: UserCheck,
      color: "text-danger",
      bgColor: "bg-danger-light",
    },
    {
      title: "Total Pending Employer",
      value: state.totalPendingEmployer,
      icon: UserX,
      color: "text-danger",
      bgColor: "bg-danger-light",
    },
  ];
 const [recentActivities, setrecentActivities] = useState([])

  useEffect(() => {
    const getactivitydata = async () => {
      try {
        const res = await axios.get('http://localhost:3000/admin-activities');
        setrecentActivities(res.data);
      } catch (err) {
        console.error('Failed to fetch activities:', err);
      }
    }
    getactivitydata();
  }, [])

  const getTimeAgo = (timestamp) => {
    const seconds = Math.floor((new Date() - new Date(timestamp)) / 1000);
    if (seconds < 60) return `${seconds} sec ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} min ago`;
    const hours = Math.floor(minutes / 60);
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  };


  const getStatusColor = (status) => {
    switch (status) {
      case "success": return "bg-success text-white";
      case "warning": return "bg-warning text-white";
      case "error": return "bg-danger text-white";
      default: return "bg-info text-white";
    }
  };

  return (

    <div className="dashboard-overview-container">
      <div className="mb-5">
        <h1 className="dashboard-title mb-2">Dashboard Overview</h1>
        <p className="text-muted">Monitor and manage your job portal administrators</p>
      </div>

      {/* Stats Grid */}
      <div className="row mb-5 g-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="col-md-6 col-lg-3">
              <Card className="h-100 shadow-sm hover-effect">
                <Card.Body>
                  <div className="d-flex align-items-center justify-content-between">
                    <div>
                      <p className="text-muted mb-1 small">{stat.title}</p>
                      <p className="h3 fw-bold">{stat.value}</p>
                    </div>
                    <div className={`p-3 rounded-circle ${stat.bgColor}`}>
                      <Icon className={`${stat.color}`} size={24} />
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </div>
          );
        })}
      </div>

      {/* Recent Activities */}
      <Card className="mb-4">
        <Card.Header>
          <Card.Title className="mb-0">Recent Admin Activities</Card.Title>
        </Card.Header>
        <Card.Body>
          <div className="activity-list">
            {recentActivities.map((activity, index) => (
              <div key={index} className="d-flex align-items-center justify-content-between p-3 border rounded mb-3">
                <div className="flex-grow-1">
                  <div className="d-flex align-items-center gap-2 mb-1">
                    <span className="fw-medium">{activity.admin.name}</span>
                    <Badge pill className={`${getStatusColor(activity.status)}`}>
                      {activity.action}
                    </Badge>
                  </div>
                  <p className="text-muted small mb-0">
                    Target: {activity.targetType} (ID: {activity.targetId})
                  </p>
                </div>
                <span className="text-muted small">{getTimeAgo(activity.timestamp)}</span>
              </div>
            ))}
          </div>
        </Card.Body>
      </Card>
    </div>

  );
};
export default SuperDashboardOverview;