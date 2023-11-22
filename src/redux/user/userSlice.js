import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUserCountry = createAsyncThunk('userCountry/fetchUserCountry', async () => {
  try {
    const response = await axios.get('https://api.ipify.org?format=json');
    const userIP = response.data.ip;
    const countryResponse = await axios.get(`https://ipapi.co/${userIP}/json/`);
    const country = countryResponse.data.country_name;
    return country;
  } catch (error) {
    throw error;
  }
});

const initialState = {
  token: "",
  isLoggedIn: false,
  userProfile: {},
  country: 'USA',
    status: 'idle', // 'idle', 'loading', 'succeeded', 'failed'
    error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateToken: (state, action) => {
      state.token = action.payload;
    },
    updateIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    updateUserProfile: (state, action) => {
      state.userProfile = action.payload;
    },
    logoutUser: (state) => {
      state.userProfile = {}
      state.isLoggedIn = false
      state.token = ""
    },
    updateCountry: (state, action) => {
      state.country = action.payload
    }
  },
 
});

// Action creators are generated for each case reducer function
export const { updateToken, updateIsLoggedIn,  updateUserProfile, logoutUser, updateCountry} = userSlice.actions;

export default userSlice.reducer;
