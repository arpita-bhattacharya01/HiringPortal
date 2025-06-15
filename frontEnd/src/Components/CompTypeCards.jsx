import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import SalesEnquiryModal from './SalesEnquiryModal';
import { useState } from 'react';
import './CompTypeCards.css'; // Assuming custom styles here

function CompTypeCards() {

  const [showSalesEnquiryModal, setShowSalesEnquiryModal] = useState(false);

  const handleSave = () => {
    console.log('Saving...');
    setShowSalesEnquiryModal(false);
  };
  const cardData = [
    {
      title: "Large companies & enterprises",
      img: "https://www.marketing91.com/wp-content/uploads/2019/07/Importance-of-Corporate-Image.jpg",
      points: [
        "Fill any role, from bulk hiring to leadership positions",
        "Get AI-powered candidate insights and market trends",
        "Boost brand visibility with custom branding solutions",
      ]
    },
    {
      title: "Small & medium businesses",
      img: "https://th.bing.com/th/id/OIP.W0RdDYEIuKC9iwPaopeTOgAAAA?cb=iwc2&rs=1&pid=ImgDetMain",
      points: [
        "Find local candidates across India & get quick applies",
        "Hire candidates with relevant industry experience",
        "Start hiring with low-cost plans that deliver value"
      ]
    },
    {
      title: "Consultants & agencies",
      img: "https://pitcs.in/wp-content/uploads/2021/03/Recruitment-Agency-in-Bangalore-1024x682.jpg",
      points: [
        "Speed up your hiring with faster turnaround time",
        "Track your team performance with data insights",
        "Instantly connect with candidates via email, SMS, call"
      ]
    }
  ];
  return (
    <div className="my-6 w-90 mx-auto full-card-block" id='CompTypeCard'>
      <div className="d-flex justify-content-center flex-column w-100 text-center my-5">
        <h2 style={{ fontWeight: "700" }}>Hiring made simple for every business</h2>
        <p>Big or small, we’ve got you covered every step of the way</p>
      </div>

      <Row xs={1} sm={2} md={3} className="gx-4 gy-4 justify-content-center">
        {cardData.map((card, idx) => (
          <Col key={idx}>
            <Card className="h-100 shadow-sm">
              <div className="card-img-custom">
                <img src={card.img} alt="card visual" />
              </div>
              <Card.Body  className="card-body">
                <Card.Title className='text-center'>{card.title}</Card.Title>
                <ul className="list-unstyled ps-3">
                  {card.points.map((point, i) => (
                    <li key={i} className="d-flex align-items-start mb-2">
                      <img
                        src="https://static.naukimg.com/s/5/117/i/tick-circle.d80a0833.svg"
                        alt=""
                        className="me-2 mt-1"
                      />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
                <button onClick={() => {setShowSalesEnquiryModal(true)}} className="request-btn-card" >Request callback</button>
                <SalesEnquiryModal
                  show={showSalesEnquiryModal}
                  handleClose={() => setShowSalesEnquiryModal(false)}
                  onSave={handleSave}
                />
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default CompTypeCards;
