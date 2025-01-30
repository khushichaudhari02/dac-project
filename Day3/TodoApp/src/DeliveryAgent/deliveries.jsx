import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DeliveryAgentNavbar from '../components/DeliveryAgentNavbar';
function DeliveryDashboard() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch orders from backend
    axios.get('https://example.com/api/orders')
      .then(response => {
        setOrders(response.data);
      })
      .catch(error => {
        console.error('Error fetching orders:', error);
      });
  }, []);

  const markAsDelivered = (orderId) => {
    axios.post(`https://example.com/api/orders/${orderId}/deliver`)
      .then(response => {
        if (response.data.success) {
          alert('Order delivered successfully!');
          // Optionally, refresh orders from backend
          setOrders(prevOrders => prevOrders.filter(order => order.id !== orderId));
        } else {
          alert('Failed to deliver order');
        }
      })
      .catch(error => {
        console.error('Error updating order:', error);
        alert('An error occurred');
      });
  };

  return (
    <div>
      <DeliveryAgentNavbar/>
    <div className="container">
      <h2 className="my-4">Orders Assigned to Delivery Agent</h2>
      <table className="table table-bordered table-hover">
        <thead className="thead-light">
          <tr>
            <th>Sender Name</th>
            <th>Receiver Name</th>
            <th>Receiver Contact Number</th>
            <th>Receiver Address</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td>{order.senderName}</td>
              <td>{order.receiverName}</td>
              <td>{order.receiverContactNumber}</td>
              <td>{order.receiverAddress}</td>
              <td><button className="btn btn-success" onClick={() => markAsDelivered(order.id)}>Deliver</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
}

export default DeliveryDashboard;
