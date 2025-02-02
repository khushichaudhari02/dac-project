import axios from 'axios'
import { createUrl } from '../utils'

const API_URL = 'http://localhost:8080';

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });

    return response.data; // Should return { status: "success", data: { token: "your-token" } }
  } catch (error) {
    return { status: "error", error: error.response?.data?.message || "Login failed" };
  }
};

export const register = async (firstName, lastName, email, password, contactNumber, role) => {
  try {
    const response = await axios.post(`${API_URL}/register`, {
      firstName,
      lastName,
      email,
      password,
      contactNumber,
      role
    });

    return response.data;
  } catch (error) {
    return { status: "error", error: error.response?.data?.error || "Registration failed" };
  }
};

export async function fetchDeliveryAgents() {
  try {
    const url = createUrl('delivery-agents'); // Adjust endpoint if needed
    const token = sessionStorage.getItem('token');
    const response = await axios.get(url, {
      headers: { token },
    });
    return response.data;
  } catch (ex) {
    return { status: 'error', error: ex.message };
  }
}

export async function updatePassword(password) {
  try {
    const url = createUrl('user/update-password')
    const body = {
      password,
    }
    const token = sessionStorage['token']
    const response = await axios.put(url, body, {
      headers: { token },
    })
    return response.data
  } catch (ex) {
    return { status: 'error', error: ex }
  }
}

export async function getMyProfile() {
  try {
    // const url = createUrl('user/profile')
    // const token = sessionStorage['token']
    // const response = await axios.get(url, {
    //   headers: {
    //     token,
    //   },
    // })

    const id = sessionStorage['userId']
    const url = createUrl('profile/'+id)
    const response = await axios.get(url)

    return response.data
  } catch (ex) {
    return { status: 'error', error: ex }
  }
}

export async function updateMyProfile(firstName, lastName, contactNumber, address) {
  try {
    const url = createUrl('updateProfile');
    const id = sessionStorage.getItem('userId'); // Ensure id is retrieved

    if (!id) {
      console.error("User ID is missing from session storage");
      return { status: 'error', error: "User ID missing" };
    }

    const body={
      id,
      firstName,
      lastName,
      contactNumber,
      address
    }

    const response = await axios.post(url, body);
    return response.data;
  } catch (ex) {
    return { status: 'error', error: ex };
  }
}
