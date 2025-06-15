import React, { useState, useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import axios from "axios";

const suggestedSkills = [
  "Front End", "Web Development", "Full Stack", "Mern Stack",
  "Mean", "Backend Development", "Typing", "Computer Science", "Mean Stack"
];

const KeySkillsComponent = ({ show, onClose, onSave, initialSkills = [] }) => {
  const [skills, setSkills] = useState([]);
  const [input, setInput] = useState("");

  // Load initial skills when modal opens or initialSkills changes
  useEffect(() => {
    setSkills(initialSkills);
  }, [initialSkills]);

  const addSkill = (skill) => {
    if (skill && !skills.includes(skill)) {
      setSkills([...skills, skill]);
    }
  };

  const removeSkill = (skillToRemove) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  const handleInputKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkill(input.trim());
      setInput("");
    }
  };

  // Called when Save button clicked
  const handleSaveClick = async () => {
    if (skills.length < 1) {
      alert("Please add at least one skill.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post("http://localhost:3000/update-key-skills",
        { keySkills: skills },
        { 
          headers: 
          { 
            Authorization: `Bearer ${token}` 
          }
        }
      );

      if (response.status === 200) {
        alert("Key skills updated successfully!");

        // Update localStorage user data too
        const user = JSON.parse(localStorage.getItem("user")) || {};
        user.keySkills = skills;
        localStorage.setItem("user", JSON.stringify(user));

        onSave && onSave(skills);
        onClose();
      }
    } catch (error) {
      console.error("Failed to update key skills:", error);
      alert("Failed to update key skills.");
    }
  };

  return (
    <Modal show={show} onHide={onClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Key skills</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="text-muted mb-3">
          Add skills that best define your expertise, for e.g. Direct Marketing, Oracle, Java, etc. (Minimum 1)
        </p>

        <div className="d-flex flex-wrap gap-2 mb-3">
          {skills.map((skill, idx) => (
            <span
              key={idx}
              className="badge bg-secondary d-flex align-items-center"
              style={{ padding: "0.5em 0.75em", fontSize: "0.9em" }}
            >
              {skill}
              <button
                onClick={() => removeSkill(skill)}
                className="btn-close btn-close-white btn-sm ms-2"
                aria-label="Remove"
              />
            </span>
          ))}
        </div>

        <Form.Control
          type="text"
          placeholder="Add skills"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleInputKeyPress}
          className="mb-3"
        />

        <p className="text-muted">Or you can select from the suggested set of skills</p>

        <div className="d-flex flex-wrap gap-2 mb-4">
          {suggestedSkills.map((skill, idx) => (
            <Button
              key={idx}
              variant="outline-secondary"
              size="sm"
              onClick={() => addSkill(skill)}
            >
              {skill} +
            </Button>
          ))}
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>Cancel</Button>
        <Button variant="primary" onClick={handleSaveClick}>Save</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default KeySkillsComponent;
