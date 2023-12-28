import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  signupData: null,
  loading: false,
  token: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null,
  accountType:localStorage.getItem("accountType") ? JSON.parse(localStorage.getItem("accountType")) : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setSignupData(state, value) {
      state.signupData = value.payload;
    },
    setLoading(state, value) {
      state.loading = value.payload;
    },
    setToken(state, value) {
      state.token = value.payload;
    },
    setAccounType(state, value){
      state.accountType=value.payload
    }
  },
});

export const { setSignupData, setLoading, setToken,setAccounType } = authSlice.actions;

export default authSlice.reducer;
