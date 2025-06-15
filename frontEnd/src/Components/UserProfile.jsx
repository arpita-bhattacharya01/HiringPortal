import React, { useRef, useState, useEffect } from 'react';
import AvatarEditor from 'react-avatar-editor';
import { MapPin, Mail, Phone, Edit, Camera, Briefcase } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';

const UserProfile = () => {
  const navigate = useNavigate();
  const [userdata, setuserdata] = useState({});
  const [profileImage, setProfileImage] = useState('images/default-user.png');
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  // const [scale, setScale] = useState(1);
   const [zoom, setZoom] = useState(1.2);
  const [showEditor, setShowEditor] = useState(false);
  const editorRef = useRef();

  useEffect(() => {
    const localData = localStorage.getItem('user');
    if (localData) {
      const parsed = JSON.parse(localData);
      setuserdata(parsed);
    }
  }, []);

  const handleCameraClick = () => {
    document.getElementById('profileUpload').click();
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setShowEditor(true);
    }
  };

  const handleSaveImage = async () => {
    if (editorRef.current) {
      const canvas = editorRef.current.getImageScaledToCanvas().toDataURL();
      setProfileImage(canvas); // Show preview
      setShowEditor(false);

      // Optional: upload to server
      const blob = await (await fetch(canvas)).blob();
      const formData = new FormData();
      formData.append("profilePhoto", blob, "avatar.jpg");

      setUploading(true);
      try {
        const response = await fetch("/api/upload-profile-photo", {
          method: "POST",
          body: formData,
        });
        const result = await response.json();
        if (response.ok) {
          setMessage("Profile photo uploaded successfully!");
        } else {
          setMessage("Upload failed: " + result.error);
        }
      } catch (error) {
        console.error(error);
        setMessage("Error uploading image.");
      } finally {
        setUploading(false);
      }
    }
  };

  return (
    <div className="bg-white rounded shadow-sm p-4">
      {/* Profile Section */}
      <div className="text-center mb-4 position-relative">
        <div className="d-inline-block position-relative" >
          <img
            src={profileImage}
            alt="Profile"
            className="rounded-circle mx-auto d-block mb-3"
            style={{ width: '96px', height: '96px', objectFit: 'cover', border:"3px solid #70b8e4",
    borderRadius: "50%"}}
          />
          <button
            className="btn btn-sm btn-primary position-absolute"
            style={{ bottom: '0', right: '0', borderRadius: '50%', padding: '6px' }}
            onClick={handleCameraClick}
            disabled={uploading}
          >
            <Camera size={16} />
          </button>
          <input
            type="file"
            accept="image/*"
            id="profileUpload"
            style={{ display: 'none' }}
            onChange={handlePhotoChange}
          />
        </div>
        <h5 className="mt-2 mb-1 fw-semibold text-dark">{userdata?.fullName}</h5>
        <p className="text-muted mb-1">{userdata.workStatus}</p>
        <div className="d-flex justify-content-center align-items-center text-secondary mb-3">
          <MapPin size={16} className="me-1" />
          <span>San Francisco, CA</span>
        </div>
        <button className="btn btn-primary w-100 d-flex justify-content-center align-items-center" onClick={() => navigate("/updateProfile")}>
          <Edit size={16} className="me-2" />
          Edit Profile
        </button>
        {message && <p className="text-info mt-2">{message}</p>}
      </div>

      {/* Contact Info */}
      <div className="border-top pt-3">
        <h6 className="fw-semibold text-dark mb-2">Contact Info</h6>
        <div className="text-secondary small">
          <div className="d-flex align-items-center mb-2">
            <Mail size={16} className="me-2" />
            <span>{userdata.email}</span>
          </div>
          <div className="d-flex align-items-center">
            <Phone size={16} className="me-2" />
            <span>{userdata.mobile}</span>
          </div>
        </div>
      </div>

      {/* Profile Completion */}
      <div className="border-top pt-3">
        <h6 className="fw-semibold text-dark mb-2">Profile Completion</h6>
        <div className="progress" style={{ height: '6px' }}>
          <div
            className="progress-bar bg-primary"
            role="progressbar"
            style={{ width: '85%' }}
            aria-valuenow="85"
            aria-valuemin="0"
            aria-valuemax="100"
          />
        </div>
        <p className="small text-muted mt-2 mb-0">85% complete</p>
      </div>

      {/* Skills */}
      <div className="border-top pt-3">
        <h6 className="fw-semibold text-dark mb-2">Skills</h6>
        <div className="d-flex flex-wrap gap-2">
          <span className="badge bg-primary-subtle text-primary">React</span>
          <span className="badge bg-primary-subtle text-primary">TypeScript</span>
          <span className="badge bg-primary-subtle text-primary">Node.js</span>
          <span className="badge bg-light text-muted">+5 more</span>
        </div>
      </div>

      {/* Experience */}
      <div className="border-top pt-3">
        <h6 className="fw-semibold text-dark mb-2">Experience</h6>
        <div className="d-flex align-items-center text-secondary small">
          <Briefcase size={16} className="me-2" />
          {userdata.workStatus}
        </div>
      </div>

      {/* Avatar Editor Modal */}
      <Modal show={showEditor} onHide={() => setShowEditor(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile Image</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          {selectedImage && (
            <AvatarEditor
              ref={editorRef}
              image={selectedImage}
              width={250}
              height={250}
              border={50}
              borderRadius={125}
              color={[255, 255, 255, 0.6]}
              scale={zoom}
              rotate={0}
            />
          )}

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
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditor(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleSaveImage}>Save Image</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UserProfile;




// import React, { useRef, useState , useEffect } from 'react';
// import { MapPin, Mail, Phone, Edit, Camera, Briefcase } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';

// const UserProfile = () => {
//   const navigate = useNavigate();
//   const [userdata, setuserdata] = useState([])
//   const fileInputRef = useRef(null);

//   const [message, setMessage] = useState('');
//   const [uploading, setUploading] = useState(false);

//     const [profileImage, setProfileImage] = useState('https://tse1.mm.bing.net/th/id/OIP.jQc294WED8p75DlIKBgMNAHaE8?cb=iwc2&rs=1&pid=ImgDetMain' );


//   const handleCameraClick = () => {
//     fileInputRef.current.click();
//   };

//   useEffect(() => {
//   const localData = localStorage.getItem('user');
//   if (localData) {
//     const parsed = JSON.parse(localData);
//     setuserdata(parsed); // converted to array
//   }
// }, []);

  
//    console.log(userdata)
//   const handleFileChange = async (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const previewUrl = URL.createObjectURL(file);
//       setProfileImage(previewUrl); // Preview immediately

//       // Upload to backend
//       setUploading(true);
//       setMessage('');
//       try {
//         const formData = new FormData();
//         formData.append('profilePhoto', file);

//         const response = await fetch('/api/upload-profile-photo', {
//           method: 'POST',
//           body: formData,
//         });

//         const result = await response.json();

//         if (response.ok) {
//           setMessage('Profile photo uploaded successfully!');
//           // Optionally use result.imageUrl from server
//         } else {
//           setMessage('Upload failed: ' + result.error);
//         }
//       } catch (error) {
//         console.error(error);
//         setMessage('Error uploading image.');
//       } finally {
//         setUploading(false);
//       }
//     }
//   };

//   return (
//     <div className="bg-white rounded shadow-sm p-4">
//       {/* Profile Image and Name */}
//       <div className="text-center mb-4 position-relative">
//         <div className="d-inline-block position-relative">
//           <img
//             src={profileImage}
//             alt="Profile"
//             className="rounded-circle mx-auto d-block mb-3"
//             style={{ width: '96px', height: '96px', objectFit: 'cover' }}
//           />
//           <button
//             className="btn btn-sm btn-primary position-absolute"
//             style={{
//               bottom: '0',
//               right: '0',
//               borderRadius: '50%',
//               padding: '6px'
//             }}
//             onClick={handleCameraClick}
//             disabled={uploading}
//           >
//             <Camera size={16} />
//           </button>
//           {/* Hidden file input */}
//           <input
//             type="file"
//             accept="image/*"
//             ref={fileInputRef}
//             style={{ display: 'none' }}
//             onChange={handleFileChange}
//           />
//         </div>
//         <h5 className="mt-2 mb-1 fw-semibold text-dark">{userdata?.fullName}</h5>
//         <p className="text-muted mb-1">{userdata.workStatus}</p>
//         <div className="d-flex justify-content-center align-items-center text-secondary mb-3">
//           <MapPin size={16} className="me-1" />
//           <span>San Francisco, CA</span>
//         </div>
//         <button className="btn btn-primary w-100 d-flex justify-content-center align-items-center" onClick={() => navigate("/updateProfile")}>
//           <Edit size={16} className="me-2" />
//           Edit Profile
//         </button>
//         {message && <p className="text-info mt-2">{message}</p>}
//       </div>

//       {/* Contact Info */}
//       <div className="border-top pt-3">
//         <h6 className="fw-semibold text-dark mb-2">Contact Info</h6>
//         <div className="text-secondary small">
//           <div className="d-flex align-items-center mb-2">
//             <Mail size={16} className="me-2" />
//             <span>{userdata.email}</span>
//           </div>
//           <div className="d-flex align-items-center">
//             <Phone size={16} className="me-2" />
//             <span>{userdata.mobile}</span>
//           </div>
//         </div>
//       </div>

//       {/* Profile Completion */}
//       <div className="border-top pt-3">
//         <h6 className="fw-semibold text-dark mb-2">Profile Completion</h6>
//         <div className="progress" style={{ height: '6px' }}>
//           <div
//             className="progress-bar bg-primary"
//             role="progressbar"
//             style={{ width: '85%' }}
//             aria-valuenow="85"
//             aria-valuemin="0"
//             aria-valuemax="100"
//           />
//         </div>
//         <p className="small text-muted mt-2 mb-0">85% complete</p>
//       </div>

//       {/* Skills */}
//       <div className="border-top pt-3">
//         <h6 className="fw-semibold text-dark mb-2">Skills</h6>
//         <div className="d-flex flex-wrap gap-2">
//           <span className="badge bg-primary-subtle text-primary">React</span>
//           <span className="badge bg-primary-subtle text-primary">TypeScript</span>
//           <span className="badge bg-primary-subtle text-primary">Node.js</span>
//           <span className="badge bg-light text-muted">+5 more</span>
//         </div>
//       </div>

//       {/* Experience */}
//       <div className="border-top pt-3">
//         <h6 className="fw-semibold text-dark mb-2">Experience</h6>
//         <div className="d-flex align-items-center text-secondary small">
//           <Briefcase size={16} className="me-2" />
//           {userdata.workStatus}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserProfile;
