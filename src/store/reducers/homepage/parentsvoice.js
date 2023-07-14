// Developer Riyaz
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getHomepageParentsvoice } from "services/homepage_services/getHomepageParentsvoice";

const initialState = {
  data: [], // Set initial state to an empty array
  loading: false,
  isSuccess: false,
  message: "",
};

const parentsvoiceSlice = createSlice({
  name: "homepage_parenstvoice",
  initialState,
  reducers: {}, // Add any additional reducers if needed
  extraReducers: (builder) => {
    builder
      .addCase(getHomepageParentsvoice.fulfilled, (state, action) => {
        return {
          ...state,
          data: action.payload,
          loading: false,
          isSuccess: true,
          message: "Data loaded successfully",
        };
      })
      .addCase(getHomepageParentsvoice.pending, (state) => {
        return {
          ...state,
          loading: true,
          isSuccess: false,
          message: "Loading data...",
        };
      })
      .addCase(getHomepageParentsvoice.rejected, (state) => {
        return {
          ...state,
          loading: false,
          isSuccess: false,
          message: "Error occurred while loading data",
        };
      });
  },
});

export default parentsvoiceSlice;