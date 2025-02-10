import axios from 'axios';
import { createUrl } from '../utils';

export const fetchWarehouseStats = async () => {
  const token = localStorage.getItem('token'); // Retrieve token from local storage
  const url = createUrl('warehouse/home');

  try {
    const response = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching warehouse stats:', error);
    return null;
  }
};
