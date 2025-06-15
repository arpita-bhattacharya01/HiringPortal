import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="card mb-3">
      <div
        className="card-header d-flex justify-content-between align-items-center bg-white"
        onClick={() => setIsOpen(!isOpen)}
        style={{ cursor: 'pointer' }}
      >
        <h5 className="mb-0">{question}</h5>
        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </div>
      {isOpen && (
        <div className="card-body bg-light">
          <p className="card-text">{answer}</p>
        </div>
      )}
    </div>
  );
};
export default FAQItem;
