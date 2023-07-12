// Developer Riyaz
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getHomepageLeadersvoice } from "../../../services/homepage_services/getHomepageLeadersvoice";


const leadersvoiceSlice = createSlice({
  name: "getHomepageLeadersvoice",
  initialState: {
    data: [],
    loading: false,
    isSuccess: false,
    message: "",
  },
  extraReducers: (builder) => {
    builder
      .addCase(getHomepageLeadersvoice.fulfilled, (state, action) => {
        return action.payload;
      })
  },
});

export default leadersvoiceSlice;