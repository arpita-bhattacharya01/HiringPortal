import React, { useState } from 'react';
import { Form, Button, Modal, Row, Col } from 'react-bootstrap';
import axios from 'axios'

const PersonalDetailsForm = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({
    gender: 'Male',
    maritalStatus: 'Single/unmarried',
    dob: { day: '19', month: 'Apr', year: '2002' },
    category: 'OBC - Non creamy',
    differentlyAbled: 'No',
    careerBreak: 'No',
    workPermitUSA: '',
    workPermitOther: [],
    address: 'Sadabad Gate Hathras, Near Roadways Bus Stand',
    hometown: 'Hathras',
    pincode: '204101',
    languages: [
      { language: 'English', proficiency: 'Proficient', read: true, write: true, speak: true },
      { language: 'Hindi', proficiency: 'Expert', read: true, write: true, speak: true }
    ]
  });

  const handleLanguageChange = (index, field, value) => {
    const newLanguages = [...formData.languages];
    newLanguages[index][field] = value;
    setFormData({ ...formData, languages: newLanguages });
  };

  const handlesubmit = async () => {
    try {
      const token = localStorage.getItem("token")
      const response = await axios.post('http://localhost:3000/personal-data',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      if (response.status == 200) {
        alert("Personal data added successfully!");
        onSave(formData)
        onClose();
      }
      else {
        alert("Failed to add Personal data.");
      }
    } catch (error) {
      console.error("Error saving personal data:", error);
      alert("Something went wrong while submitting personal data.");
    }
  }

  return (
    <>

      <Modal show onHide={onClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Personal Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Gender</Form.Label>
              <div>
                {['Male', 'Female', 'Transgender'].map((g) => (
                  <Form.Check
                    key={g}
                    inline
                    type="radio"
                    label={g}
                    name="gender"
                    checked={formData.gender === g}
                    onChange={() => setFormData({ ...formData, gender: g })}
                  />
                ))}
              </div>
            </Form.Group>

            <Form.Group>
              <Form.Label>Marital Status</Form.Label>
              <Form.Control
                as="select"
                value={formData.maritalStatus}
                onChange={(e) => setFormData({ ...formData, maritalStatus: e.target.value })}
              >
                {['Single/unmarried', 'Married', 'Widowed', 'Divorced', 'Separated', 'Other'].map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label>Date of Birth</Form.Label>
              <Row>
                <Col>
                  <Form.Control
                    as="select"
                    value={formData.dob.day}
                    onChange={(e) => setFormData({ ...formData, dob: { ...formData.dob, day: e.target.value } })}
                  >
                    {[...Array(31)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>{i + 1}</option>
                    ))}
                  </Form.Control>
                </Col>
                <Col>
                  <Form.Control
                    as="select"
                    value={formData.dob.month}
                    onChange={(e) => setFormData({ ...formData, dob: { ...formData.dob, month: e.target.value } })}
                  >
                    {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map((m) => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </Form.Control>
                </Col>
                <Col>
                  <Form.Control
                    as="select"
                    value={formData.dob.year}
                    onChange={(e) => setFormData({ ...formData, dob: { ...formData.dob, year: e.target.value } })}
                  >
                    {[...Array(50)].map((_, i) => {
                      const year = 2005 - i;
                      return <option key={year} value={year}>{year}</option>;
                    })}
                  </Form.Control>
                </Col>
              </Row>
            </Form.Group>

            <Form.Group>
              <Form.Label>Category</Form.Label>
              <Form.Control
                as="select"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                {['General', 'Scheduled Caste (SC)', 'Scheduled Tribe (ST)', 'OBC - Creamy', 'OBC - Non creamy', 'Other'].map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label>Are you differently abled?</Form.Label>
              <div>
                {['Yes', 'No'].map((d) => (
                  <Form.Check
                    key={d}
                    inline
                    type="radio"
                    label={d}
                    name="differentlyAbled"
                    checked={formData.differentlyAbled === d}
                    onChange={() => setFormData({ ...formData, differentlyAbled: d })}
                  />
                ))}
              </div>
            </Form.Group>

            <Form.Group>
              <Form.Label>Have you taken a career break?</Form.Label>
              <div>
                {['Yes', 'No'].map((b) => (
                  <Form.Check
                    key={b}
                    inline
                    type="radio"
                    label={b}
                    name="careerBreak"
                    checked={formData.careerBreak === b}
                    onChange={() => setFormData({ ...formData, careerBreak: b })}
                  />
                ))}
              </div>
            </Form.Group>

            <Form.Group>
              <Form.Label>Permanent Address</Form.Label>
              <Form.Control
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              />
            </Form.Group>

            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Hometown</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.hometown}
                    onChange={(e) => setFormData({ ...formData, hometown: e.target.value })}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Pincode</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.pincode}
                    onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                  />
                </Form.Group>
              </Col>
            </Row>

            <hr />
            <h5>Language Proficiency</h5>
            {formData.languages.map((lang, index) => (
              <div key={index} className="mb-3">
                <Row>
                  <Col>
                    <Form.Label>Language</Form.Label>
                    <Form.Control
                      type="text"
                      value={lang.language}
                      onChange={(e) => handleLanguageChange(index, 'language', e.target.value)}
                    />
                  </Col>
                  <Col>
                    <Form.Label>Proficiency</Form.Label>
                    <Form.Control
                      as="select"
                      value={lang.proficiency}
                      onChange={(e) => handleLanguageChange(index, 'proficiency', e.target.value)}
                    >
                      {['Beginner', 'Proficient', 'Expert'].map((level) => (
                        <option key={level} value={level}>{level}</option>
                      ))}
                    </Form.Control>
                  </Col>
                </Row>
                <Form.Check
                  inline
                  label="Read"
                  type="checkbox"
                  checked={lang.read}
                  onChange={() => handleLanguageChange(index, 'read', !lang.read)}
                />
                <Form.Check
                  inline
                  label="Write"
                  type="checkbox"
                  checked={lang.write}
                  onChange={() => handleLanguageChange(index, 'write', !lang.write)}
                />
                <Form.Check
                  inline
                  label="Speak"
                  type="checkbox"
                  checked={lang.speak}
                  onChange={() => handleLanguageChange(index, 'speak', !lang.speak)}
                />
              </div>
            ))}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button variant="primary" onClick={handlesubmit}>Save</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PersonalDetailsForm;
