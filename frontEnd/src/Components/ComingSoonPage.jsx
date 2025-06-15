import React from 'react';
import './ComingSoonPage.css';
import { Navbar, Nav } from 'react-bootstrap';

function ComingSoonPage() {
  return (
    <>
      <Navbar
    //    bg="light" variant="light"
        expand="lg" style={{backgroundColor:"#fff"}}>
        <Navbar.Brand href="/">
           <img src="images\Skilled Peepal Corner Logo.png" alt=""
           width={'200px'}
           height={'80px'} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          
        </Navbar.Collapse>
      </Navbar>

      <div className="coming-soon-container">
        <h1>🚧 Coming Soon...</h1>
        <p>We’re working hard to bring you something amazing.</p>
      </div>
    </>
  );
}

export default ComingSoonPage;
