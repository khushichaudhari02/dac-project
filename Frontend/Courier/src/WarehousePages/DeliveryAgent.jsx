import { useState, useEffect } from 'react';
import axios from 'axios';
import { createUrl } from '../utils';
import { Link } from 'react-router-dom';
import WarehouseNavbar from '../components/warehouseNavbar';

function DeliveryAgents() {
  const [agents, setAgents] = useState([]);

  const onLoad = async () => {
    const url = createUrl('warehouse/deliveryagents');
    const result = (await axios.get(url)).data;
    if (result.status === 'success') {
      setAgents(result.data);
    } else {
      console.error(result.error);
    }
  };

  useEffect(() => {
    onLoad();
  }, []);

  return (
    <div>
      <WarehouseNavbar />
      <h2 className="heading">Delivery Agents</h2>
      <div className="container">
        <div className="row">
          <div className="col">
            <Link to="/warehouse/register" className="btn btn-primary">Add Delivery Agent</Link>
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
                    <td>{agent.contactNumber}</td>
                    <td>
                      {agent.address ? (
                        <>
                          {agent.address.flatNo}, {agent.address.streetName}, {agent.address.landmark}, {agent.address.city}, {agent.address.state}, {agent.address.pincode}
                        </>
                      ) : ''}
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
