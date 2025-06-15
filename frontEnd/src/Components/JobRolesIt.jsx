import React from 'react'
import Slider from "react-slick";
import "./JobRolesIt.css"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function JobRolesIt() {
const jobTitles = [
  "Marketing Manager Jobs",
  "Sales Executive Jobs",
  "Human Resources Manager Jobs",
  "Accountant Jobs",
  "Financial Analyst Jobs",
  "Customer Support Executive Jobs",
  "Operations Manager Jobs",
  "Content Writer Jobs",
  "Digital Marketing Specialist Jobs",
  "Graphic Designer Jobs",
  "Logistics Coordinator Jobs",
  "Supply Chain Analyst Jobs",
  "Medical Representative Jobs",
  "Pharmacist Jobs",
  "Nurse Jobs",
  "Teacher Jobs",
  "School Counselor Jobs",
  "Event Planner Jobs",
  "Public Relations Executive Jobs",
  "Legal Advisor Jobs",
  "Real Estate Agent Jobs",
  "Chef Jobs",
  "Hotel Manager Jobs",
  "Travel Consultant Jobs",
  "Fitness Trainer Jobs",
  "Retail Store Manager Jobs",
  "Fashion Designer Jobs",
  "Interior Designer Jobs",
  "Translator Jobs",
  "Social Media Manager Jobs"
];


    const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    arrows: true,
    afterChange: function(index) {
      console.log(
        `Slider Changed to: ${index + 1}, background: #222; color:rgb(161, 187, 76)`
      );
    }
  };
 
  return (
    <div className='d-flex justify-content-center align-items-center w-100'>
         <div className="slider-container">
      <Slider {...settings}>
          {jobTitles.map((title, i) => (
          <div key={i} className='titleblock'>
            <h6>{title}</h6>
          </div>
        ))}        
      </Slider>
    </div>
    </div>
    
  );
}

export default JobRolesIt;

