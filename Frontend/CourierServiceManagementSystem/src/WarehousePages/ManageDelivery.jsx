import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { fetchDeliveries, acceptOrder, forwardOrder } from '../services/deliveries';
import WarehouseNavbar from '../components/warehouseNavbar';

function ManageDeliveries() {
  const [deliveries, setDeliveries] = useState([]);
  const [selectedTab, setSelectedTab] = useState('arrival');

  useEffect(() => {
    const getDeliveries = async () => {
      const result = await fetchDeliveries();
      if (result.status === 'success') {
        setDeliveries(result.data);
      } else {
        toast.error(result.error);
      }
    };
    getDeliveries();
  }, []);

  const handleAccept = async (orderId) => {
    const result = await acceptOrder(orderId);
    if (result.status === 'success') {
      toast.success('Order accepted');
      // Update the deliveries state
      setDeliveries((prevState) =>
        prevState.filter((delivery) => delivery.orderId !== orderId)
      );
    } else {
      toast.error(result.error);
    }
  };

  const handleForward = async (orderId) => {
    const result = await forwardOrder(orderId);
    if (result.status === 'success') {
      toast.success('Order forwarded');
      // Update the deliveries state
      setDeliveries((prevState) =>
        prevState.filter((delivery) => delivery.orderId !== orderId)
      );
    } else {
      toast.error(result.error);
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <WarehouseNavbar />
      <div className="container flex-grow-1">
      <h2 className="heading">Manage Deliveries</h2>
      {/* <div className="container flex-grow-1"> */}

      <div className="mb-3">
          <select 
            className="form-select w-25" 
            value={selectedTab} 
            onChange={(e) => setSelectedTab(e.target.value)}
          >
            <option value="arrival">Arrival</option>
            <option value="departure">Departure</option>
          </select>
        </div>

        <div className="row">
          <div className="col">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>From</th>
                  <th>To</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {deliveries
                  .filter((delivery) => 
                    selectedTab === 'arrival' ? delivery.status === 'pending' : delivery.status === 'accepted'
                  )
                  .map((delivery) => (
                    <tr key={delivery.orderId}>
                      <td>{delivery.orderId}</td>
                      <td>{delivery.from}</td>
                      <td>{delivery.to}</td>
                      <td>
                        {selectedTab === 'arrival' ? (
                          <button
                            onClick={() => handleAccept(delivery.orderId)}
                            className="btn btn-success"
                          >
                            Accept
                          </button>
                        ) : (
                          <button
                            onClick={() => handleForward(delivery.orderId)}
                            className="btn btn-primary"
                          >
                            Forward
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
    </div>
  );
}

export default ManageDeliveries;
