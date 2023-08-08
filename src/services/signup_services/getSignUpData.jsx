// Developer Anil
import { createAsyncThunk } from "@reduxjs/toolkit";
import { braneGet } from "library/BraneGet";
import urls from "urls/urls";

export const getSignUpData = createAsyncThunk(
    "getSignUpData",
    async (object, { getState, rejectWithValue }) => {
      try {
        const { BASE_URL } = urls; 
        const data = braneGet(`${BASE_URL}/signup_data`);
        // console.log(data)
        return data;
      } catch (error) {
        rejectWithValue(error.response);
      }
    }
  );