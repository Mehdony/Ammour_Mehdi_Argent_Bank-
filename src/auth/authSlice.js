// authSlice.js

import { createSlice } from "@reduxjs/toolkit";

// on determine l'état initial de notre store
const initialState = {
  isAuthenticated: sessionStorage.getItem("isAuthenticated")
    ? true
    : localStorage.getItem("isAuthenticated")
    ? true
    : false,
  user: null,
  token: sessionStorage.getItem("token")
    ? sessionStorage.getItem("token")
    : localStorage.getItem("token")
    ? localStorage.getItem("token")
    : null,
  error: null,
};

// on crée un slice qui va contenir nos reducers
// les reducers sont des fonctions qui vont modifier l'état du store
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // loginSuccess est un reducer qui va modifier l'état du store
    // plus précisement il va modifier l'état isAuthenticated et token
    loginSuccess(state, action) {
      state.isAuthenticated = true;
      state.token = action.payload;
      state.error = null;
    },
    loginFailure(state, action) {
      state.isAuthenticated = false;
      state.user = null;
      state.error = action.payload;
    },
    logoutSuccess(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;
    },
    logoutFailure(state, action) {
      state.error = action.payload;
    },
    // getUserInfosSuccess est un reducer qui va modifier l'état du store
    // plus précisement il va modifier l'état user ( donc recuperer les infos de l'utilisateur connecté)
    getUserInfosSuccess(state, action) {
      state.user = action.payload;
      state.error = null;
    },
  },
});

export const {
  loginSuccess,
  loginFailure,
  logoutSuccess,
  logoutFailure,
  getUserInfosSuccess,
} = authSlice.actions;

export default authSlice.reducer;
