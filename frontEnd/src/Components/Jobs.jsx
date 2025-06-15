import React from 'react'
import { useState } from 'react'
import Filter from './Filter'
import CompanyJD from './CompanyJD'
import FeaturedCompanies from './FeaturedCompanies'
function Jobs() {
  const [filters, setFilters] = useState({});
  return (
    <>
      <div className="d-flex justify-content-around my-3 w-100">
        <FeaturedCompanies />
        <CompanyJD filters={filters} />
        <Filter onFilterChange={setFilters} />
      </div>
    </>
  )
}

export default Jobs