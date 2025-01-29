import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WarehouseTable = () => {
  const [warehouses, setWarehouses] = useState([]);

  useEffect(() => {
    // Fetch the data from the API when the component mounts
    axios.get('YOUR_API_ENDPOINT')
      .then(response => {
        setWarehouses(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
      });
  }, []);

  const handleEdit = (id) => {
    console.log(`Edit warehouse with ID ${id}`);
    // Add your edit logic here
  };

  const handleDelete = (id) => {
    console.log(`Delete warehouse with ID ${id}`);
    // Add your delete logic here
  };

  return (
    <div className="container mt-4">
      <div className="table-responsive">
        <table className="table table-bordered table-hover text-center">
          <thead className="thead-dark">
            <tr>
              <th>Warehouse ID</th>
              <th>Warehouse Location</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {warehouses.map((warehouse) => (
              <tr key={warehouse.id}>
                <td>{warehouse.id}</td>
                <td>{warehouse.location}</td>
                <td>
                  <button className="btn btn-warning mr-2" onClick={() => handleEdit(warehouse.id)}>Edit</button>
                  <button className="btn btn-danger" onClick={() => handleDelete(warehouse.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WarehouseTable;
