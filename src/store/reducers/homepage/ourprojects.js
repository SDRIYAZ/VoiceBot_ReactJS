// Developer Riyaz
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getHomepageOurprojects } from "services/homepage_services/getHomepageOurprojects";

const initialState = {
  data: [], // Set initial state to an empty array
  loading: false,
  isSuccess: false,
  message: "",
};

const ourprojectsSlice = createSlice({
  name: "homepage_ourprojects",
  initialState,
  reducers: {}, // Add any additional reducers if needed
  extraReducers: (builder) => {
    builder
      .addCase(getHomepageOurprojects.fulfilled, (state, action) => {
        return {
          ...state,
          data: action.payload,
          loading: false,
          isSuccess: true,
          message: "Data loaded successfully",
        };
      })
      .addCase(getHomepageOurprojects.pending, (state) => {
        return {
          ...state,
          loading: true,
          isSuccess: false,
          message: "Loading data...",
        };
      })
      .addCase(getHomepageOurprojects.rejected, (state) => {
        return {
          ...state,
          loading: false,
          isSuccess: false,
          message: "Error occurred while loading data",
        };
      });
  },
});

export default ourprojectsSlice;