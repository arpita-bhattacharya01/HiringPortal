import React from 'react';
import { MapPin, Clock, DollarSign, Bookmark, Building2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const JobCard = ({ job }) => {
  const navigate = useNavigate()
  return (
    <div className="card border mb-4 shadow-sm">
      <div className="card-body">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-start mb-3">
          <div className="d-flex align-items-center gap-3">
            <img
              src={job.logo}
              alt={job.company}
              className="rounded border"
              style={{ width: '40px', height: '40px', objectFit: 'cover' }}
            />
            <div>
              <h5 className="card-title mb-0 text-primary" style={{ cursor: 'pointer' }}>
                {job.title}
              </h5>
              <small className="text-muted">{job.company}</small>
            </div>
          </div>

          <button className="btn btn-sm btn-outline-secondary p-1">
            <Bookmark size={16} />
          </button>
        </div>

        {/* Details */}
        <ul className="list-unstyled small mb-3">
          <li className="d-flex align-items-center mb-1 text-muted">
            <MapPin size={14} className="me-2" />
            {job.location}
          </li>
          <li className="d-flex align-items-center mb-1 text-muted">
            <Building2 size={14} className="me-2" />
            {job.type}
          </li>
          <li className="d-flex align-items-center mb-1 text-muted">
            <DollarSign size={14} className="me-2" />
            {job.salary}
          </li>
          <li className="d-flex align-items-center text-muted">
            <Clock size={14} className="me-2" />
            {job.posted}
          </li>
        </ul>

        {/* Buttons */}
        <div className="d-flex gap-2">
          <button className="btn btn-outline-primary btn-sm w-100" style={{border:"1px solid #004de6"}}> Save</button>
          <button className="btn btn-primary btn-sm w-100" onClick={() => { navigate("/JD") }}>Apply Now</button>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
