import React, { useState } from 'react';
import axios from 'axios';

const PricingPage = () => {
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [weight, setWeight] = useState('');
  const [price, setPrice] = useState('');

  const cities = ['Delhi', 'Mumbai', 'Pune', 'Hyderabad', 'Chennai'];

  const handleCalculate = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('http://localhost:8080/pricing/calculate', 
        new URLSearchParams({ source, destination, weight }).toString(),
        {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }
      );

      setPrice(response.data.price.toFixed(2));
    } catch (error) {
      console.error('Error calculating price:', error.response ? error.response.data : error.message);
    }
  };
  

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="text-center">Check Pricing Details</h2>
          <form onSubmit={handleCalculate}>
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
              <label className="form-label">Weight (kg)</label>
              <input type="number" className="form-control" value={weight} onChange={(e) => setWeight(e.target.value)} />
            </div>

            <div className="mt-4">
              <label className="form-label">Estimated Price (₹)</label>
              <input type="text" className="form-control" value={price} readOnly />
            </div>

           
            <button type="submit" className="btn btn-primary w-100 mt-4">Calculate Price</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
