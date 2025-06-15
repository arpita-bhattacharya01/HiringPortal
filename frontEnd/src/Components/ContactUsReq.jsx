import React, { useState } from 'react';
import SalesEnquiryModal from './SalesEnquiryModal';

const ContactUsReq = () => {
     const logosBigComp = [
    { src: 'https://fhlazwebsau01.blob.core.windows.net/drupal-data/2023-03/footer.png', alt: 'Fortis' },
    { src: 'https://th.bing.com/th/id/OIP.XJP0KEstXNdU_ld3a6yH4gHaDY?w=331&h=160&c=7&r=0&o=5&cb=iwc2&pid=1.7', alt: 'Tesco' },
    { src: 'https://www.datanami.com/wp-content/uploads/2022/11/wipro-logo-2022.png', alt: 'Wipro' },
    { src: 'https://static.vecteezy.com/system/resources/previews/019/766/240/original/amazon-logo-amazon-icon-transparent-free-png.png', alt: 'Amazon' },
    { src: 'https://th.bing.com/th/id/OIP.ddAupefTQziFSY2K68ULCQHaB-?cb=iwc2&rs=1&pid=ImgDetMain', alt: 'ITC Limited' },
    { src: 'https://www.inntechawards.com/wp-content/uploads/2022/06/reliance.png', alt: 'Reliance' },
    { src: 'https://static.vecteezy.com/system/resources/previews/024/806/538/original/infosys-logo-transparent-free-png.png', alt: 'Infosys' },
    { src: 'https://th.bing.com/th/id/OIP.xaZjg7RRugoEzqklLVpC9AHaDd?cb=iwc2&w=1920&h=896&rs=1&pid=ImgDetMain', alt: 'Tata' }
  ];

  const [showSalesEnquiryModal, setShowSalesEnquiryModal] = useState(false);

  const handleSave = () => {
    // handle save logic here
    console.log('Saving...');
    setShowSalesEnquiryModal(false);
  };

  return (
    <div className="container my-5 w-90">
      <div className="d-flex justify-content-center gap-6" style={{ borderRadius: '10px', backgroundColor: "rgb(219, 212, 254)" }}>
        <div>
          <img
            style={{ borderLeft: '1px solid transparent' }}
            src="https://plus.unsplash.com/premium_photo-1665203604603-e097954797e9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8Y29udGFjdCUyMHVzfGVufDB8fDB8fA%3D%3D&w=1000&q=80"
            alt=""
            width="300px"
            height="180px"
          />
        </div>
        <div className="d-flex justify-content-center align-items-center flex-column" style={{ color: "rgb(78, 69, 121)" }}>
          <h2 style={{ fontWeight: "700" }}>Not sure which offering is right for you?</h2>
          <h5>Leave your contact details and we'll get back to you shortly.</h5>

          <div className="d-flex justify-content-center align-items-center">
          <button
            onClick={() => setShowSalesEnquiryModal(true)}
            className="request-btn-card align-self-right me-3 p-3 mt-2"
            style={{ backgroundColor: "rgb(53, 31, 165)", color: "white" }}
          >
            Request callback
          </button>
        </div>

        </div>
        
      </div>

      {/* Modal outside the row */}
      <SalesEnquiryModal
        show={showSalesEnquiryModal}
        handleClose={() => setShowSalesEnquiryModal(false)}
        onSave={handleSave}
      />

      <div className="text-center my-5">
      <h2 className="fw-bold text-primary">Join 7 Lakh+ businesses</h2>
      <p className="text-muted">who choose Naukri for their hiring needs</p>

      <div className="d-flex flex-wrap justify-content-center gap-4 mt-4">
        {logosBigComp.map((logo, index) => (
          <div
            key={index}
            className=" border rounded bg-white"
            style={{ width: '100px', height: '100px' }}
          >
            <img
              src={logo.src} height={'80px'} width={'80px'}
              alt={logo.alt}
              className="img-fluid h-100 object-fit-contain"style={{backgroundPosition:"cover"}}
            />
          </div>
        ))}
      </div>
    </div>
    
    </div>
  );
};

export default ContactUsReq;
