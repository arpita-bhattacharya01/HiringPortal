import React from 'react';
import { MapPin, Building2, Users, Briefcase } from 'lucide-react';

const SearchFilters = ({ filters, onFiltersChange }) => {
  const handleFilterChange = (key, value) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  return (
    <div className="row g-3">
      {/* Location */}
      <div className="col-12 col-md-3 position-relative">
        <MapPin 
          size={16} 
          className="position-absolute top-50 start-0 translate-middle-y ms-3 text-primary" 
          aria-hidden="true" 
        />
        <select
          value={filters.location}
          onChange={(e) => handleFilterChange('location', e.target.value)}
          className="form-select ps-5"
          aria-label="Select location"
        >
          <option value="">All Locations</option>
          <option value="San Francisco">San Francisco, CA</option>
          <option value="Austin">Austin, TX</option>
          <option value="New York">New York, NY</option>
          <option value="Seattle">Seattle, WA</option>
          <option value="Remote">Remote</option>
        </select>
      </div>

      {/* Industry */}
      <div className="col-12 col-md-3 position-relative">
        <Building2 
          size={16} 
          className="position-absolute top-50 start-0 translate-middle-y text-warning ms-3" 
          aria-hidden="true" 
        />
        <select
          value={filters.industry}
          onChange={(e) => handleFilterChange('industry', e.target.value)}
          className="form-select ps-5"
          aria-label="Select industry"
        >
          <option value="">All Industries</option>
          <option value="Technology">Technology</option>
          <option value="Finance">Finance</option>
          <option value="Healthcare">Healthcare</option>
          <option value="Energy">Energy</option>
          <option value="Education">Education</option>
        </select>
      </div>

      {/* Company Size */}
      <div className="col-12 col-md-3 position-relative">
        <Users 
          size={16} 
          className="position-absolute top-50 start-0 translate-middle-y text-danger ms-3" 
          aria-hidden="true" 
        />
        <select
          value={filters.size}
          onChange={(e) => handleFilterChange('size', e.target.value)}
          className="form-select ps-5"
          aria-label="Select company size"
        >
          <option value="">Company Size</option>
          <option value="1-50">1-50 employees</option>
          <option value="51-200">51-200 employees</option>
          <option value="201-500">201-500 employees</option>
          <option value="500-1000">500-1000 employees</option>
          <option value="1000-5000">1000-5000 employees</option>
          <option value="5000+">5000+ employees</option>
        </select>
      </div>

      {/* Job Type */}
      <div className="col-12 col-md-3 position-relative">
        <Briefcase 
          size={16} 
          className="position-absolute top-50 start-0 translate-middle-y text-success ms-3" 
          aria-hidden="true" 
        />
        <select
          value={filters.type}
          onChange={(e) => handleFilterChange('type', e.target.value)}
          className="form-select ps-5"
          aria-label="Select job type"
        >
          <option value="">Job Type</option>
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
          <option value="Contract">Contract</option>
          <option value="Freelance">Freelance</option>
          <option value="Internship">Internship</option>
        </select>
      </div>
    </div>
  );
};

export default SearchFilters;
