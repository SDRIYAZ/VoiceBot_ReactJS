import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getHomepageHeader = createAsyncThunk(
  "getHomepageHeader",
  async (object, { getState, rejectWithValue }) => {
    console.log(getState());
    try {
      const { data } = await axios.get("http://localhost:8080/homepage_header");
      return data;
    } catch (error) {
      rejectWithValue(error.response);
    }
  }
);

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