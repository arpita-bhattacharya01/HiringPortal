
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import './CompanyProfileinDasboard.css'
import { FaCamera } from "react-icons/fa";
import AvatarEditor from "react-avatar-editor";

import {
  Building2,
  MapPin,
  Globe,
  Users,
  Edit3,
  ExternalLink,
  Contact,
  Linkedin,
} from "lucide-react";
import { Whatsapp } from "react-bootstrap-icons"
export default function CompanyProfileinDashboard() {

  const [profilePhoto, setprofilePhoto] = useState(null)
  const [showImageModal, setshowImageModal] = useState(false)
  const navigate = useNavigate();
  const [localUserdata, setLocalUserdata] = useState([])


  const [selectedImage, setSelectedImage] = useState(null);
  const [finalImage, setFinalImage] = useState(null);
  const [zoom, setZoom] = useState(1.2);
  const editorRef = useRef(null);
  console.log("local user data", localUserdata)
  const handleEditProfile = () => {
    navigate("/CompanyProfileEdit");
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setshowImageModal(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleEditImage = () => {
    setshowImageModal(true); // or trigger file input, cropper, etc.
  };


  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      setshowImageModal(true);
    }
  };

  const handleSaveImage = () => {
    if (editorRef.current) {
      const canvas = editorRef.current.getImageScaledToCanvas().toDataURL();
      // const dataURL = canvas.toDataURL();
      setprofilePhoto(canvas);
      setshowImageModal(false);
      setFinalImage(canvas);
    }
  };


  const handleSocialClick = (url) => {
    window.open(url, "_blank");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    if (token && user) {
      try {
        const parsedUser = JSON.parse(user);
        console.log("[CompanyProfileEdit] Parsed user from localStorage:", parsedUser);
        setLocalUserdata(parsedUser);
      } catch (error) {
        console.error("[CompanyProfileEdit] Error parsing user:", error);
      }
    }
  }, []);

  return (
    <>

      <div className="card shadow-lg p-4 rounded-4 border border-light bg-light bg-opacity-75">
        <div className="d-flex justify-content-between align-items-center mb-4 flex-lg-row flex-sm-column flex-md-row flex-column">
          <div className="d-flex align-items-start gap-3 flex-column flex-sm-row">
            <div
              className="position-relative profile-image-wrapper"
              style={{
                borderRadius: "50%",
                border: "3px solid grey",
                cursor: "pointer",
              }}
              onClick={() => document.getElementById("profileUpload").click()}
            >
              <img
                src={profilePhoto || "images/default-user.png"}
                alt="Company Logo"
                className="w-100 h-100 rounded-circle  profile-image"
                style={{ objectFit: "cover", objectPosition: "center" }}
              />
              <button
                type="button"
                className="camera-icon-btn position-absolute"
                onClick={handleEditImage} // your function to open modal/upload
              ><FaCamera />
                {/* <i className="bi bi-camera-fill"></i> Bootstrap Icon */}
              </button>
              <input
                type="file"
                accept="image/*"
                id="profileUpload"
                className="d-none"
                onChange={handlePhotoChange}
              />
            </div>

            <div>
              <h2 className="h4 fw-bold text-dark mb-1">{localUserdata.companyname}</h2>
              <p className="text-primary fw-semibold mb-0">
                {localUserdata.discription}
              </p>
              <p>{localUserdata.loginEmail}</p>
            </div>
          </div>
          <button
            className="btn btn-success d-flex align-items-center"
            onClick={handleEditProfile}
          >
            <Edit3 size={16} className="me-2" /> Edit Profile
          </button>
        </div>

        <div className="row g-3 mb-4">
          <div className="col-md-3">
            <div className="d-flex align-items-center p-3 bg-white rounded border">
              <div className="bg-danger bg-opacity-10 p-2 rounded me-2">
                <MapPin size={18} className="text-danger" />
              </div>
              <span className="text-dark">{localUserdata.companyaddress}</span>
            </div>
          </div>

          <div className="col-md-3">
            <div
              className="d-flex align-items-center p-3 bg-white rounded border cursor-pointer"
              onClick={() => handleSocialClick(`${localUserdata.website}`)}
            >
              <div className="bg-primary bg-opacity-10 p-2 rounded me-2">
                <Globe size={18} className="text-primary" />
              </div>
              <span className="text-dark me-1">{localUserdata.website}</span>
              <ExternalLink size={14} className="text-muted" />
            </div>
          </div>

          <div className="col-md-3  ">
            <div className="d-flex align-items-center p-3 bg-white rounded border">
              <div className="bg-purple bg-opacity-2 p-2 rounded me-2">
                <Users size={18} className="text-purple" />
              </div>
              <span className="text-dark">{localUserdata.noOfEmployes} employees</span>
            </div>
          </div>
          <div className="col-md-3">
            <div className="d-flex align-items-center p-3 bg-white rounded border">
              <div className="bg-warning bg-opacity-10 p-2 rounded me-2 text-warning">
                <Contact size={18} className="text-purple" />
              </div>
              <div>
                <span className="m-0">{localUserdata.phone1}</span>
                <br />
                <span className="m-0">{localUserdata.phone2}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="d-flex align-items-center gap-3 mb-4">
          <span className="text-muted fw-semibold">Follow us:</span>
          <button
            className="btn border-secondary text-primary p-0"
            onClick={() =>
              handleSocialClick(`${localUserdata.linkedin}`)
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              class="bi bi-linkedin"
              viewBox="0 0 16 16"
            >
              <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z" />
            </svg>
          </button>
          <button
            className="btn border-secondary text-dark p-0"
            onClick={() => handleSocialClick(`${localUserdata.twitter}`)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className="bi bi-twitter-x"
              viewBox="0 0 16 16"
            >
              <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z" />
            </svg>
          </button>
          <button
            className="btn border-secondary p-0"
            onClick={() => handleSocialClick(`${localUserdata.website}`)}
          >
            <Globe size={22} className="text-success" />

          </button>

          <button
            className="btn border-secondary p-0"
            onClick={() => handleSocialClick(`https://wa.me/${localUserdata.phone2}`)}
          >
            <Whatsapp size={22} className="text-success" />
          </button>
        </div>

        <div className="p-4 bg-light rounded border">
          <h5 className="fw-semibold text-dark mb-2">About Us</h5>
          <p className="text-secondary mb-0">
            {/* TechCorp Inc. is a leading technology solutions provider specializing
          in enterprise software development, cloud infrastructure, and digital
          transformation services. We're committed to innovation and building
          cutting-edge solutions for our clients worldwide. */}
            {localUserdata.aboutus}
          </p>
        </div>


      </div>
      {/* 🖼️ Modal for Image Editing (outside card) */}
      {showImageModal && (
        <div
          className="modal-backdrop-custom"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
        >
          <div
            className="modal-content"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.95)",
              borderRadius: "10px",
              padding: "20px",
              maxWidth: "90vw",
              maxHeight: "90vh",
              overflowY: "hidden",
              position: "relative",
            }}
          >
            {/* ❌ Close (X) Button */}
            <button
              type="button"
              className="btn-close position-absolute top-0 end-0 m-3"
              onClick={() => { setShowImageModal(false), console.log("lqwbhkdscn") }}
              aria-label="Close"
            ></button>

            {/* 🖼️ Image Editor */}
            <div className="modal-body text-center">
              {selectedImage && (
                <AvatarEditor
                  ref={editorRef}
                  image={selectedImage}
                  width={200}
                  height={200}
                  opacity={1}
                  border={30}
                  borderRadius={100}
                  color={[255, 255, 255, 0.5]}
                  scale={zoom}
                  rotate={0}
                />
              )}
            </div>

            {/* 🔍 Zoom Slider */}
            <div className="my-2 text-center">
              <label htmlFor="zoomRange" className="form-label fw-semibold">
                Zoom
              </label>
              <input
                id="zoomRange"
                type="range"
                min="1"
                max="3"
                step="0.01"
                value={zoom}
                onChange={(e) => setZoom(parseFloat(e.target.value))}
                className="form-range"
                style={{ width: "200px", margin: "0 auto" }}
              />
            </div>

            {/* ✅ Buttons */}
            <div className="modal-footer justify-content-center">
              <button
                className="btn btn-secondary me-2"
                onClick={() => setShowImageModal(false)}
              >
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleSaveImage}>
                Save Image
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
