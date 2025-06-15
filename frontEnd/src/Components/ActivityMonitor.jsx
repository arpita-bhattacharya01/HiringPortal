import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import './ActivityMonitor.css';

const getBadgeClass = (action) => {
  if (action.toLowerCase().includes("approve")) return "badge bg-success";
  if (action.toLowerCase().includes("reject")) return "badge bg-warning text-dark";
  if (action.toLowerCase().includes("suspend")) return "badge bg-danger";
  if (action.toLowerCase().includes("update")) return "badge bg-info text-dark";
  return "badge bg-secondary";
};

const getTimeAgo = (timestamp) => {
  const seconds = Math.floor((new Date() - new Date(timestamp)) / 1000);
  if (seconds < 60) return `${seconds} sec ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.floor(minutes / 60);
  return `${hours} hour${hours > 1 ? 's' : ''} ago`;
};

const ActivityMonitor = () => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const res = await axios.get('http://localhost:3000/admin-activities');
        setActivities(res.data);
      } catch (err) {
        console.error('Failed to fetch activities:', err);
      }
    };
    fetchActivities();
  }, []);

  return (
    <div className="card shadow-sm p-4 activity-container">
      <h5 className="mb-3 fw-bold">Recent Admin Activities</h5>
      <ul className="list-unstyled">
        {activities.map((activity) => (
          <li key={activity.id} className="p-3 mb-3 bg-white border rounded shadow-sm d-flex justify-content-between align-items-center">
            <div>
              <div className="fw-bold mb-1">
                {activity.admin.name}
                {" "}
                <span className={getBadgeClass(activity.action)}>
                  {activity.action}
                </span>
              </div>
              <div className="text-muted small">
                Target: {activity.targetType} (ID: {activity.targetId})
              </div>
            </div>
            <div className="text-muted small text-end">
              {getTimeAgo(activity.timestamp)}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActivityMonitor;
