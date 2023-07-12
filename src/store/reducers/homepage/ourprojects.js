// Developer Riyaz
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getHomepageOurprojects } from "../../../services/homepage_services/getHomepageOurprojects";

const ourprojectsSlice = createSlice({
  name: "getHomepageOurprojects",
  initialState: {
    data: [],
    loading: false,
    isSuccess: false,
    message: "",
  },
  extraReducers: (builder) => {
    builder
      .addCase(getHomepageOurprojects.fulfilled, (state, action) => {
        return action.payload;
      })
  },
});

export default ourprojectsSlice;