import React, { useState } from 'react';
import { Search, Bell, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ApplicationTracker from './ApplicationTracker'
import UserProfile from './UserProfile';
import CompanyCard from './CompanyCard';
import JobCard from './JobCard';
import SearchFilters from './SearchFilters';
import Navbar from './Navbar';
import FooterNew from './FooterNew';
import './UserDashboard.css'
import SponsoredCarousel from './SponsoredCarousel';
import JobRolesIt from './JobRolesIt';

const UserDashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({
    location: '',
    industry: '',
    size: '',
    type: ''
  });
  const navigate = useNavigate();

    // Mock data for companies
  const companies = [
    {
      id: 1,
      name: 'TechCorp Solutions',
      logo: 'https://i.pinimg.com/736x/35/7c/51/357c51eb56f48d0b50dcaf1f003afbe7.jpg',
      industry: 'Technology',
      location: 'San Francisco, CA',
      employees: '1000-5000',
      rating: 4.8,
      openJobs: 24,
      description: 'Leading software development company specializing in AI and machine learning solutions.',
      benefits: ['Health Insurance', 'Remote Work', '401k Match', 'Stock Options']
    },
    {
      id: 2,
      name: 'Green Energy Inc',
      logo: 'https://assets.chemicalparks.eu/system/files/organizations/logo/715/default_ineratec_1682535932.png',
      industry: 'Energy',
      location: 'Austin, TX',
      employees: '500-1000',
      rating: 4.6,
      openJobs: 12,
      description: 'Sustainable energy solutions for a better tomorrow.',
      benefits: ['Health Insurance', 'Flexible Hours', 'Education Budget', 'Gym Membership']
    },
    {
      id: 3,
      name: 'FinanceFlow',
      logo: 'https://excellencetechnologies.in/assets/portfolio_hires/react/betica/logo.png',
      industry: 'Finance',
      location: 'New York, NY',
      employees: '2000-5000',
      rating: 4.7,
      openJobs: 18,
      description: 'Revolutionary fintech company transforming digital payments.',
      benefits: ['Health Insurance', 'Bonus Program', 'Stock Options', 'Paid Time Off']
    }
  ];

  // Mock data for jobs
  const recommendedJobs = [
    {
      id: 1,
      title: 'Senior Frontend Developer',
      company: 'TechCorp Solutions',
      location: 'San Francisco, CA',
      type: 'Full-time',
      salary: '$120,000 - $160,000',
      posted: '2 days ago',
      logo: 'https://newsnowgh.com/wp-content/uploads/2021/07/Tetra-Tech-Inc..jpg',
    },
    {
      id: 2,
      title: 'Product Manager',
      company: 'Green Energy Inc',
      location: 'Austin, TX',
      type: 'Full-time',
      salary: '$110,000 - $140,000',
      posted: '1 week ago',
      logo: 'https://i.pinimg.com/736x/35/7c/51/357c51eb56f48d0b50dcaf1f003afbe7.jpg'
    },
    {
      id: 3,
      title: 'UX Designer',
      company: 'FinanceFlow',
      location: 'New York, NY',
      type: 'Full-time',
      salary: '$95,000 - $125,000',
      posted: '3 days ago',
      logo: 'https://i.pinimg.com/originals/b5/07/6a/b5076a0a2c1c37be7452d5defad5231d.jpg'
    }
  ];

  // Mock data for companies and jobs (same as before)

  const filteredCompanies = companies.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         company.industry.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLocation = !selectedFilters.location || company.location.includes(selectedFilters.location);
    const matchesIndustry = !selectedFilters.industry || company.industry === selectedFilters.industry;
    const matchesSize = !selectedFilters.size || company.employees === selectedFilters.size;
    
    return matchesSearch && matchesLocation && matchesIndustry && matchesSize;
  });

  return (
    <>
      <Navbar/>
      <div className="container py-4">
        <div className="row">
          {/* Left Sidebar - User Profile */}
          <div className="col-lg-3">
            <UserProfile />
            {/* Quick Stats */}
            <div className="mt-4 bg-white rounded shadow-sm p-3">
              <h5 className="mb-3">Quick Stats</h5>
              <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  Applications
                  <span className="badge bg-primary rounded-pill">12</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  Interviews
                  <span className="badge bg-success rounded-pill">3</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  Saved Jobs
                  <span className="badge bg-purple rounded-pill">8</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  Profile Views
                  <span className="badge bg-warning rounded-pill">24</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Main Content */}
          <div className="col-lg-9">
            {/* Search Section */}
            <div className="bg-white rounded shadow-sm p-4 mb-4">
              <div className="row g-3 mb-3">
                <div className="col-md-9 position-relative">
                  <Search className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" size={20} />
                  <input
                    type="text" 
                    className="form-control ps-5 border-rounded-pill"
                    placeholder="Search companies, jobs, or industries..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="col-md-3">
                  <button className="btn btn-primary w-100">Search</button>
                </div>
              </div>
              <SearchFilters 
                filters={selectedFilters}
                onFiltersChange={setSelectedFilters}
              />
            </div>
            <div className="bg-white rounded shadow-sm p-4">
              <ApplicationTracker />
            </div>

            {/* Recommended Jobs */}
            <div className="bg-white rounded shadow-sm p-4 mb-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="mb-0">Recommended for You</h5>
                <a href="#" className="text-primary text-decoration-none"  onClick={() => { navigate("/carrier") }}>View All</a>
              </div>
              <div className="row">
                {recommendedJobs.map(job => (
                  <div className="col-md-6 mb-3" key={job.id}>
                    <JobCard job={job} />
                  </div>
                ))}
              </div>
            </div>

            {/* Companies Section */}
            <div className="bg-white rounded shadow-sm p-4 mb-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="mb-0">
                  Featured Companies 
                  <span className="text-muted small ms-2">({filteredCompanies.length} found)</span>
                </h5>
                <button className="btn btn-outline-primary btn-sm"  onClick={() => { navigate("/carrier") }}>View All</button>
              </div>
              <div className="row">
                {filteredCompanies.map(company => (
                  <div className="col-md-6 col-xl-4 mb-3" key={company.id}>
                    <CompanyCard company={company} />
                  </div>
                ))}
              </div>
            </div>
            <div>
              <JobRolesIt/>
            </div>
            {/* <div className="bg-white rounded shadow-sm p-4 mb-4">
              {/* <SponsoredCarousel/> 
            </div> */}

            {/* Recent Activity */}
            <div className="bg-white rounded shadow-sm p-4">
              <h5 className="mb-3">Recent Activity</h5>
              <ul className="list-group">
                <li className="list-group-item d-flex align-items-start mb-2 text-danger bg-danger-subtle">
                  <div className="me-3 mt-1">
                    <span className="badge bg-primary rounded-circle p-2 "></span>
                  </div>
                  <div >
                    <p className="mb-1">Application submitted to <strong>TechCorp Solutions</strong></p>
                    <small className="text-muted">2 hours ago</small>
                  </div>
                </li>
                <li className="list-group-item d-flex align-items-start mb-2 text-primary bg-primary-subtle">
                  <div className="me-3 mt-1">
                    <span className="badge bg-success rounded-circle p-2"></span>
                  </div>
                  <div>
                    <p className="mb-1">Interview scheduled with <strong>Green Energy Inc</strong></p>
                    <small className="text-muted">1 day ago</small>
                  </div>
                </li>
                <li className="list-group-item d-flex align-items-start text-warning bg-warning-subtle">
                  <div className="me-3 mt-1">
                    <span className="badge bg-purple rounded-circle p-2"></span>
                  </div>
                  <div>
                    <p className="mb-1">Profile viewed by <strong>FinanceFlow</strong></p>
                    <small className="text-muted">2 days ago</small>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <FooterNew/>
    </>
  );
};

export default UserDashboard;
