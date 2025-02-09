import axios from 'axios';

const API_URL = "http://localhost:8080/api/couriers";

export const getAllCouriers = async () => {
    const token = sessionStorage['token']; 
    const response = await axios.get(API_URL, {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });
    return response.data;
};

export const getCourierByTracking = async (trackingNumber) => {
    const token = sessionStorage['token']; 
    const response = await axios.get(`${API_URL}/${trackingNumber}`, {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });
    return response.data;
};
