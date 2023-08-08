// Developer Riyaz
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getSignUpData } from "services/signup_services/getSignUpData";

const initialState = {
  data: [], // Set initial state to an empty array
  loading: false,
  isSuccess: false,
  message: "",
};

const signUpDataSlice = createSlice({
  name: "signupdata_slice",
  initialState,
  reducers: {}, // Add any additional reducers if needed
  extraReducers: (builder) => {
    builder
      .addCase(getSignUpData.fulfilled, (state, action) => {
        return {
          ...state,
          data: action.payload,
          loading: false,
          isSuccess: true,
          message: "Data loaded successfully",
        };
      })
      .addCase(getSignUpData.pending, (state) => {
        return {
          ...state,
          loading: true,
          isSuccess: false,
          message: "Loading data...",
        };
      })
      .addCase(getSignUpData.rejected, (state) => {
        return {
          ...state,
          loading: false,
          isSuccess: false,
          message: "Error occurred while loading data",
        };
      });
  },
});

export default signUpDataSlice;