import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Container } from 'react-bootstrap';
import AdminNavbar from '../components/AdminNavbar';

const AllOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch the data from the API when the component mounts
    axios.get('YOUR_API_ENDPOINT')
      .then(response => {
        setOrders(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
      });
  }, []);

  const handleViewDetails = (orderId) => {
    console.log(`View details for order ID ${orderId}`);
    // Add your logic to fire a request to the backend with the order ID
  };

  return (
    <div>
      <AdminNavbar/>
    <Container className="mt-4">
      <Table bordered hover className="text-center">
        <thead className="thead-dark">
          <tr>
            <th>Order ID</th>
            <th>Tracking ID</th>
            <th>Order Date</th>
            <th>Delivery Date</th>
            <th>Source</th>
            <th>Destination</th>
            <th>Weight</th>
            <th>Price</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.orderId}>
              <td>{order.orderId}</td>
              <td>{order.trackingId}</td>
              <td>{order.orderDate}</td>
              <td>{order.deliveryDate}</td>
              <td>{order.source}</td>
              <td>{order.destination}</td>
              <td>{order.weight}</td>
              <td>{order.price}</td>
              <td>{order.status}</td>
              <td>
                <Button variant="info" onClick={() => handleViewDetails(order.orderId)}>Details</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
    </div>
  );
};

export default AllOrders;
