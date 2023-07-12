import { createAsyncThunk } from "@reduxjs/toolkit";
import { braneGet } from "../../library/BraneGet";

export const getHomepageHeader = createAsyncThunk(
    "getHomepageHeader",
    async (object, { getState, rejectWithValue }) => {
      console.log(getState());
      try {
        const data = braneGet("http://localhost:8080/homepage_header");
        console.log(data);
        return data;
      } catch (error) {
        rejectWithValue(error.response);
      }
    }
  );