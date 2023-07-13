// Developer Anil
import { createAsyncThunk } from "@reduxjs/toolkit";
import { braneGet } from "../../library/BraneGet";
import urls from "../../urls/urls";

export const getHomepageNewsletter = createAsyncThunk(
    "getHomepageNewsletter",
    async (object, { getState, rejectWithValue }) => {
      try {
        const { BASE_URL } = urls; 
        const data = braneGet(`${BASE_URL}/homepage_newsletter`);
        return data;
      } catch (error) {
        rejectWithValue(error.response);
      }
    }
  );