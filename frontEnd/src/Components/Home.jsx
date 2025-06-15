import React from 'react'
import Navbar from  './Navbar'
import JobSearch from './Jobsearch'
import Jobtype from './Jobtype'
import Companycrousel from './Companycrousel'
import SponseredCarousel from './SponsoredCarousel'
import FooterNew from './FooterNew'
import PopularRoles from './PopularRoles'
const Home = () => {
  return (
    <div>
      <Navbar/>
      <JobSearch/>
      <Jobtype/>
      <Companycrousel/>
      <PopularRoles/>
      <SponseredCarousel/>
      <FooterNew/>
    </div>
  )
}

export default Home
