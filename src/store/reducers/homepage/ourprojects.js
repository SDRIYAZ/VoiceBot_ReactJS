import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getHomepageourprojects = createAsyncThunk(
  "getHomepageourprojects",
  async (object, { getState, rejectWithValue }) => {
    console.log(getState());
    try {
      const { data } = await axios.get("http://localhost:8080/homepage_ourprojects");
      return data;
    } catch (error) {
      rejectWithValue(error.response);
    }
  }
);

const ourprojectsSlice = createSlice({
  name: "homepage_ourprojects_slice",
  initialState: {
    data: [],
    loading: false,
    isSuccess: false,
    message: "",
  },
  extraReducers: {
    [getHomepageourprojects.pending]: (state, action) => {
      state.loading = true;
    },
    [getHomepageourprojects.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.data = payload;
      state.isSuccess = true;
    },
    [getHomepageourprojects.rejected]: (state, { payload }) => {
      state.loading = false;
      state.isSuccess = false;
      state.message = "failed";
    },
  },
});

export default ourprojectsSlice;