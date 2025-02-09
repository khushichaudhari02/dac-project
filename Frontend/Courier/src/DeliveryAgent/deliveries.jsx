import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DeliveryAgentNavbar from '../components/DeliveryAgentNavbar';
import { createUrl } from '../utils';

function DeliveryDashboard() {
  const [orders, setOrders] = useState([]);

  const onLoad = async () => {
    const id = sessionStorage.getItem("userId");
    const url = createUrl(`delivery/deliveries/${id}`);
    const token = sessionStorage['token']; 
    const result = (await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })).data;
    setOrders(result);
  };

  useEffect(() => {
    onLoad();
  }, []);

  const handleDeliver = async (orderId) => {
    const url = createUrl(`update-status/${orderId}`);
    const token = sessionStorage['token'];
    await axios.put(url, { status: 'Delivered' }, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    // Refresh the orders list to reflect the updated status
    onLoad();
  };

  return (
    <div>
      <DeliveryAgentNavbar />
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
            {orders.map((order) => (
              <tr key={order.trackingId}>
                <td>{order.senderId.firstName}</td>
                <td>{order.receiverName}</td>
                <td>{order.contactNumber}</td>
                <td>{order.toWarehouse.location.city}</td>
                <td>
                  <button
                    className="btn btn-success"
                    onClick={() => handleDeliver(order.id)}
                  >Deliver</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DeliveryDashboard;
