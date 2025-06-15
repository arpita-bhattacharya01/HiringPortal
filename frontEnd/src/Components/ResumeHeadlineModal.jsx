import React, { useState } from "react";
import './ResumeHeadlineModal.css'
import axios from "axios";

const ResumeHeadlineModal = ({ initialHeadline, onSave, onClose }) => {
  const [headline, setHeadline] = useState(initialHeadline || "");

  const handleSave = async () => {
    // console.log("Handle Saved Click")
    try {
      const token = localStorage.getItem('token');

      // console.log(token)

      if (headline.trim().split(" ").length >= 5) {
        const payload = {
          heading: headline.trim(),
        };
        // console.log(payload)

        const response = await axios.post('http://localhost:3000/update-resume-headline', payload, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          alert('Profile updated successfully!');
          const userData = JSON.parse(localStorage.getItem('user'));
          userData.heading = headline;
          localStorage.setItem('user', JSON.stringify(userData));
          if (onSave) onSave(headline); 
          onClose();
        }

      } else {
        alert("Headline must be at least 5 words.");
      }
    } catch (error) {
      console.error('Failed to update profile:', error);
      alert('Update failed. Try again.');
    }
  };
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Resume headline</h2>
        <p>It is the first thing recruiters notice in your profile. Write a concise headline introducing yourself to employers. (Minimum 5 words)</p>
        <textarea
          rows="3"
          value={headline}
          onChange={(e) => setHeadline(e.target.value)}
          placeholder="Type your headline here..."
        />
        <div className="modal-actions">
          <button className="cancel-btn" onClick={onClose}>Cancel</button>
          <button className="save-btn" onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default ResumeHeadlineModal;
