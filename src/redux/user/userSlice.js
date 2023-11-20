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
  country: '',
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
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserCountry.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserCountry.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.country = action.payload;
      })
      .addCase(fetchUserCountry.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

// Action creators are generated for each case reducer function
export const { updateToken, updateIsLoggedIn,  updateUserProfile, logoutUser} = userSlice.actions;

export default userSlice.reducer;
