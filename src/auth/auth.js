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

export const signup = (userData) => async (dispatch) => {
  try {
    const { data } = await dispatch(useSignupMutation(userData));
    dispatch(loginSuccess(data));
  } catch (error) {
    dispatch(loginFailure(error));
  }
};

export const /* The `logout` function is an asynchronous function that dispatches an action
`logoutSuccess` if the logout request is successful, or `logoutFailure` if the request
fails. However, the implementation of the actual logout functionality is missing and
needs to be added. */
  logout = () => async (dispatch) => {
    sessionStorage.removeItem("token");
    try {
      // TODO: call logout endpoint and clear user data from store
      //  clear token from session storage
      dispatch(logoutSuccess());
    } catch (error) {
      dispatch(logoutFailure(error));
    }
  };
