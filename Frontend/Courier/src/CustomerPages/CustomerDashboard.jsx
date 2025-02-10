import React from "react";
import CustomerNavbar from "../components/NavBars/customerNavbar";
import { Container, Row, Col } from 'react-bootstrap';
import customer_dashboard from"../assets/image/customer_dashboard.png";

const CustomerDashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <CustomerNavbar />

      <Container className="my-5">
        <Row className="justify-content-center">
          <Col md={8} className="text-center">
            <img 
              src={customer_dashboard} 
              alt="Courier Delivery" 
              className="img-fluid"
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CustomerDashboard;
