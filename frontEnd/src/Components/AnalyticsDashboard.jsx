import React from "react";
import { Card, Row, Col, Container } from "react-bootstrap";
import {
  TrendingUp,
  Users,
  Eye,
  FileText,
  Calendar,
  Target,
} from "lucide-react";
// import "./AnalyticsDashboard.css";

const AnalyticsDashboard = () => {
  const metrics = [
    {
      title: "Total Views",
      value: "15,240",
      change: "+12%",
      icon: Eye,
      color: "text-primary",
    },
    {
      title: "Applications",
      value: "342",
      change: "+8%",
      icon: FileText,
      color: "text-success",
    },
    {
      title: "Profile Views",
      value: "1,289",
      change: "+15%",
      icon: Users,
      color: "text-info",
    },
    {
      title: "Interviews",
      value: "28",
      change: "+5%",
      icon: Calendar,
      color: "text-warning",
    },
  ];

  const jobPerformance = [
    { title: "Senior Software Engineer", applications: 89, views: 1250 },
    { title: "Product Manager", applications: 156, views: 2100 },
    { title: "UI/UX Designer", applications: 67, views: 890 },
    { title: "Data Scientist", applications: 201, views: 1800 },
    { title: "DevOps Engineer", applications: 124, views: 1450 },
  ];

  const applicationTrends = [
    { period: "This Week", applications: 45, interviews: 8 },
    { period: "Last Week", applications: 38, interviews: 6 },
    { period: "2 Weeks Ago", applications: 52, interviews: 12 },
    { period: "3 Weeks Ago", applications: 41, interviews: 7 },
  ];

  return (
    <Container fluid className="py-4">
      {/* Key Metrics */}
      <Row className="mb-4">
        {metrics.map((metric, index) => (
          <Col key={index} xs={12} md={6} lg={3} className="mb-3">
            <Card className="h-100 shadow-sm">
              <Card.Body className="d-flex justify-content-between align-items-center">
                <div>
                  <p className="text-muted small mb-1">{metric.title}</p>
                  <h4 className="fw-bold mb-1">{metric.value}</h4>
                  <p className="small text-success">{metric.change} from last month</p>
                </div>
                <div className={`p-2 rounded bg-light ${metric.color}`}>
                  <metric.icon size={24} />
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Job Performance */}
      <Card className="mb-4 shadow-sm">
        <Card.Header className="fw-bold d-flex align-items-center gap-2">
          <Target size={18} />
          Job Performance
        </Card.Header>
        <Card.Body>
          {jobPerformance.map((job, index) => {
            const rate = ((job.applications / job.views) * 100).toFixed(1);
            return (
              <div key={index} className="p-3 border rounded mb-3 d-flex align-items-center justify-content-between flex-wrap">
                <div className="mb-2">
                  <h6 className="fw-semibold mb-1">{job.title}</h6>
                  <div className="text-muted small d-flex gap-3">
                    <span>{job.applications} applications</span>
                    <span>{job.views} views</span>
                    <span>Application rate: {rate}%</span>
                  </div>
                </div>
                <div className="progress w-25" style={{ height: "6px" }}>
                  <div
                    className="progress-bar bg-primary"
                    style={{ width: `${rate}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </Card.Body>
      </Card>

      {/* Application Trends and Quick Stats */}
      <Row>
        <Col lg={6}>
          <Card className="mb-4 shadow-sm">
            <Card.Header className="fw-bold d-flex align-items-center gap-2">
              <TrendingUp size={18} />
              Application Trends
            </Card.Header>
            <Card.Body>
              {applicationTrends.map((trend, index) => (
                <div
                  key={index}
                  className="d-flex justify-content-between align-items-center py-2 border-bottom"
                >
                  <span className="text-muted small">{trend.period}</span>
                  <div className="d-flex gap-3 small">
                    <span className="fw-medium">{trend.applications} apps</span>
                    <span className="text-primary">{trend.interviews} interviews</span>
                  </div>
                </div>
              ))}
            </Card.Body>
          </Card>
        </Col>
        <Col lg={6}>
          <Card className="mb-4 shadow-sm">
            <Card.Header className="fw-bold">Quick Stats</Card.Header>
            <Card.Body>
              <div className="d-flex justify-content-between py-2">
                <span className="text-muted small">Average time to hire</span>
                <span className="fw-semibold">18 days</span>
              </div>
              <div className="d-flex justify-content-between py-2">
                <span className="text-muted small">Top skill requirement</span>
                <span className="fw-semibold">React</span>
              </div>
              <div className="d-flex justify-content-between py-2">
                <span className="text-muted small">Most popular location</span>
                <span className="fw-semibold">Bangalore</span>
              </div>
              <div className="d-flex justify-content-between py-2">
                <span className="text-muted small">Interview success rate</span>
                <span className="fw-semibold text-success">67%</span>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AnalyticsDashboard;
