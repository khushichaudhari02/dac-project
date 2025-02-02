import React, { useState } from 'react';
// import { getCourierByTracking } from "../services/courierService";
// import MapComponent from "../components/MapComponent";

const TrackingPage = () => {
  const [trackingId, setTrackingId] = useState('');
  const [trackingData, setTrackingData] = useState(null);

  const handleTrack = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://your-backend-api.com/track?trackingId=${trackingId}`);
      const data = await response.json();
      setTrackingData(data);
    } catch (error) {
      console.error('Error fetching tracking data:', error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form onSubmit={handleTrack} className="d-flex">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Tracking ID"
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value)}
            />
            <button type="submit" className="btn btn-primary ms-2">Track</button>
          </form>
        </div>
      </div>
      {trackingData && (
        <div className="row justify-content-center mt-4">
          <div className="col-md-8">
            <table className="table table-striped table-bordered table-hover">
              <thead>
                <tr>
                  <th>Source</th>
                  <th>Destination</th>
                  <th>Arrived Date</th>
                  <th>Dispatched Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{trackingData.source}</td>
                  <td>{trackingData.destination}</td>
                  <td>{trackingData.arrivedDate}</td>
                  <td>{trackingData.dispatchedDate}</td>
                  <td>{trackingData.status}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrackingPage;
