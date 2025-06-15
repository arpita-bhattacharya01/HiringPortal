import React from "react";
import { Users, Building2, Briefcase, Clock } from "lucide-react";
import { useState, useEffect } from "react";
import axios from 'axios'

const AdminStats = () => {
  

  const [stats, setstats] = useState({
    totalUsers: 0,
    totalEmployers: 0,
    activeJobs: 0,
    pendingApprovals: 0,
  })

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get('http://localhost:3000/stats');
        setstats(response.data)
      } catch (error) {
        console.error("Error fetching stats", error)
      }
    }
    fetchStats();
  }, [])

  const cards = [
    {
      title: "Total Users",
      value: stats.totalUsers,
      icon: <Users size={20} className="text-secondary" />,
      subtitle: "+12% from last month",
    },
    {
      title: "Total Employers",
      value: stats.totalEmployers,
      icon: <Building2 size={20} className="text-secondary" />,
      subtitle: "+5% from last month",
    },
    {
      title: "Active Jobs",
      value: stats.activeJobs,
      icon: <Briefcase size={20} className="text-secondary" />,
      subtitle: "+8% from last month",
    },
    {
      title: "Pending Approvals",
      value: stats.pendingApprovals,
      icon: <Clock size={20} className="text-secondary" />,
      subtitle: "Requires attention",
    },
  ];

  return (
    <div className="row">
      {cards.map((card, index) => (
        <div key={index} className="col-12 col-md-6 col-lg-3 mb-4">
          <div className="card h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h6 className="mb-0 text-muted">{card.title}</h6>
                {card.icon}
              </div>
              <h4 className="fw-bold">{card.value}</h4>
              <p className="text-muted small mb-0">{card.subtitle}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminStats;
