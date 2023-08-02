import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../auth/authSlice";
import { authApi } from "../auth/api";
import { userApi } from "../user/userApiSlice";
import userReducer from "../user/userSlice";

export const store = configureStore({
  reducer: {
    // catégorie fetch methods (api.js, userApiSlice.js)
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    // gestion des states  (authSlice.js & userSlice.js)
    auth: authReducer,
    user: userReducer,
  },

  // authApi.reducerPath: authApi.reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(authApi.middleware, userApi.middleware),
});

export default store;
