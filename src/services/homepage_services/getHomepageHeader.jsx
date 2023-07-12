// Developer Riyaz
import { createAsyncThunk } from "@reduxjs/toolkit";
import { braneGet } from "../../library/BraneGet";
import urls from "../../urls/urls";

export const getHomepageHeader = createAsyncThunk(
    "getHomepageHeader",
    async (object, { getState, rejectWithValue }) => {
      console.log(getState());
      try {
        const { BASE_URL } = urls; 
        const data = braneGet(`${BASE_URL}/homepage_header`);
        console.log(data);
        return data;
      } catch (error) {
        rejectWithValue(error.response);
      }
    }
  );