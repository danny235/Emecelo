import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: "",
  isLoggedIn: false,
  userProfile: {},
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
});

// Action creators are generated for each case reducer function
export const { updateToken, updateIsLoggedIn,  updateUserProfile, logoutUser} = userSlice.actions;

export default userSlice.reducer;
