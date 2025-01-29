import React from 'react';
import WarehouseTable from './AdminPages/AllWareHouses';
import 'bootstrap/dist/css/bootstrap.min.css';
import OrderTable from './AdminPages/AllOrders';
import ParcelOrderForm from './CustomerPages/PlaceOrder';
import TrackingPage from './Tracking/track';
import PricingPage from './Pricing/pricing';
import DeliveryDashboard from './DeliveryAgent/deliveries';
import DeliveryHistory from './DeliveryAgent/history';


const App = () => {
  return (
    <div>
      <h1>Warehouse Management</h1>
      <DeliveryHistory />
    </div>
  );
};

export default App;
