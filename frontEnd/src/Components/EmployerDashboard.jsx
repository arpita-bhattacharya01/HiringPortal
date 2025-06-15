import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Tabs,
  Tab,
  Badge,
  Form,
  Alert,
  Spinner,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AnalyticsDashboard from "./AnalyticsDashboard";
import ApplicationManager from "./ApplicationManager";
import { WandIcon } from "lucide-react";
import CompanyProfileinDasboard from './CompanyProfileinDasboard';
import axios from 'axios';

const EmployerDashboard = () => {
  const [key, setKey] = useState("jobs");
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);


  const [postedJobs, setPostedJobs] = useState([]);
  console.log("This is posted job", postedJobs)

  const token = localStorage.getItem("token");


  const companyName = localStorage.getItem("companyName");



  const dashboardStats = [
    { label: "Active Jobs", value: "12", color: "#0d6efd" },
    { label: "Total Applications", value: "342", color: "#198754" },
    { label: "Interviews Scheduled", value: "28", color: "#fd7e14" },
    { label: "Hires This Month", value: "7", color: "#6f42c1" },
  ];


  const [editingJobId, setEditingJobId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    openings: 0,
    hires: 0,
    salary: "",
  });


  const [validationError, setValidationError] = useState("");


  const [saving, setSaving] = useState(false);

  const handleEditClick = (job) => {
    setEditingJobId(job.id);
    setEditFormData({
      openings: job.openings,
      hires: job.hires,
      salary: job.salary,
    });
    setValidationError("");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setEditFormData((prev) => ({
      ...prev,
      [name]: name === "salary" ? value : Number(value),
    }));
  };


  useEffect(() => {
    const fetchjobs = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:3000/my-jobs', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setPostedJobs(res.data);
      } catch (error) {
        console.error("Failed to load jobs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchjobs();
  }, []);



  const validateForm = () => {
    const { openings, hires, salary } = editFormData;

    if (openings < 0 || hires < 0) {
      return "Openings and Hires cannot be negative numbers.";
    }
    if (hires > openings) {
      return "Hires cannot be greater than Openings.";
    }
    if (!salary.trim()) {
      return "Salary cannot be empty.";
    }
    return "";
  };

  const handleSave = () => {
    const errorMsg = validateForm();
    if (errorMsg) {
      setValidationError(errorMsg);
      return;
    }

    setSaving(true);
    setValidationError("");

    // Simulate save delay for UX
    setTimeout(() => {
      // Update state locally after "save"
      setPostedJobs((prevJobs) =>
        prevJobs.map((job) =>
          job.id === editingJobId
            ? {
              ...job,
              openings: editFormData.openings,
              hires: editFormData.hires,
              salary: editFormData.salary,
            }
            : job
        )
      );

      setEditingJobId(null);
      setSaving(false);
    }, 800);
  };

  const handleCancel = () => {
    setEditingJobId(null);
    setValidationError("");
  };

  return (
    <Container className="my-4">
      <Row className="mb-4">
        <Col>
          <h2>Employer Dashboard</h2>
          <p>Manage your job postings and applications</p>
        </Col>
      </Row>

      <Row className="my-5">
        <Col>
           <CompanyProfileinDasboard/>
        </Col>
      </Row>
      

      <div className="row g-4 mb-4">
        {dashboardStats.map((stat, index) => (
          <div className="col-12 col-md-3" key={index}>
            <Card>
              <Card.Body className="py-4 text-center">
                <h3 className="fw-bold fs-2 mb-2" style={{ color: stat.color }}>
                  {stat.value}
                </h3>
                <p className="text-muted">{stat.label}</p>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>

      <Tabs activeKey={key} onSelect={(k) => setKey(k)} className="mb-3">
        <Tab eventKey="jobs" title="Posted Jobs">
          <Row className="flex-column">
            {postedJobs
              .filter((job) => job.status === "Approved")
              .map((job) => (
                <Col md={4} key={job.id} className="mb-4 w-100">
                  <Card>
                    <Card.Body>
                      <Card.Title className="d-flex justify-content-between align-items-center">
                        <span>
                          <h3> {job.title}{" "}</h3>
                          <Badge
                            bg={
                              job.status === "Approved"
                                ? "success"
                                : job.status === "Rejected"
                                  ? "danger"
                                  : "secondary"
                            }
                          >
                            {job.status}
                          </Badge>
                        </span>

                        <Badge bg="warning" className="text-dark mx-4">
                          Hired {job.hires} of {job.openings}
                        </Badge>
                      </Card.Title>

                      {editingJobId === job.id ? (
                        <>
                          {validationError && (
                            <Alert variant="danger">{validationError}</Alert>
                          )}

                          <Form>
                            <Form.Group className="mb-2" controlId="formOpenings">
                              <Form.Label>Total Openings</Form.Label>
                              <Form.Control
                                type="number"
                                name="openings"
                                min={0}
                                value={editFormData.openings}
                                onChange={handleInputChange}
                                disabled={saving}
                              />
                            </Form.Group>

                            <Form.Group className="mb-2" controlId="formHires">
                              <Form.Label>Hired</Form.Label>
                              <Form.Control
                                type="number"
                                name="hires"
                                min={0}
                                max={editFormData.openings}
                                value={editFormData.hires}
                                onChange={handleInputChange}
                                disabled={saving}
                              />
                            </Form.Group>

                            <Form.Group className="mb-2" controlId="formSalary">
                              <Form.Label>Salary</Form.Label>
                              <Form.Control
                                type="text"
                                name="salary"
                                value={editFormData.salary}
                                onChange={handleInputChange}
                                disabled={saving}
                              />
                            </Form.Group>

                            <Button
                              variant="success"
                              size="sm"
                              className="me-2"
                              onClick={handleSave}
                              disabled={saving}
                            >
                              {saving ? (
                                <>
                                  <Spinner
                                    animation="border"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                  />{" "}
                                  Saving...
                                </>
                              ) : (
                                "Save"
                              )}
                            </Button>
                            <Button
                              variant="secondary"
                              size="sm"
                              onClick={handleCancel}
                              disabled={saving}
                            >
                              Cancel
                            </Button>
                          </Form>
                        </>
                      ) : (
                        <Card.Text>
                          <strong>Company Name:</strong> {companyName}
                          <br />
                          <strong>Department:</strong> {job.Department}
                          <br />
                          <strong>Location:</strong> {job.location}
                          <br />
                          <strong>Job Role:</strong> {job.jobTitle}
                          <br />
                          <strong>Applicants:</strong> {job.applicants}
                          <br />
                          <strong>Posted:</strong>{" "}
                          {new Date(job.posted).toLocaleDateString()}
                          <br />
                          <strong>Salary:</strong> {job.salary}
                          <br />
                          <strong>Views:</strong> {job.views}
                          <br />
                          <strong>Total Openings:</strong> {job.openings}
                        </Card.Text>
                      )}

                      <Button
                        variant="outline-primary"
                        size="sm"
                        className="me-2"
                      >
                        View
                      </Button>

                      {editingJobId !== job.id && (
                        <Button
                          variant="outline-secondary"
                          size="sm"
                          onClick={() => handleEditClick(job)}
                        >
                          Edit
                        </Button>
                      )}
                    </Card.Body>
                  </Card>
                </Col>
              ))}
          </Row>
        </Tab>

        <Tab eventKey="applications" title="Applications">
          <ApplicationManager />
        </Tab>

        <Tab eventKey="pending-jobs" title="Pending Jobs">
          {/* Candidates content goes here */}
          <Row className="flex-column">
            {postedJobs
              .filter((job) => job.status === "Pending")
              .map((job) => (
                <Col md={4} key={job.id} className="mb-4 w-100">
                  <Card>
                    <Card.Body>
                      <Card.Title>
                        <h3> {job.title}</h3>
                        <Badge bg="warning">{job.status}</Badge>
                      </Card.Title>
                      <Card.Text>
                        <strong>Company Name:</strong> {companyName}
                        <br />
                        <strong>Department:</strong> {job.Department}
                        <br />
                        <strong>Location:</strong> {job.location}
                        <br />
                        <strong>Job Role:</strong> {job.jobTitle}
                        <br />
                        <strong>Applicants:</strong> {job.applicants}
                        <br />
                        <strong>Posted:</strong>{" "}
                        {new Date(job.posted).toLocaleDateString()}
                        <br />
                        <strong>Salary:</strong> {job.salary}
                        <br />
                        <strong>Views:</strong> {job.views}
                        <br />
                        <strong>Total Openings:</strong> {job.openings}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
          </Row>
        </Tab>
        <Tab eventKey="rejected-job" title="Rejected Jobs">
          {/* Candidates content goes here */}
          <Row className="flex-column">
            {postedJobs
              .filter((job) => job.status === "Rejected")
              .map((job) => (
                <Col md={4} key={job.id} className="mb-4 w-100">
                  <Card>
                    <Card.Body>
                      <Card.Title>
                        <h3> {job.title}</h3>
                        <Badge bg="danger">{job.status}</Badge>
                      </Card.Title>
                      <Card.Text>
                        <strong>Company Name:</strong> {companyName}
                        <br />
                        <strong>Department:</strong> {job.Department}
                        <br />
                        <strong>Location:</strong> {job.location}
                        <br />
                        <strong>Job Role:</strong> {job.jobTitle}
                        <br />
                        <strong>Applicants:</strong> {job.applicants}
                        <br />
                        <strong>Posted:</strong>{" "}
                        {new Date(job.posted).toLocaleDateString()}
                        <br />
                        <strong>Salary:</strong> {job.salary}
                        <br />
                        <strong>Views:</strong> {job.views}
                        <br />
                        <strong>Total Openings:</strong> {job.openings}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
          </Row>
        </Tab>


        <Tab eventKey="analytics" title="Analytics">
          <AnalyticsDashboard />
        </Tab>
      </Tabs>
    </Container>
  );
};

export default EmployerDashboard;
