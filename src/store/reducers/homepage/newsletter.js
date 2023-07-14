// Developer Riyaz
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getHomepageNewsletter } from "services/homepage_services/getHomepageNewsletter";

const initialState = {
  data: [], // Set initial state to an empty array
  loading: false,
  isSuccess: false,
  message: "",
};

const newsletterSlice = createSlice({
  name: "homepage_newsletter",
  initialState,
  reducers: {}, // Add any additional reducers if needed
  extraReducers: (builder) => {
    builder
      .addCase(getHomepageNewsletter.fulfilled, (state, action) => {
        return {
          ...state,
          data: action.payload,
          loading: false,
          isSuccess: true,
          message: "Data loaded successfully",
        };
      })
      .addCase(getHomepageNewsletter.pending, (state) => {
        return {
          ...state,
          loading: true,
          isSuccess: false,
          message: "Loading data...",
        };
      })
      .addCase(getHomepageNewsletter.rejected, (state) => {
        return {
          ...state,
          loading: false,
          isSuccess: false,
          message: "Error occurred while loading data",
        };
      });
  },
});

export default newsletterSlice;