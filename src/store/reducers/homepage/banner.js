// Developer Riyaz
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getHomepageBanner } from "../../../services/homepage_services/getHomepageBanner";

const bannerSlice = createSlice({
  name: "getHomepageBanner",
  initialState: {
    data: [],
    loading: false,
    isSuccess: false,
    message: "",
  },
  extraReducers: (builder) => {
    builder
      .addCase(getHomepageBanner.fulfilled, (state, action) => {
        return action.payload;
      })
  },
});

export default bannerSlice;