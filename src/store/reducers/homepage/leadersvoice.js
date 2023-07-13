// Developer Riyaz
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getHomepageLeadersvoice } from "../../../services/homepage_services/getHomepageLeadersvoice";


const initialState = {
  data: [], // Set initial state to an empty array
  loading: false,
  isSuccess: false,
  message: "",
};

const leadersvoiceSlice = createSlice({
  name: "homepage_leadersvoice",
  initialState,
  reducers: {}, // Add any additional reducers if needed
  extraReducers: (builder) => {
    builder
      .addCase(getHomepageLeadersvoice.fulfilled, (state, action) => {
        return {
          ...state,
          data: action.payload,
          loading: false,
          isSuccess: true,
          message: "Data loaded successfully",
        };
      })
      .addCase(getHomepageLeadersvoice.pending, (state) => {
        return {
          ...state,
          loading: true,
          isSuccess: false,
          message: "Loading data...",
        };
      })
      .addCase(getHomepageLeadersvoice.rejected, (state) => {
        return {
          ...state,
          loading: false,
          isSuccess: false,
          message: "Error occurred while loading data",
        };
      });
  },
});

export default leadersvoiceSlice;