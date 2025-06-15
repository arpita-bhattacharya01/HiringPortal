import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

const OnlineProfileComponent = ({ onClose, onSave, show }) => {
  const [profileName, setProfileName] = useState("");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");

  const handleSave = () => {
    const profileData = { profileName, url, description };
    onSave(profileData);
    setProfileName("");
    setUrl("");
    setDescription("");
  };

  return (
    <Modal show={show} onHide={onClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Online profiles</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="text-muted mb-4">
          Add link to online professional profiles (e.g. LinkedIn, etc.)
        </p>

        <Form.Group className="mb-3">
          <Form.Label>Social profile<span className="text-danger">*</span></Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Social Profile Name"
            value={profileName}
            onChange={(e) => setProfileName(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>URL<span className="text-danger">*</span></Form.Label>
          <Form.Control
            type="url"
            placeholder="Enter Social Profile URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="Type here..."
            rows={3}
            maxLength={500}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="text-muted text-end">{500 - description.length} character(s) left</div>
        </Form.Group>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>Cancel</Button>
        <Button variant="primary" onClick={handleSave}>Save</Button>
      </Modal.Footer>
    </Modal>
  );
};
export default OnlineProfileComponent;
