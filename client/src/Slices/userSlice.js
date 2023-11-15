import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useEffect } from "react";

const host = "http://localhost:8080";
const userSlice = createSlice({
  name: "user",
  initialState: {
    loginData: [],
    allUser: [],
  },

  extraReducers: (builder) => {
    builder
      .addCase(StoreUser.fulfilled, (state, action) => {
        localStorage.setItem("auth", JSON.stringify(action.payload.user));
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(getAllUser.fulfilled, (state, action) => {
        state.allUser = action.payload.users;
      });
  },
});

// Login User Save
export const StoreUser = createAsyncThunk("user/store", async (ele) => {
  return ele;
});

// Login User Save
export const getAllUser = createAsyncThunk("user/get", async () => {
  const res = await fetch(`${host}/api/v1/auth/all-user`, {
    method: "GET",
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  });
  const data = await res.json();
  return data;
});

export default userSlice.reducer;
