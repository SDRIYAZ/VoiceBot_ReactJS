import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import urls from "../../../urls/urls";
export const getHomepageparentsvoice = createAsyncThunk(
  "getHomepageparentsvoice",
  async (object, { getState, rejectWithValue }) => {
    console.log(getState());
    try {
      const {BASE_URL}=urls;
      const { data } = await axios.get(`${BASE_URL}/homepage_parentsvoice`);
      return data;
    } catch (error) {
      rejectWithValue(error.response);
    }
  }
);

const ourparentsvoiceSlice = createSlice({
  name: "homepage_parentsvoice_slice",
  initialState: {
    data: [],
    loading: false,
    isSuccess: false,
    message: "",
  },
  extraReducers: {
    [getHomepageparentsvoice.pending]: (state, action) => {
      state.loading = true;
    },
    [getHomepageparentsvoice.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.data = payload;
      state.isSuccess = true;
    },
    [getHomepageparentsvoice.rejected]: (state, { payload }) => {
      state.loading = false;
      state.isSuccess = false;
      state.message = "failed";
    },
  },
});

export default ourparentsvoiceSlice;