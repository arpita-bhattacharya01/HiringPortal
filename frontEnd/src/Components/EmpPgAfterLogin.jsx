import { LuPhoneCall } from "react-icons/lu";
import { LuMessageCircleMore } from "react-icons/lu";
import EmpLoginFooter from "./EmpLoginFooter";
import Badge from "react-bootstrap/Badge";
import "./EmpPgAfterLogin.css"; // Optional for custom styles
import EmpLoginNavbar from "./EmpLoginNavbar";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";

import { Plus } from "lucide-react";
import EmployerDashboard from "./EmployerDashboard";

const user = JSON.parse(localStorage.getItem('user'))

const EmpPgAfterLogin = () => {
  const navigate = useNavigate();
  return (
    <>
      <EmpLoginNavbar />
      
        <EmployerDashboard/>

      <div className="py-4">

      
        <div className="d-flex container flex-column-media justify-content-between gap-4 flex-sm-column flex-md-row flex-xs-column w-100">
          <div
            className="d-flex flex-column p-4 w-sm-100 subbox-width justify-content-center"
            style={{
              alignItems : "center", 
              border: "1px solid rgb(222, 164, 63)",
              backgroundColor: "rgb(47, 141 , 255)",
              borderRadius: "10px",
              // width: "75%",
              marginBottom: "30px",
              color : "white",
              marginBottom: "40px",
              minWidth :"75%",
              //  marginLeft:"100px"
            }}
          >
            <h3>
               Looking to Hire Top Talent
            </h3>  
            <p>
              Post your jobs and connect with qualified candidate instantly
            </p>
            {/* <button type="button" class="btn btn-light" >Post a job</button> */}
            <Button
                  className=" text-primary btn-light"
                  onClick={() => navigate("/postajob")}
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Post New Job
                </Button>
            {/* <Badge bg="primary"
              style={{
                width: "150px",
                padding: "10px"
              }}
            >Complete KYC</Badge> */}
          </div>
           
          <div className="p-1 mb-4  w-sm-100"
            style={{
              border: "1px solid grey",
              backgroundColor: "#fff",
              borderRadius: "10px",
              // width: "25%",
              height: "max-content"
              // marginRight:"100px"
            }}
          >

            <h4 className="info-title text-center text-primary fs-4">Contact Us</h4>
            < p className="text-center"><LuPhoneCall /> +91 86-5000-6677 |<br /> +91 80-0646-2740</p>
            <span >(09:30 AM - 6:30 PM, Mon - Sun)</span>
            <p className="mb-0 mx-2 p-1"><LuMessageCircleMore /> sales@acculizeintech.com</p>

          </div>
        </div>
        

        <div className=" d-flex container flex-column justify-content-between gap-4 flex-sm-column flex-md-row flex-xs-column w-100">
           <div className="p-3 info-card-1"
          style={{
            border: "1px solid grey",
            backgroundColor: "#fff",
            borderRadius: "10px",
            width: "73%",
            marginBottom: "20px"
          }}
        >
          <div className="info-title">Resdex - Skilled resume database</div>
          <div className="info-content">
            <span className="info-content-tick"></span>
            <p className="info-content-text">Easily find relevant candidates from our database with smart search and filters.</p>
          </div>

          <div className="info-content">
            <span className="info-content-tick"></span>
            <p className="info-content-text">Reach over to 10.8 crore talented jobseekers.</p>
          </div>

          <div className="info-content">
            <span className="info-content-tick"></span>
            <p className="info-content-text">Find quality candidates with completely verified information</p>
          </div>

          <div className="info-content">
            <span className="info-content-tick"></span>
            <p className="info-content-text">Instantly reach candidates using customized communication via Email/Phone/SMS/Chat.</p>
          </div>

          <div className="nudge-btns">
            <button className="nudge_ctas_prim">
              BUY NOW
            </button>
            <button className="nudge_ctas_second">
              Request for a demo
            </button>
          </div>
        </div>

        <div className="p-3 info-card-2"
          style={{
            border: "1px solid grey",
            backgroundColor: "#fff",
            borderRadius: "10px",
            width: "73%",
          }}
        >
          <div className="info-title">Job posting </div>
          <div className="info-content">
            <span className="info-content-tick"></span>
            <p className="info-content-text">Post job in just 2 mins</p>
          </div>

          <div className="info-content">
            <span className="info-content-tick"></span>
            <p className="info-content-text">Reach over to 10.8 crore talented jobseekers.</p>
          </div>

          <div className="info-content">
            <span className="info-content-tick"></span>
            <p className="info-content-text">Get quality applies guaranteed with 30 days visibility of your job ads</p>
          </div>

          <div className="info-content">
            <span className="info-content-tick"></span>
            <p className="info-content-text">Contact candidates directly via call or mail</p>
          </div>

          <div className="nudge-btns">
            <button className="nudge_ctas_prim">
              For Free
            </button>
            <button className="nudge_ctas_second">
              Request for a demo
            </button>
          </div>
        </div>

        <div className="create-subusers">
          <div className="sub-sec">
            <div className="sub-head">Create Sub-Users</div>
            <div className="mt-2">
              <div className="sub-pera">You have not created sub-users yet.</div>
              <div className="sub-anchor">
                <a href="">Click Here</a>
                to create sub-users and assign them product access rights.
              </div>
            </div>
          </div>
        </div>
        
        </div>
      </div>
      <EmpLoginFooter />
    </>
  );
};

export default EmpPgAfterLogin;
