import Navbar from '../components/NavBars/Navbar';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
// import { useNavigate } from 'react-router-dom'
import bgImg from '../assets/image/bgImg.png';
import Login from './Login'

function Home() {
  const [items, setItems] = useState([]);
  const [trackingId, setTrackingId] = useState('');
  const [trackingData, setTrackingData] = useState(null);

  const onLoadItems = async () => {
    try {
      const response = await fetch('https://api.example.com/items'); // Replace with actual API
      const result = await response.json();

      if (result.status === 'success') {
        setItems(result.data);
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      console.error("Error fetching items:", error);
      toast.error("Failed to load items.");
    }
  };

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

  useEffect(() => {
    console.log('component is mounted...');
    onLoadItems();

    return () => {
      console.log('component is unmounted...');
    };
  }, []);

  return (
    <div className="dashboard-container">
      <Navbar />

      <div className="hero-section">
        <div className="hero-content">
          <h1>Fast & Reliable Courier Service</h1>
          <p>Track your shipments, manage deliveries, and experience seamless courier management.</p>

          {/* Tracking Form */}
          <div className="form-container">
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
      </div>

      <div className="container dashboard-content">
        {items.map((item, index) => (
          <button
            key={index}
            onClick={Login}
            className="btn btn-success btn-sm"
          >
            DASHBOARD
          </button>
        ))}
      </div>

      {/* Display tracking information if available */}
      {trackingData && (
        <div className="container mt-4">
          <table className="table table-striped table-bordered">
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
      )}
      

      <style>
      {`
            .dashboard-container {
            background-image: url(${bgImg});
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            min-height: 100vh;
            width: 100%;
            display: flex;
            flex-direction: column;
          }

          .dashboard-content {
            flex: 1;
            display: flex;
            justify-content: center;
            align-items: center;
            color: white;
            text-align: center;      
          }

          .heading {
            font-size: 3rem;
            font-weight: bold;
          }

          .hero-section {
            display: flex;
            justify-content: left;
            align-items: right;
            flex-direction: column;
            padding: 100px;
            background: rgba(0, 0, 0, 0.5);
            // border-radius: 10px;
            width: 100%;
          }

          .hero-content {
          align-items: right;
           flex: 1;
           color: white;
           max-width: 500px;
           text-align: center;
           position: relative;
           z-index: 2;
           padding: 20px;
           margin-left: auto;
           margin-top: auto;
           }


          .hero-content h1 {
            font-size: 3rem;
            font-weight: bold;
            // margin-top: 10px;
            align-items: right;
          }

          .hero-content p {
            font-size: 1.2rem;
            margin: 15px 0;
          }

          .form-container {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          margin-top: 20px;
          }

    //       .form-control {
    //   width: 300px;
    //   margin-right: 10px;
    // }

    // .btn-primary {
    //   padding: 10px 20px;
    // }

          .cta-btn {
            background-color: #ff9800;
            color: white;
            padding: 10px 20px;
            border: none;
            cursor: pointer;
            font-size: 1rem;
            border-radius: 5px;
          }

          // .hero-image img {
          //   max-width: 100%;
          //   height: auto;
          //   margin-top: 20px;
          // }
        `}
      </style>
    </div>
  );
}

export default Home;
                                                                                                                                                                                                                                                                                                                                                                                                                                                         