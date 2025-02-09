import React, { useState, useEffect } from 'react';
import CustomerNavbar from '../components/NavBars/customerNavbar';
import axios from 'axios';
import { createUrl } from '../utils';

const ParcelOrderForm = () => {
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [receiverName, setReceiverName] = useState('');
  const [receiverContact, setReceiverContact] = useState('');
  const [weight, setWeight] = useState('');
  const [price, setPrice] = useState(0);
  const [senderId, setSenderId] = useState('');

  const cities = ['Delhi', 'Mumbai', 'Pune', 'Hyderabad', 'Chennai'];

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem('user'));
    if (user) {
      setSenderId(user.id);
    }
  }, []);

  const handleWeightChange = async (e) => {
    const weightValue = e.target.value;
    setWeight(weightValue);
    const url = createUrl(`price/${source}/${destination}`);
    const token = sessionStorage['token']; // Retrieve the token from sessionStorage
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    const distance = response.data;
    const pricePerKm = 5; // Example price per km
    const pricePerKg = 10; // Example price per kg
    const calculatedPrice = (distance * pricePerKm) + (weight * pricePerKg);
    setPrice(calculatedPrice.toFixed(2));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      senderId,
      source,
      destination,
      receiverName,
      receiverContact,
      weight,
      price
    });
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
              <select className="form-select" value={source} onChange={(e) => setSource(e.target.value)}>
                <option value="">Select Source</option>
                {cities.map((city, index) => (
                  <option key={index} value={city}>{city}</option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Destination</label>
              <select className="form-select" value={destination} onChange={(e) => setDestination(e.target.value)}>
                <option value="">Select Destination</option>
                {cities.filter(city => city !== source).map((city, index) => (
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
        </div>
      </div>
    </div>
    </div>
  );
};

export default ParcelOrderForm;
