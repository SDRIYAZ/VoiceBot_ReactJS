// Developer Riyaz
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getHomepageParentsvoice } from "../../../services/homepage_services/getHomepageParentsvoice";

const parentsvoiceSlice = createSlice({
  name: "getHomepageParentsvoice",
  initialState: {
    data: [],
    loading: false,
    isSuccess: false,
    message: "",
  },
  extraReducers: (builder) => {
    builder
      .addCase(getHomepageParentsvoice.fulfilled, (state, action) => {
        return action.payload;
      })
  },
});

export default parentsvoiceSlice;