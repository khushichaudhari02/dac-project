import axios from 'axios'
import { createUrl } from '../utils'
import { fireEvent } from '@testing-library/react'

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
