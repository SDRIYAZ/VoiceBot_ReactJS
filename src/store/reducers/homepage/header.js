import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// export const getHomepageHeader = createAsyncThunk(
//   "getHomepageHeader",
//   async (object, { getState, rejectWithValue }) => {
//     console.log(getState());
//     try {
//       // const { data } = await axios.get("http://localhost:8080/homepage_header");
//       const data = braneGet("http://localhost:8080/homepage_header");
//       console.log(data);
//       return data;
//     } catch (error) {
//       rejectWithValue(error.response);
//     }
//   }
// );

import { getHomepageHeader } from "../../../services/homepage_services/getHomepageHeader";

const headerSlice = createSlice({
  name: "items",
  initialState: {
    data: [],
    loading: false,
    isSuccess: false,
    message: "",
  },
  extraReducers: (builder) => {
    builder
      .addCase(getHomepageHeader.fulfilled, (state, action) => {
        // handle the successful fetchItems action
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
