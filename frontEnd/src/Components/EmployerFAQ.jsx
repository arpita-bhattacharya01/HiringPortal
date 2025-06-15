import { Link } from 'react-router-dom';
import { ArrowLeft, Users, DollarSign, FileText, Settings, MessageCircle } from 'lucide-react';
import FAQItem from './FAQItem';
import EmpLoginNavbar from './EmpLoginNavbar';
import { useNavigate } from 'react-router-dom';


const EmployerFAQ = () => {
  const navigate = useNavigate();
  const faqSections = [
  {
    title: "Getting Started",
    icon: <FileText size={24} />,
    questions: [
      {
        question: "How do I create my first job posting?",
        answer: "Log in to your employer dashboard and click on 'Post a Job'. Fill in the job title, description, required skills, experience, and location. Once submitted, your job will be reviewed and go live shortly after approval."
      },
      {
        question: "What details should I include in a job post?",
        answer: "Include a clear job title, detailed description of responsibilities, required qualifications, preferred skills, work location, salary range (if applicable), and company details to attract the right candidates."
      },
      {
        question: "How long does it take for my job post to be visible?",
        answer: "Job postings are usually reviewed and approved within 1–2 hours during business hours. Once approved, they will be visible to all job seekers on the platform."
      }
    ]
  },
  {
    title: "Managing Candidates",
    icon: <Users size={24} />,
    questions: [
      {
        question: "Where can I see the candidates who applied?",
        answer: "Go to your dashboard and click on 'My Jobs' or 'Applications'. You’ll see a list of all candidates who have applied, along with their resumes and contact details (if available)."
      },
      {
        question: "Can I contact applicants directly?",
        answer: "Yes, you can reach out to candidates via the messaging option on their profile or through the contact details they’ve shared in their resume."
      },
      {
        question: "How can I shortlist or reject candidates?",
        answer: "Use the 'Shortlist' and 'Reject' buttons next to each application in your dashboard. You can also add notes or tags to organize your hiring process better."
      },
      {
        question: "What if I’m not getting enough applications?",
        answer: "Try improving your job title, description, and listed requirements. Ensure your job listing is clear and complete. Our team also reviews job quality and may suggest enhancements for better reach."
      }
    ]
  },
  {
    title: "Account & Features",
    icon: <Settings size={24} />,
    questions: [
      {
        question: "Can I edit a job posting after publishing it?",
        answer: "Yes, go to your dashboard, open the job post, and click 'Edit'. You can update the description, requirements, or any other details. Changes will be saved immediately or after re-approval if major changes are made."
      },
      {
        question: "Can I repost an expired or closed job?",
        answer: "Absolutely. Visit the 'Expired Jobs' section in your dashboard and click 'Repost' next to any listing you’d like to activate again."
      },
      {
        question: "Is there a limit to how many jobs I can post?",
        answer: "No, there is no limit. You can post as many job openings as you need. Our platform is free for all employers."
      },
      {
        question: "Can I manage jobs from multiple companies under one account?",
        answer: "Currently, each account is tied to a single company profile. If you manage multiple companies, we recommend creating separate employer accounts for each one."
      }
    ]
  },
  {
    title: "Support & Assistance",
    icon: <MessageCircle size={24} />,
    questions: [
      {
        question: "What support options are available?",
        answer: "We offer email support to all users. You can also visit the Help Center for tutorials and common questions. Our team is available Monday to Friday from 9 AM to 6 PM."
      },
      {
        question: "Why was my job post not approved?",
        answer: "Job posts may be rejected if they violate our content policy, are incomplete, or appear misleading. You’ll receive an email with the reason and how to fix it. You can edit and resubmit the job post."
      },
      {
        question: "Can someone help me write a better job post?",
        answer: "Yes! We offer free job posting tips and sample templates to help you create effective job listings. Check our Help Center or reach out to our support team for guidance."
      }
    ]
  }
];

  return (
    <div className="bg-light min-vh-100">
      {/* Header */}
      {/* <div className="bg-white shadow-sm py-3 border-bottom">
        <div className="container d-flex justify-content-between align-items-center">
          <Link to="/" className="text-secondary d-flex align-items-center">
            <ArrowLeft size={18} className="me-2" />
            Back to Home
          </Link>
          <Link to="/" className="h4 text-primary fw-bold mb-0">
            JobBoard
          </Link>
        </div>
      </div> */}
      <EmpLoginNavbar/>

      {/* Hero Section */}
      <div className="py-5 bg-white">
        <div className="container text-center">
          <h1 className="display-5 fw-bold mb-3">
            Employer <span className="text-primary">FAQ</span>
          </h1>
          <p className="lead text-muted mb-4">
            Find answers to common questions about posting jobs, managing candidates, 
            and making the most of our platform to hire top talent.
          </p>
          <div className="d-flex flex-column flex-sm-row justify-content-center gap-3">
            <button onClick={()=>navigate("/postajob")} className="btn btn-primary px-4">
              Post a Job
            </button>
          </div>
        </div>
      </div>

      {/* FAQ Sections */}
      <div className="container pb-5">
        {faqSections.map((section, index) => (
          <div key={index} className="mb-5">
            <div className="d-flex align-items-center mb-3">
              <div className="bg-primary bg-opacity-10 rounded p-2 me-3 d-flex align-items-center justify-content-center" style={{ width: '48px', height: '48px' }}>
                <div className="text-primary">{section.icon}</div>
              </div>
              <h2 className="h4 fw-bold mb-0">{section.title}</h2>
            </div>
            <div className="accordion" id={`faq-section-${index}`}>
              {section.questions.map((faq, faqIndex) => (
                <FAQItem
                  key={faqIndex}
                  question={faq.question}
                  answer={faq.answer}
                  parentId={`faq-section-${index}`}
                  itemId={`faq-${index}-${faqIndex}`}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Contact Section */}
      <div className="bg-primary text-white py-5">
        <div className="container text-center">
          <h2 className="fw-bold mb-3">Still have questions?</h2>
          <p className="text-light mb-4 mx-auto" style={{ maxWidth: '600px' }}>
            Our support team is here to help you succeed in finding the perfect candidates for your team.
          </p>
          <div className="d-flex flex-column flex-sm-row justify-content-center gap-3">
            <button onClick={()=>navigate("/reportaproblem")} className="btn btn-outline-light">
              Email Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployerFAQ;
