import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { fetchDeliveries, acceptOrder, forwardOrder } from '../services/deliveries';
import WarehouseNavbar from '../components/warehouseNavbar';

function ManageDeliveries() {
  const [deliveries, setDeliveries] = useState([]);

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
    <div>
      <WarehouseNavbar />
      <h2 className="heading">Manage Deliveries</h2>
      <div className="container">
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
                {deliveries.map((delivery) => (
                  <tr key={delivery.orderId}>
                    <td>{delivery.orderId}</td>
                    <td>{delivery.from}</td>
                    <td>{delivery.to}</td>
                    <td>
                      <button
                        onClick={() => handleAccept(delivery.orderId)}
                        className="btn btn-success me-2"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => handleForward(delivery.orderId)}
                        className="btn btn-primary"
                      >
                        Forward
                      </button>
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
