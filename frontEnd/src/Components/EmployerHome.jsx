import React from 'react'
import EmployerNavbar from './EmployerNavbar'
import EmpDashboardBody from './EmpDashboardBody'
import EmpFooter from './EmpFooter'
import CompTypeCards from './CompTypeCards'
import ContactUsReq  from './ContactUsReq'
import FAQAccordion from  './FAQAccordion'

const EmployerHome = () => {
  return (
    <>
      <EmployerNavbar/>
      <EmpDashboardBody/>
      <CompTypeCards/>
      <ContactUsReq/>
      <FAQAccordion/>
      <EmpFooter/>
    </>
  )
}

export default EmployerHome