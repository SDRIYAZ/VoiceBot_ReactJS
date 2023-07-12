// Developer Riyaz
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getHomepageHeader } from "../../../services/homepage_services/getHomepageHeader";

const headerSlice = createSlice({
  name: "getHomepageHeader",
  initialState: {
    data: [],
    loading: false,
    isSuccess: false,
    message: "",
  },
  extraReducers: (builder) => {
    builder
      .addCase(getHomepageHeader.fulfilled, (state, action) => {
        return action.payload;
      })
  },
});

export default headerSlice;

/*
const headerSlice = createSlice({
  name: "homepage_header_slice",
  initialState: {
    data: [],
    loading: false,
    isSuccess: false,
    message: "",
  },
  reducers: {},
  extraReducers: {
    [getHomepageHeader.pending]: (state, action) => {
      state.loading = true;
    },
    [getHomepageHeader.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.data = payload;
      state.isSuccess = true;
    },
    [getHomepageHeader.rejected]: (state, { payload }) => {
      state.loading = false;
      state.isSuccess = false;
      state.message = "failed";
    },
  },
});

export default headerSlice;
*/
