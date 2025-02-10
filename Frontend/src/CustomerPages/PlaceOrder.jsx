import React, { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import CustomerNavbar from '../components/NavBars/customerNavbar';
import { placeOrder } from '../services/user';
import { createUrl } from '../utils';
import axios from 'axios';

const ParcelOrderForm = () => {
  const navigate = useNavigate();
  const [fromWarehouseId, setFromWarehouseId] = useState('');
  const [toWarehouseId, setToWarehouseId] = useState('');
  const [receiverName, setReceiverName] = useState('');
  const [receiverContact, setReceiverContact] = useState('');
  const [weight, setWeight] = useState('');
  const [price, setPrice] = useState(0);
  const [senderId, setSenderId] = useState('');
  const [trackingId, setTrackingId] = useState(null);
  

  const cities = [
    { name: 'Delhi', value: 3 },
    { name: 'Mumbai', value: 1 },
    { name: 'Pune', value: 5 },
    { name: 'Hyderabad', value: 4 },
    { name: 'Chennai', value: 2 }
  ];
  useEffect(() => {
    const userId = sessionStorage.getItem('userId'); // Get user ID directly as a string
    console.log("User ID from sessionStorage:", userId);
    if (userId) {
      setSenderId(userId);
    } else {
      console.error("Error: User ID missing in session storage");
    }
  }, []);
  useEffect(()=>{
    handleCalculate()
  },[weight]
  )
  

  const handleCalculate = async (e) => {
    
  
    try {
      const sourceCity = cities.find(city => city.value === Number(fromWarehouseId))?.name;
      const destinationCity = cities.find(city => city.value === Number(toWarehouseId))?.name;
  
      if ((!sourceCity || !destinationCity)&& weight) {
        alert("Please select valid source and destination cities.");
        return;
      }
  
      const url = createUrl(`price/${sourceCity}/${destinationCity}`);
      const response = await axios.get(url);
      const distance = response.data;
  
      const pricePerKm = 1.5; // Example price per km
      const pricePerKg = 5; // Example price per kg
      const calculatedPrice = (distance * pricePerKm) + (weight * pricePerKg);
      
      setPrice(calculatedPrice.toFixed(2));
    } catch (error) {
      console.error('Error fetching distance:', error);
    }
  };
  

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (!fromWarehouseId || !toWarehouseId || !receiverName || !receiverContact || !weight) {
  //     alert("Please fill all fields.");
  //     return;
  // }
  
  //   const id = sessionStorage.getItem("userId");
  //   if (!id) {
  //     alert("Error: User not logged in.");
  //     return;
  //   }
  
  //   const orderData = {
  //     senderId: id,
  //     fromWarehouseId,
  //       toWarehouseId,
  //       receiverName,
  //       contactNumber: receiverContact,
  //       weight,
  //       price,
  //       status: 'DELIVERED',
  //       orderDate: new Date().toISOString(),
  //       // trackingId: uuidv4(), //AUTO GENERATING TRACKINGiD
       
  //   };

  //   console.log("Sending order data:", orderData);

  //   try {
  //     const response = await placeOrder(orderData);
  //     console.log("API Response:", response);
  
  //     if (response.status === 'success') {
  //       setTrackingId(response.trackingId);
  //       alert(`Order placed successfully! Your tracking ID is ${response.trackingId}`);
  //       navigate(`/customer/track-order?trackingId=${response.trackingId}`);
  //     } else {
  //       alert(`Error placing order: ${response.error || 'Unknown error'}`);
  //     }
  //   } catch (error) {
  //     console.error('Error submitting order:', error);
     
  //   }

  //   console.log("Sending data:", orderData);

  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!fromWarehouseId || !toWarehouseId || !receiverName || !receiverContact || !weight) {
      alert("Please fill all fields.");
      return;
    }
    
    const id = sessionStorage.getItem("userId");
    if (!id) {
      alert("Error: User not logged in.");
      return;
    }
  
    const orderData = {
      senderId: id,
      fromWarehouseId,
      toWarehouseId,
      receiverName,
      contactNumber: receiverContact,
      weight,
      price
    };
  
    console.log("Sending order data:", orderData);
  
    try {
      const response = await placeOrder(orderData);
      console.log("API Response:", response);
  
      // Log response status
      console.log("Response Status:", response.status);
  
      if (String(response.status) == 201) {
        setTrackingId(response.data.trackingId);
        alert(`Order placed successfully! Your tracking ID is ${response.data.trackingId}`);
        navigate(`/customer/order-history`);
      } else {
        alert(`Error placing order: ${response.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error submitting order:', error);
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
              <select className="form-select" value={fromWarehouseId} onChange={(e) => setFromWarehouseId(e.target.value)}>
                <option value="">Select Source</option>
                {cities.map((city) => (
                  <option key={city.value} value={city.value}>{city.name}</option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Destination</label>
              <select className="form-select" value={toWarehouseId} onChange={(e) => setToWarehouseId(e.target.value)}>
                <option value="">Select Destination</option>
                {cities.filter(city => city.value !== fromWarehouseId).map((city) => (
                  <option key={city.value} value={city.value}>{city.name}</option>
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
              <input type="number" className="form-control" value={weight} onChange={(e) => setWeight(e.target.value)} />
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