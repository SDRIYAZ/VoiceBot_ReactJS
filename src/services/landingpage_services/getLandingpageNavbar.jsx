// Developer Anil
import { createAsyncThunk } from "@reduxjs/toolkit";
import { braneGet } from "library/BraneGet";
import urls from "urls/urls";

export const getLandingpageNavbar = createAsyncThunk(
    "getLandingpageNavbar",
    async (object, { getState, rejectWithValue }) => {
      try {
        const { BASE_URL } = urls; 
        const data = braneGet(`${BASE_URL}/landingpage_navbar`);
        // console.log(data)
        return data;
      } catch (error) {
        rejectWithValue(error.response);
      }
    }
  );