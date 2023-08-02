import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    firstname: "",
    lastname: "",
  },
  reducers: {
    setCredentials: (state, action) => {
      // déstructuré car action.payload est un objet qui contient firstname et lastname
      const { firstname, lastname } = action.payload;
      state.firstname = firstname;
      state.lastname = lastname;
    },
  },
});

// on exporte les actions
export const { setCredentials } = userSlice.actions;

// on exporte le reducer
export default userSlice.reducer;

// permet de mettre la première lettre en majuscule
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// permet de récupérer le nom et le prénom en majuscule
export const selectCurrentFirstname = (state) =>
  state.user.firstname && capitalizeFirstLetter(state.user.firstname);
export const selectCurrentLastname = (state) =>
  state.user.lastname && capitalizeFirstLetter(state.user.lastname);
