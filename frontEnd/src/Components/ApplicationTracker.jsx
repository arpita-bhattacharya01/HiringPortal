import React from 'react';
import { Clock, CheckCircle, XCircle, Calendar, Eye } from 'lucide-react';

const ApplicationTracker = () => {
  const applications = [
    {
      id: 1,
      company: 'TechCorp Solutions',
      position: 'Senior Frontend Developer',
      status: 'Interview Scheduled',
      date: '2024-01-15',
      stage: 'Technical Interview',
      statusClass: 'text-primary bg-primary-subtle'
    },
    {
      id: 2,
      company: 'Green Energy Inc',
      position: 'Product Manager',
      status: 'Under Review',
      date: '2024-01-12',
      stage: 'HR Review',
      statusClass: 'text-warning bg-warning-subtle'
    },
    {
      id: 3,
      company: 'DataFlow Analytics',
      position: 'Full Stack Developer',
      status: 'Rejected',
      date: '2024-01-10',
      stage: 'Final Decision',
      statusClass: 'text-danger bg-danger-subtle'
    },
    {
      id: 4,
      company: 'FinanceFlow',
      position: 'UX Designer',
      status: 'Applied',
      date: '2024-01-14',
      stage: 'Application Submitted',
      statusClass: 'text-secondary bg-light'
    }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Interview Scheduled':
        return <Calendar size={16} className="me-1 text-primary" />;
      case 'Under Review':
        return <Eye size={16} className="me-1 text-warning" />;
      case 'Rejected':
        return <XCircle size={16} className="me-1 text-danger" />;
      case 'Applied':
        return <Clock size={16} className="me-1 text-secondary" />;
      default:
        return <Clock size={16} className="me-1 text-muted" />;
    }
  };

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h5 className="card-title mb-0">Application Tracker</h5>
          <a href="#" className="text-primary text-decoration-none small">View All</a>
        </div>

        <div className="vstack gap-3">
          {applications.map((application) => (
            <div key={application.id} className={`border rounded p-3 ${application.statusClass}`}>
              <div className="d-flex justify-content-between align-items-start mb-2">
                <div>
                  <h6 className="fw-semibold mb-1">{application.position}</h6>
                  <small className="text-muted">{application.company}</small>
                </div>
                <div className="d-flex align-items-center">
                  {getStatusIcon(application.status)}
                  <span className={`small fw-medium ${application.statusClass.split(' ')[0]}`}>
                    {application.status}
                  </span>
                </div>
              </div>
              <div className="d-flex justify-content-between small text-muted">
                <span>{application.stage}</span>
                <span>Applied: {application.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ApplicationTracker;
