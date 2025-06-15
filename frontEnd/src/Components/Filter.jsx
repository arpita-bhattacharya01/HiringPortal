import React, { useState } from 'react';
import './Filter.css';

function Filter({ onFilterChange }) {
  const [openSections, setOpenSections] = useState(() =>
    Object.fromEntries(
      [
        'department', 'workMode', 'experience', 'salary', 'companyType',
        'roleCategory', 'stipend', 'duration', 'education',
        'postedBy', 'industry', 'topCompanies', 'freshness', 'location'
      ].map((key) => [key, true])
    )
  );

  const [selectedFilters, setSelectedFilters] = useState({});
  const [experience, setExperience] = useState(0);
  const [modalSectionKey, setModalSectionKey] = useState(null);

  // Maintain modal-specific selected items
  const [modalSelectedItems, setModalSelectedItems] = useState({});

  const sections = [
    {
      key: 'department',
      label: 'Department',
      items: [
        ['Engineering - Software'],
        ['Sales & Business Dev.'],
        ['Customer Success'],
        ['Finance & Accounting'],
        ['Marketing'],
        ['Product Management'],
        ['Design & UI/UX'],
        ['Operations'],
        ['Human Resources (HR)'],
        ['Quality Assurance (QA)'],
        ['Legal'],
        ['Administration'],
        ['Technical Support'],
        ['Data Science'],
        ['Content Writing'],
        ['IT Services & Consulting'],
        ['BPM / BPO'],
        ['Banking'],
        ['Medical Services']
      ]
    },
    {
      key: 'workMode',
      label: 'Work Mode',
      items: [
        ['Work from office'],
        ['Hybrid'],
        ['Remote']
      ]
    },
    {
      key: 'experience',
      label: 'Experience',
      isSlider: true
    },
    {
      key: 'salary',
      label: 'Salary',
      items: [
        ['0-3 Lakhs'],
        ['3-6 Lakhs'],
        ['6-10 Lakhs'],
        ['10-15 Lakhs'],
        ['More than 15 Lakhs']
      ]
    },
    {
      key: 'companyType',
      label: 'Company Type',
      items: [
        ['Corporate'],
        ['Foreign MNC'],
        ['Indian MNC'],
        ['Startup'],
        ['Public Sector'],
        ['Government'],
        ['Non-Profit / NGO'],
        ['Educational Institution'],
        ['Freelance / Individual'],
        ['Joint Venture']

      ]
    },
    {
      key: 'roleCategory',
      label: 'Role Category',
      items: [
        ['Software Development'],
        ['Web Developer'],
        ['Retail & B2C Sales'],
        ['BD / Pre Sales'],
        ['Enterprise & B2B Sales'],
        ['Technical Support'],
        ['Quality Assurance (QA)'],
        ['UI/UX Design'],
        ['Marketing & Communications'],
        ['Product Management'],
        ['Human Resources (HR)'],
        ['Data Analysis & BI'],
        ['Operations & Supply Chain'],
        ['Finance & Accounting'],
        ['Project Management'],
        ['Content & Copywriting'],
        ['Video Editing']
      ]
    },
    {
      key: 'stipend',
      label: 'Stipend',
      items: [
        ['Unpaid'],
        ['0-10k'],
        ['10k-20k'],
        ['20k-30k'],
        ['More than 30K']
      ]
    },
    {
      key: 'duration',
      label: 'Duration',
      items: [
        ['1 Month'],
        ['2 Months'],
        ['3 Months'],
        ['4 Months'],
        ['6 Months'],
        ['More than 6 Month']
      ]
    },
    {
      key: 'education',
      label: 'Education',
      items: [
        ['Any Postgraduate'],
        ['MBA/PGDM'],
        ['M.Tech/M.E.'],
        ['MCA'],
        ['Any Graduate'],
        ['B.Tech/B.E.'],
        ['B.Sc'],
        ['BCA'],
        ['BBA'],
        ['B.Com'],
        ['Diploma'],
        ['Ph.D'],
        ['M.Sc'],
        ['M.Com']
      ]
    },
    {
      key: 'industry',
      label: 'Industry',
      items: [
        ['IT Services & Consulting'],
        ['BPM / BPO'],
        ['Banking'],
        ['Medical Services'],
        ['Engineering & Construction'],
        ['Education & Training'],
        ['Finance & Insurance'],
        ['Advertising & Media'],
        ['Automobile & Auto Ancillaries'],
        ['Retail'],
        ['Telecom'],
        ['Hospitality'],
        ['Travel & Tourism'],
        ['Real Estate'],
        ['Legal'],
        ['E-commerce'],
        ['Government & Defence'],
        ['Pharmaceuticals'],
        ['Oil & Gas'],
        ['Agriculture & Forestry']
      ]
    },
    {
      key: 'location',
      label: 'Location',
      items: [
        ['Bengaluru'],
        ['Delhi / NCR'],
        ['Mumbai'],
        ['Agra'],
        ['Pune'],
        ['Jaipur'],
        ['Chandigarh'],
        ['Hyderabad'],
        ['Kolkata'],
        ['Ahmedabad'],
        ['Chennai'],
        ['Lucknow'],
        ['Bhopal'],
        ['Indore'],
        ['Surat'],
        ['Nagpur'],
        ['Patna'],
        ['Coimbatore'],
        ['Thiruvananthapuram'],
        ['Visakhapatnam']
      ]
    }
  ];

  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const closeModal = () => {
    // Apply modal selections to main filters when closing
    if (modalSectionKey && modalSelectedItems[modalSectionKey]) {
      const updatedFilters = {
        ...selectedFilters,
        [modalSectionKey]: modalSelectedItems[modalSectionKey]
      };

      setSelectedFilters(updatedFilters);

      // Delay calling onFilterChange until after render
      setTimeout(() => {
        if (typeof onFilterChange === 'function') {
          onFilterChange(updatedFilters);
        }
      }, 0);
    }
    setModalSectionKey(null);
  };


  const handleCheckboxChange = (sectionKey, label) => {
    setSelectedFilters((prev) => {
      const current = new Set(prev[sectionKey] || []);
      current.has(label) ? current.delete(label) : current.add(label);

      const updated = {
        ...prev,
        [sectionKey]: Array.from(current)
      };

      if (typeof onFilterChange === 'function') {
        onFilterChange(updated);
      }

      return updated;
    });
  };

  const handleModalCheckboxChange = (sectionKey, label) => {
    setModalSelectedItems(prev => {
      const current = new Set(prev[sectionKey] || new Set(selectedFilters[sectionKey]) || []);
      current.has(label) ? current.delete(label) : current.add(label);

      return {
        ...prev,
        [sectionKey]: Array.from(current)
      };
    });
  };

  // Initialize modal selections when opening
  const openModal = (sectionKey) => {
    setModalSelectedItems(prev => ({
      ...prev,
      [sectionKey]: [...(selectedFilters[sectionKey] || [])]
    }));
    setModalSectionKey(sectionKey);
  };

  const currentModalSection = sections.find(section => section.key === modalSectionKey);


  return (
    <>
      <aside className="filter-sidebar w-20 mt-5">
        <div className="filter-title">All Filters</div>
        {sections.map((section) => (
          <div className="filter-section" key={section.key}>
            <div className="filter-header" onClick={() => toggleSection(section.key)}>
              <strong>{section.label}</strong>
              <span>{openSections[section.key] ? '▴' : '▾'}</span>
            </div>
            {openSections[section.key] && (
              section.isSlider ? (
                <div className="slider-container">
                  <div className="slider-value" style={{ left: `${(experience / 30) * 100}%` }}>
                    {experience}
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="30"
                    value={experience}
                    onChange={(e) => {
                      const value = Number(e.target.value);
                      setExperience(value);
                      onFilterChange({
                        ...selectedFilters,
                        experience: [`${value}-${value}`] // Send as a range string
                      });
                    }}
                    className="slider"
                  />
                  <div className="slider-labels">
                    <span>0 Yrs</span>
                    <span>30 Yrs</span>
                  </div>
                </div>
              ) : (
                <ul className="filter-list">
                  {section.items.slice(0, 4).map(([label]) => {
                    const id = `checkbox-${section.key}-${label.replace(/\s+/g, '-')}`;
                    return (
                      <li key={label} className="filter-item">
                        <label className="checkbox-label">
                          <input
                            type="checkbox"
                            checked={selectedFilters[section.key]?.includes(label) || false}
                            onChange={() => handleCheckboxChange(section.key, label)}
                          />
                          <span className="label-text">{label}</span>
                        </label>
                      </li>
                    );
                  })}
                  {section.items.length > 4 && (
                    <li>
                      <button
                        className="view-more"
                        onClick={() => openModal(section.key)}
                      >
                        View More
                      </button>
                    </li>
                  )}
                </ul>
              )
            )}
          </div>
        ))}
      </aside>

      {/* Modal */}
      {modalSectionKey && currentModalSection && (
        <div className="modal-overlay-filter" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{currentModalSection.label}</h2>
            <ul className="modal-list">
              {currentModalSection.items.map(([label]) => {
                const isChecked = modalSelectedItems[currentModalSection.key]?.includes(label) ||
                  selectedFilters[currentModalSection.key]?.includes(label);
                return (
                  <li key={label}>
                    <label>
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handleModalCheckboxChange(currentModalSection.key, label)}
                      />
                      {label}
                    </label>
                  </li>
                );
              })}
            </ul>
            <button onClick={closeModal} className="close-btn-filter">Apply & Close</button>
          </div>
        </div>
      )}
    </>
  );
}

export default Filter;