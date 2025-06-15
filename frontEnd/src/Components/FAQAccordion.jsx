import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import 'bootstrap/dist/css/bootstrap.min.css';
import './FAQAccordion.css';


const faqData = [
  {
    question: "How can a recruiter sign up for a Skilled Peepal account?",
    answer: "Recruiters can register on Skilled Peepal by visiting the recruiter sign-up page, entering their organization details, and creating login credentials."
  },
  {
    question: "How does pricing work for Skilled Peepal recruiter plans and job postings?",
    answer: "Skilled Peepal offers flexible pricing plans based on hiring volume and features. Pricing depends on access to the candidate database, job posting limits, branding tools, and subscription duration."
  },
  {
    question: "What support, insights, and collaboration features does Skilled Peepal offer to recruiters?",
    answer: "Skilled Peepal provides recruiter dashboards with real-time analytics, team collaboration tools, and dedicated support to streamline your hiring process."
  },
  {
    question: "How secure is my recruiter account on Skilled Peepal?",
    answer: "Skilled Peepal ensures data protection through encrypted logins, OTP verification, and role-based access controls to safeguard your account and candidate data."
  },
  {
    question: "How can I find the right candidates using Skilled Peepal?",
    answer: "Use advanced search filters like skills, experience, location, and salary expectations, along with AI-powered candidate recommendations for precise shortlisting."
  },
  {
    question: "What features does Skilled Peepal offer for bulk hiring?",
    answer: "For bulk hiring, Skilled Peepal supports mass outreach tools, bulk resume downloads, multi-job postings, and access to a large pool of verified job seekers."
  },
  {
    question: "How can recruiters boost employer branding on Skilled Peepal?",
    answer: "Recruiters can leverage branded company profiles, featured job listings, sponsored banners, and other visibility tools to enhance employer branding."
  },
  {
    question: "Are there any tips for writing effective job postings on Skilled Peepal?",
    answer: "Yes. Use concise job titles, structured descriptions, bullet-pointed responsibilities, and role-specific keywords to attract well-matched candidates."
  }
];
function FAQAccordion() {
  return (
    <div className="container my-5">
      <h2 className="text-center mb-4 "style={{fontWeight: "700"}}>Frequently Asked Questions</h2>
      <Accordion defaultActiveKey="0" flush>
        {faqData.map((item, index) => (
          <Accordion.Item eventKey={index.toString()} key={index}>
            <Accordion.Header>{item.question}</Accordion.Header>
            <Accordion.Body>{item.answer}</Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  );
}

export default FAQAccordion;
