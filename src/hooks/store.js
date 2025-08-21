// Example: src/context/store.js or src/context/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const storedUser = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
const initialState = {
  user: storedUser || null,
  token: localStorage.getItem("token") || null,
  otp_mail: null,
  isAuthenticated: !!storedUser,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
      if (typeof window !== "undefined") {
        window.localStorage.setItem("user", JSON.stringify(state.user));
      }
    },
    setToken: (state, action) => {
      state.token = action.payload;
      if (typeof window !== "undefined") {
        window.localStorage.setItem("token", state.token);
      }
    },
    setOtpMail: (state, action) => {
      state.otp_mail = action.payload;
      if (typeof window !== "undefined") {
        window.sessionStorage.setItem("otp_mail", JSON.stringify(state.otp_mail));
      }
    },
  },
});

export const { setUser, setToken, setOtpMail } = authSlice.actions;
export default authSlice.reducer;