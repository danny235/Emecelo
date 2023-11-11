import axios from "axios";
const BASE_URL = "https://emecelo.onrender.com/api/";

export const LOGIN_USER = async (email, password) => {

  try {
    const response = await axios.post(`${BASE_URL}login/`, {
       email,
       password,
    });
    return response.data
  } catch (error) {
    throw error;
  }
};

export const LOGIN_GOOGLE_USER = async (code) => {

  try {
    const response = await axios.get(`${BASE_URL}/api/auth/google/${code}`);
    console.log(`${BASE_URL}/api/auth/google/${code}`)
    return response.data
  } catch (error) {
    throw error;
  }
};

export const REGISTER_USER = async (email, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/register/`, {
      email,
      password,
    });
    return response.data
  } catch (error) {
    throw error;
  }
};


