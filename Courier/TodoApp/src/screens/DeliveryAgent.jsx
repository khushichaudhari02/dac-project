import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchDeliveryAgents } from '../services/user';
import WarehouseNavbar from '../components/warehouseNavbar';

function DeliveryAgents() {
  const [agents, setAgents] = useState([]);

  useEffect(() => {
    const getAgents = async () => {
      const result = await fetchDeliveryAgents();
      if (result.status === 'success') {
        setAgents(result.data);
      } else {
        console.error(result.error);
      }
    };
    getAgents();
  }, []);

  return (
    <div>
      <WarehouseNavbar />
      <h2 className="heading">Delivery Agents</h2>
      <div className="container">
      <div className="row">
          <div className="col">
            <Link to="/register" className="btn btn-primary">Add Delivery Agent</Link>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Address</th>
                </tr>
              </thead>
              <tbody>
                {agents.map((agent) => (
                  <tr key={agent.id}>
                    <td>{agent.firstName}</td>
                    <td>{agent.lastName}</td>
                    <td>{agent.email}</td>
                    <td>{agent.phone}</td>
                    <td>
                      {agent.address.flatNo}, {agent.address.streetName}, {agent.address.landmark}, {agent.address.city}, {agent.address.state}, {agent.address.pincode}
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

export default DeliveryAgents;
