import { Link } from 'react-router-dom';
import { Users, HelpCircle, FileText, Settings, MessageCircle } from 'lucide-react';
import FAQItem from './FAQItem';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';


const UserFAQ = () => {
  const navigate = useNavigate();
  
    const faqSections = [
  {
    title: "Getting Started",
    icon: <FileText size={24} />,
    questions: [
      {
        question: "How do I create an account?",
        answer:
          "Click on the 'Sign Up' button and fill in your basic details like name, email, and password. Once registered, you can complete your profile and start applying for jobs."
      },
      {
        question: "Is it free to apply for jobs?",
        answer:
          "Yes, our platform is completely free for job seekers. You can search, apply for jobs, and attend interviews without any charges."
      },
      {
        question: "How do I complete my profile?",
        answer:
          "After logging in, go to your dashboard and click on 'Edit Profile'. Add your resume, skills, work experience, education, and other relevant information to increase your chances of getting noticed."
      }
    ]
  },
  {
    title: "Job Applications",
    icon: <Users size={24} />,
    questions: [
      {
        question: "How do I apply for a job?",
        answer:
          "Browse jobs through the search bar or job listings. Click on a job you’re interested in, review the description, and click the 'Apply Now' button to submit your application."
      },
      {
        question: "Can I apply for multiple jobs?",
        answer:
          "Yes, you can apply to as many jobs as you like. We encourage you to apply for roles that match your skills and interests."
      },
      {
        question: "How can I track my job applications?",
        answer:
          "Go to the 'My Applications' section in your dashboard to see the status of all jobs you've applied for, including whether your profile has been viewed or shortlisted."
      },
      {
        question: "What should I do if I don’t hear back from employers?",
        answer:
          "Some employers may take time to respond. Meanwhile, continue applying to other jobs, keep your profile updated, and consider improving your resume and cover letter."
      }
    ]
  },
  {
    title: "Interviews & Communication",
    icon: <MessageCircle size={24} />,
    questions: [
      {
        question: "How will I know if I’m selected for an interview?",
        answer:
          "If an employer shortlists your application, you'll receive an email notification. You can also check your interview invites in the 'My Interviews' section of your dashboard."
      },
      {
        question: "Can I reschedule an interview?",
        answer:
          "If an employer offers rescheduling, you'll find a reschedule option in your interview details. You can request a new time, but final confirmation depends on the employer."
      },
      {
        question: "How do I prepare for an interview?",
        answer:
          "Check the job description carefully, research the company, and practice answering common interview questions. Also, dress appropriately and ensure a stable internet connection if it's a virtual interview."
      }
    ]
  },
  {
    title: "Profile & Resume",
    icon: <Settings size={24} />,
    questions: [
      {
        question: "How do I upload or update my resume?",
        answer:
          "Go to your dashboard, click on 'Profile', and use the 'Upload Resume' option. You can replace your resume anytime with an updated version."
      },
      {
        question: "What makes a strong profile?",
        answer:
          "Include a professional summary, relevant skills, work experience, and a well-formatted resume. A complete profile helps employers find and shortlist you more easily."
      },
      {
        question: "Can employers contact me directly?",
        answer:
          "Yes, if your profile is public, verified employers can view your resume and contact you for relevant opportunities."
      }
    ]
  },
  {
    title: "Support & Help",
    icon: <HelpCircle size={24} />,
    questions: [
      {
        question: "I forgot my password. What should I do?",
        answer:
          "Click on the 'Forgot Password' link on the login page and follow the instructions to reset your password via email."
      },
      {
        question: "How do I contact support?",
        answer:
          "You can reach our support team through the 'Help' section on your dashboard. We offer email assistance from Monday to Friday."
      },
      {
        question: "Why was my profile or application rejected?",
        answer:
          "Profiles or applications may be rejected if they are incomplete, inaccurate, or don't match the job requirements. Make sure your details are up-to-date and relevant to the jobs you're applying for."
      }
    ]
  }
];


  return (
    <div className="bg-light min-vh-100">
      <Navbar/>

      {/* Hero Section */}
      <div className="py-5 bg-white">
        <div className="container text-center">
          <h1 className="display-5 fw-bold mb-3">
            User's <span className="text-primary">FAQ</span>
          </h1>
          <p className="lead text-muted mb-4">
            Find answers to common questions about finding jobs, managing profile, 
            and forget password etc.
          </p>
          <div className="d-flex flex-column flex-sm-row justify-content-center gap-3">
            <button onClick={()=>navigate("/carrier")} className="btn btn-primary px-4">
              Find a Job
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
            <button onClick={()=>navigate("/reportaproblem")} className="btn btn-outline-light bg-light text-dark text-decoration-underline">
              Email Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserFAQ;
