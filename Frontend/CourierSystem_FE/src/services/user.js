import axios from 'axios'
import { createUrl } from '../utils'
// import { fireEvent } from '@testing-library/react'

export async function login(email, password) {
  try {
    // create the url
    const url = createUrl('login')

    // create the request body
    const body = {
      email,
      password,
    }

    // call the API
    const response = await axios.post(url, body)

    console.log("Login response:", response.data); // Debugging

    if (response.data.status === "success") {
      sessionStorage.setItem("userId", response.data.userId);  // Ensure userId is stored
      sessionStorage.setItem("token", response.data.token);
    }

    // get the response body
    return response.data
  } catch (ex) {
    return { status: 'error', error: ex }
  }
}

export async function register(firstName, lastName, email, contactNumber, password) {
  try {
    const url = createUrl('register')
    const body = {
      firstName,
      lastName,
      email,
      contactNumber,
      password,
    }
    const response = await axios.post(url, body)
    return response.data
  } catch (ex) {
    return { status: 'error', error: ex }
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
    //const url = createUrl('user/profile')
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
    const url = createUrl('updateprofile');
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

export async function placeOrder(orderData) {
  try {
    const url = createUrl('orders/place-order');
    console.log("Sending order data:", orderData);

    if (!orderData.senderId || !orderData.fromWarehouseId || !orderData.toWarehouseId) {
      return { status: 'error', error: "Missing required order fields" };
    }

    const response = await axios.post(url, orderData, {
      headers: { 'Content-Type': 'application/json' },
    });

    console.log("Order placed response:", response.data);

    if (response.data.status === "success") {
      console.log("Order ID from API:", response.data.orderId); // Debugging

      if (response.data.orderId) {
        sessionStorage.setItem("orderId", response.data.orderId); // ✅ Store orderId properly
        console.log("Stored orderId in sessionStorage:", sessionStorage.getItem("orderId")); // Debugging
      } else {
        console.error("API response is missing orderId");
      }
    }
    return response.data;
  } catch (ex) {
    console.error("Place order error:", ex.response?.data?.message || ex.message);
    return { status: 'error', error: ex.response?.data?.message || ex.message };
  }
}

export async function processPayment(orderId, paymentData) {
  try {
    if (!orderId) {
      throw new Error("Order ID is missing.");
    }
    const url = createUrl(`orders/confirm_order/${orderId}`);
      console.log("Sending payment data:", paymentData);

      const response = await axios.patch(url, paymentData, {
          headers: { "Content-Type": "application/json" },
      });

      console.log("Payment response:", response.data);
      return response.data;
  } catch (ex) {
      console.error("Payment error:", ex.response?.data?.message || ex.message);
      return { status: "error", error: ex.response?.data?.message || ex.message };
  }
}


