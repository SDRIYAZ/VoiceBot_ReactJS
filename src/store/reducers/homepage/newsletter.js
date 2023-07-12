// Developer Riyaz
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getHomepageNewsletter } from "../../../services/homepage_services/getHomepageNewsletter";

const newsletterSlice = createSlice({
  name: "getHomepageNewsletter",
  initialState: {
    data: [],
    loading: false,
    isSuccess: false,
    message: "",
  },
  extraReducers: (builder) => {
    builder
      .addCase(getHomepageNewsletter.fulfilled, (state, action) => {
        return action.payload;
      })
  },
});

export default newsletterSlice;