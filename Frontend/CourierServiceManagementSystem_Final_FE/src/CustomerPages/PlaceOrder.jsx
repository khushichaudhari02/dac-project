import React, { useState, useEffect } from 'react';
import CustomerNavbar from '../components/customerNavbar';
import { useNavigate } from 'react-router-dom';


const ParcelOrderForm = () => {
  const navigate = useNavigate();
  const [fromWarehouse, setFromWarehouse] = useState('');
  const [toWarehouse, setToWarehouse] = useState('');
  const [receiverName, setReceiverName] = useState('');
  const [receiverContact, setReceiverContact] = useState('');
  const [weight, setWeight] = useState('');
  const [price, setPrice] = useState(0);
  const [senderId, setSenderId] = useState('');
  const [trackingId, setTrackingId] = useState(null);

  const warehouses = [
  { id: 1, name: "Delhi" },
  { id: 2, name: "Mumbai" },
  { id: 3, name: "Pune" },
  { id: 4, name: "Hyderabad" },
  { id: 5, name: "Chennai" }
];

  useEffect(() => {
    const userData = sessionStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      console.log("User from session:", user);
      if (user && user.id) {
        setSenderId(user.id);
      } else {
        console.error("Error: User ID missing in session storage");
      }
    } else {
      console.error("Error: No user found in session storage");
    }
  }, []);
  


  const handleWeightChange = (e) => {
    const weightValue = e.target.value;
    setWeight(weightValue);
    setPrice(weightValue * 100);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const orderData = {
      senderId: senderId,
      fromWarehouse,
        toWarehouse,
        receiverName,
        contactNumber: receiverContact,
        weight,
        price,
        status: 'PLACED',
        orderDate: new Date().toISOString(),
    };

    try {
        const response = await fetch("http://localhost:8080/customer/place-order", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(orderData),
        });

        const result = await response.json().catch(() => null);
if (response.ok && result) {
    setTrackingId(result.trackingId);
    alert(`Order placed successfully! Your tracking ID is ${result.trackingId}`);
    navigate(`/customer/track-order?trackingId=${result.trackingId}`);
} else {
    alert(`Error placing order: ${result?.message || "Unknown error"}`);
}

    } catch (error) {
        console.error('Error submitting order:', error);
        alert('Error placing order. Please try again.');
    }

    console.log("Sending data:", orderData);

  };

  return (
    <div>
      <CustomerNavbar/>
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h2 className="text-center">Place Parcel Order</h2>
          <form onSubmit={handleSubmit}>
            <input type="hidden" name="senderId" value={senderId} />

            <div className="mb-3">
              <label className="form-label">Source</label>
              <select className="form-select" value={fromWarehouse} onChange={(e) => setFromWarehouse(e.target.value)}>
                <option value="">Select Source</option>
                {cities.map((city, index) => (
                  <option key={index} value={city}>{city}</option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Destination</label>
              <select className="form-select" value={toWarehouse} onChange={(e) => setToWarehouse(e.target.value)}>
                <option value="">Select Destination</option>
                {cities.filter(city => city !== fromWarehouse).map((city, index) => (
                  <option key={index} value={city}>{city}</option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Receiver's Name</label>
              <input type="text" className="form-control" value={receiverName} onChange={(e) => setReceiverName(e.target.value)} />
            </div>

            <div className="mb-3">
              <label className="form-label">Receiver's Contact Number</label>
              <input type="text" className="form-control" value={receiverContact} onChange={(e) => setReceiverContact(e.target.value)} />
            </div>

            <div className="mb-3">
              <label className="form-label">Weight (kg)</label>
              <input type="number" className="form-control" value={weight} onChange={handleWeightChange} />
            </div>

            <div className="mb-3">
              <label className="form-label">Price (₹)</label>
              <input type="text" className="form-control" value={price} readOnly />
            </div>

            <button type="submit" className="btn btn-primary w-100">Place Order</button>
          </form>

          {trackingId && (
              <div className="alert alert-success mt-3">
                Order placed successfully! Your tracking ID is: <strong>{trackingId}</strong>
              </div>
            )}

        </div>
      </div>
    </div>
    </div>
  );
};

export default ParcelOrderForm;
