import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getHomepageleadersvoice = createAsyncThunk(
  "getHomepageleadersvoice",
  async (object, { getState, rejectWithValue }) => {
    console.log(getState());
    try {
      const { data } = await axios.get("http://localhost:8080/homepage_leadersvoice");
      return data;
    } catch (error) {
      rejectWithValue(error.response);
    }
  }
);

const leadersvoiceSlice = createSlice({
  name: "homepage_leadersvoice_slice",
  initialState: {
    data: [],
    loading: false,
    isSuccess: false,
    message: "",
  },
  reducers: {},
  extraReducers: {
    [getHomepageleadersvoice.pending]: (state, action) => {
      state.loading = true;
    },
    [getHomepageleadersvoice.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.data = payload;
      state.isSuccess = true;
    },
    [getHomepageleadersvoice.rejected]: (state, { payload }) => {
      state.loading = false;
      state.isSuccess = false;
      state.message = "failed";
    },
  },
});

export default leadersvoiceSlice;