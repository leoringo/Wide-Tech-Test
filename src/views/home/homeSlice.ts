import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { AxiosError } from "axios";
import type { GeneralResponseMessage } from "../../api/generalResponse";
import type { RootState } from "../../store/store";
import type { IResponseGetJson } from "../../api/homeService/responseModel";
import { axiosGetAllJson } from "../../api/homeService";

interface LoginState {
  jsonDatas: IResponseGetJson;
  message: string;
}

const initialState: LoginState = {
  jsonDatas: [],
  message: "",
};

// Redux-thunk
export const getAllJson = createAsyncThunk<IResponseGetJson, null>(
  "json/getAllJson",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosGetAllJson();

      return response.data;
    } catch (err) {
      const error = err as AxiosError<GeneralResponseMessage>;
      return rejectWithValue({
        message: error.response?.data.message || "Unknown error",
        status: error.response?.status || 500,
      });
    }
  }
);

const homeSlicer = createSlice({
  name: "home",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllJson.rejected, (state, action) => ({
        ...state,
        status: "failed",
        message: (action.payload as GeneralResponseMessage).message,
      }))
      .addCase(getAllJson.pending, (state) => ({
        ...state,
        status: "idle",
      }))
      .addCase(getAllJson.fulfilled, (state, action) => ({
        ...state,
        jsonDatas: action.payload,
      }));
  },
});

// -- Action
export const {} = homeSlicer.actions;
export const selectHomeState = (state: RootState) => state.home;

export default homeSlicer.reducer;
