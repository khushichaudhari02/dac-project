import React, { useEffect, useState } from 'react';
import axios from 'axios';

function DeliveryHistory() {
  const [deliveries, setDeliveries] = useState([]);

  useEffect(() => {
    // Fetch delivery history from backend
    axios.get('https://example.com/api/deliveries')
      .then(response => {
        setDeliveries(response.data);
      })
      .catch(error => {
        console.error('Error fetching deliveries:', error);
      });
  }, []);

  return (
    <div className="container">
      <h2 className="my-4">Delivery History</h2>
      <table className="table table-bordered table-hover">
        <thead className="thead-light">
          <tr>
            <th>Sender Name</th>
            <th>Receiver Name</th>
            <th>Receiver Contact Number</th>
            <th>Receiver Address</th>
          </tr>
        </thead>
        <tbody>
          {deliveries.map(delivery => (
            <tr key={delivery.id}>
              <td>{delivery.senderName}</td>
              <td>{delivery.receiverName}</td>
              <td>{delivery.receiverContactNumber}</td>
              <td>{delivery.receiverAddress}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DeliveryHistory;
