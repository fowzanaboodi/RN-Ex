import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {  signIn  } from "../../apiService";

export const signinUser = createAsyncThunk(
  "user/signInUser",
  async (signinData) => {
    const response = await signIn (signinData);
    return response.data;
  }
);


const initialUser = {}
export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: initialUser,
    error: null,
    status: null,
    isLoading:false
  },
  reducers: {
    logout: (state) => {
      state.user = null;
    
    },
  },
  extraReducers: {
    [signinUser.pending]: (state, action) => {
      state.error = null;
      state.status = "Signing In";
      state.isLoading=true
    },
    [signinUser.fulfilled]: (state, action) => {
      state.user = action.payload;
      state.isLoading=false;
      state.status = "Signed In";
    },
    [signinUser.rejected]: (state, action) => {
      const { message } = action.error;
      state.isLoading=false
      state.error = message;
      state.status = "Sign in Failed";
    },
  },
});

export const { logout } = userSlice.actions;

export const selectUser = (state) => state.user.user;
export const selectStatus = (state) => state.user.status;
export const selectError = (state) => state.user.error;
export const selectLoading = (state) => state.user.isLoading;
export default userSlice.reducer;
