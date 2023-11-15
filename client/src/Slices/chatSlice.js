import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const host = "http://localhost:8080";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    sendMessage: [],
    receiveMessage: [],
  },

  extraReducers: (builder) => {
    builder.addCase(getSendChat.fulfilled, (state, action) => {
      state.sendMessage = action.payload.chat;
    });
  },
});

export const getSendChat = createAsyncThunk("chat/send", async () => {
  const res = await fetch(`${host}/api/v1/chat/send-chat`, {
    method: "GET",
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  });
  const data = await res.json();
  return data;
});

export default chatSlice.reducer;
