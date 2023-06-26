// auth.js

import {
  loginSuccess,
  loginFailure,
  logoutSuccess,
  logoutFailure,
} from "./authSlice";
import { useLoginMutation, useSignupMutation } from "./api";

// cette fonction prend en paramètre les credentials de l'utilisateur et
// retourne une fonction asynchrone qui dispatche une action loginSuccess
// si la requête réussit, ou loginFailure si la requête échoue.
export const login = (credentials) => async (dispatch) => {
  try {
    // data c'est le token ( le retour de la requête)
    const { data } = await dispatch(useLoginMutation(credentials));
    // on dispatch l'action loginSuccess avec le token en paramètre
    // dispatch signifie qu'on envoie une action au store
    dispatch(loginSuccess(data));
  } catch (error) {
    dispatch(loginFailure(error));
  }
};


// cette fonction prend en paramètre les credentials de l'utilisateur et
// retourne une fonction asynchrone qui dispatche une action loginSuccess
// si la requête réussit, ou loginFailure si la requête échoue.
export const signup = (userData) => async (dispatch) => {
  try {
    const { data } = await dispatch(useSignupMutation(userData));
    dispatch(loginSuccess(data));
  } catch (error) {
    dispatch(loginFailure(error));
  }
};


// la fonction logout prend en paramètre un dispatch 
// et retourne une fonction asynchrone qui dispatche une action logoutSuccess
// si la requête réussit, ou logoutFailure si la requête échoue.
export const logout = () => async (dispatch) => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("isAuthenticated");
    localStorage.removeItem("token");
    localStorage.removeItem("isAuthenticated");
    try {
      dispatch(logoutSuccess());
    } catch (error) {
      dispatch(logoutFailure(error));
    }
  };
