import React, { useRef } from 'react';
import './carousel.css';

const Companycrousel = () => {
  const carouselRef = useRef(null);

  const scrollCarousel = (distance) => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: distance, behavior: 'smooth' });
    }
  };
  const companies = [
    { title: 'MNCs', count: 26, logos: ['mnc1.gif', 'mnc2.gif', 'mnc3.gif', 'mnc4.gif'] },
    { title: 'Startup', count: 15, logos: ['startup1.gif', 'startup2.gif', 'startup3.gif', 'startup4.gif'] },
    { title: 'B2C', count: 121, logos: ['bajaj.gif', 'b2c2.gif', 'sandoz.gif', 'b2c3.gif'] },
    { title: 'Healthcare', count: 15, logos: ['hc1.gif', 'hc2.gif', 'hc3.gif', 'sandoz.gif'] },
    { title: 'B2C', count: 121, logos: ['bajaj.gif', 'b2c2.gif', 'sandoz.gif', 'b2c3.gif'] },
    { title: 'Startup', count: 15, logos: ['startup1.gif', 'startup2.gif', 'startup3.gif', 'startup4.gif'] },
  ];

  return (
    <div className='carousel-container'>

   
    <div className="carousel-wrapper">
      <div className="crousel-heading">
        <h3>Top Companies Hiring now</h3>
      </div>
      <button className="scroll-btn left" onClick={() => scrollCarousel(-300)}>&#8592;</button>
      <button className="scroll-btn right" onClick={() => scrollCarousel(300)}>&#8594;</button>

      <div className="company-carousel" ref={carouselRef}>
        {companies.map((company, idx) => (
          <div className="company-card" key={idx}>
            <h6>
              {company.title} <span>&#8250;</span>
            </h6>
            <div className="subtitle">{company.count} are actively hiring</div>
            <div className="company-logos">
              {company.logos.map((logo, i) => (
                <img
                  key={i}
                  src={`images/${logo}`}
                  alt={`${company.title} logo ${i}`}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
     </div>
  );
};
export default Companycrousel;

