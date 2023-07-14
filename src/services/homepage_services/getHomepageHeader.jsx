// Developer Riyaz
import { createAsyncThunk } from "@reduxjs/toolkit";
import { braneGet } from "library/BraneGet";
import urls from "urls/urls";

export const getHomepageHeader = createAsyncThunk(
  "getHomepageHeader",
  async (object, { getState, rejectWithValue }) => {
    try {
      const { BASE_URL } = urls;
      const data = braneGet(`${BASE_URL}/homepage_header`);
      // const [header] = data.data;
      // const { data: headerData } = header;
      // const [headerInfo] = headerData;
      // const { patents, about, contact, forparents } = headerInfo;
      // const HeaderList = [patents, about, contact, forparents];

      // const { image } = headerInfo;
      // console.log(data)
      // return {
      //   HeaderList,
      //   image,
      // };
      // console.log(data)
      return data;
    } catch (error) {
      rejectWithValue(error.response);
    }
  }
);