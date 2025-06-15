// FeedbackModal.jsx
import React from "react";
import "./FeedbackModal.css"; 

function FeedbackModal({ onSave, onClose }) {
  return (
    <div className="feedback-backdrop">
      <div className="feedback-modal rounded">
        <div className="modal-header">
          <h4>Give feedback</h4>
          <button onClick={onClose} className="close-btn">&times;</button>
        </div>

        <p className="subtext">Help us improve your Naukri experience</p>

        <div className="form-group">
          <label>Feedback type</label>
          <select className="form-control">
            <option>Please select</option>
            <option>Feature Suggestion</option>
            <option>Bug Report</option>
            <option>Design Feedback</option>
          </select>
        </div>

        <div className="form-group">
          <label>Suggestions</label>
          <textarea
            className="form-control"
            rows="4"
            placeholder="What do you like and dislike?"
          ></textarea>
        </div>

        <div className="form-group checkbox-group">
          <input type="checkbox" id="contactMe" />
          <label htmlFor="contactMe">Naukri can contact me for this feedback</label>
        </div>

        <div className="form-actions">
          <button onClick={onSave} className="btn btn-primary">Submit</button>
          <button className="btn btn-link" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default FeedbackModal;
