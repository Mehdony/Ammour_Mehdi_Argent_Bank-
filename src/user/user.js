import { setCredentials } from "./userSlice";
import {
  useGetUserDataMutation,
  useUpdateUserDataMutation,
} from "./userApiSlice";

export const getUserData = () => async (dispatch) => {
  try {
    const { data } = await dispatch(useGetUserDataMutation());
    dispatch(setCredentials(data));
  } catch (error) {
    console.log(error);
  }
};

export const updateUserData = (credentials) => async (dispatch) => {
  try {
    const { data } = await dispatch(useUpdateUserDataMutation(credentials));
    dispatch(setCredentials(data));
  } catch (error) {
    console.log(error);
  }
};
