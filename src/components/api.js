import axios from "axios";
// export const BASE_URL = "http://127.0.0.1:8000/api/";
export const BASE_URL = "https://emecelo.onrender.com/api/";

export const LOGIN_USER = async (email, password) => {
  try {
    const response = await axios.post(`${BASE_URL}login/`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const LOGIN_GOOGLE_USER = async (code) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/auth/google/${code}`);
    console.log(`${BASE_URL}/api/auth/google/${code}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const REGISTER_USER = async (firstName, lastName, email, password) => {
  try {
    // console.log({
    //     first_name: firstName,
    //     last_name: lastName,
    //     email: email,
    //     password: password,
    //   })
    const response = await axios.post(`${BASE_URL}register/`, {
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: password,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
