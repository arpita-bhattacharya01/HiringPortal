import React from 'react';
import {useNavigate } from 'react-router-dom';
import { MapPin, Users, Star, Bookmark, ExternalLink, Building2} from 'lucide-react';

const CompanyCard = ({ company }) => {
  const navigate = useNavigate();
  return (
    <div className="bg-white border rounded-lg p-4 shadow-sm hover-shadow-sm transition-shadow mb-4">
      <div className="d-flex justify-content-between align-items-start mb-3">
        <div className="d-flex align-items-center">
          <img
            src={company.logo}
            alt={company.name}
            className="rounded border"
            style={{ width: 48, height: 48, objectFit: 'contain' }}
          />
          <div className="ms-3">
            <h5
              className="fw-semibold text-primary"
              style={{ cursor: 'pointer' }}
            >
              {company.name}
            </h5>
            <p className="text-secondary mb-0" style={{ fontSize: '0.875rem' }}>
              {company.industry}
            </p>
          </div>
        </div>

        <button
          type="button"
          className="btn btn-link p-1 text-secondary"
          style={{ textDecoration: 'none' }}
          aria-label="Bookmark"
        >
          <Bookmark size={18} />
        </button>
      </div>

      <p className="text-secondary mb-3" style={{ fontSize: '0.875rem', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
        {company.description}
      </p>

      <div className="mb-3">
        <div className="d-flex align-items-center text-secondary mb-1" style={{ fontSize: '0.875rem' }}>
          <MapPin size={16} className="me-2" />
          <span>{company.location}</span>
        </div>

        <div className="d-flex align-items-center text-secondary mb-1" style={{ fontSize: '0.875rem' }}>
          <Users size={16} className="me-2" />
          <span>{company.employees} employees</span>
        </div>

        <div className="d-flex align-items-center text-secondary" style={{ fontSize: '0.875rem' }}>
          <Star size={16} className="me-2 text-warning" />
          <span>{company.rating} rating</span>
        </div>
      </div>

      <div className="mb-3">
        <p className="fw-medium mb-2" style={{ fontSize: '0.9rem', color: '#212529' }}>
          Benefits:
        </p>
        <div className="d-flex flex-wrap gap-2">
          {company.benefits.slice(0, 2).map((benefit, idx) => (
            <span
              key={idx}
              className="badge bg-light text-secondary"
              style={{ fontSize: '0.75rem' }}
            >
              {benefit}
            </span>
          ))}
          {company.benefits.length > 2 && (
            <span className="badge bg-light text-muted" style={{ fontSize: '0.75rem' }}>
              +{company.benefits.length - 2} more
            </span>
          )}
        </div>
      </div>

      <div className="d-flex justify-content-between align-items-center border-top pt-3">
        <span className="text-primary fw-semibold" style={{ fontSize: '0.9rem' }}>
          {company.openJobs} open positions
        </span>

        <div className="btn-group btn-group-sm" role="group" aria-label="Company actions">
          <button type="button" onClick={() => { navigate("/JD") }} className="btn btn-outline-secondary d-flex align-items-center">
            <ExternalLink size={14} className="me-1" />
            View
          </button>
          <button type="button" className="btn btn-primary" onClick={() => { navigate("/carrier") }}>
            View Jobs
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompanyCard;
