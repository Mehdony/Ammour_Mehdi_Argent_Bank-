// api.js

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// on crée un api qui va contenir nos endpoints
// les endpoints sont des fonctions qui vont faire des requêtes au serveur
// c'est un fetch qui est encapsulé dans une fonction 
export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/api/v1', 
  // le token dans le header permet d'effectuer des requêtes protégées
  // ex pour récupérer des posts d'un utilisateur il faut être connecté 
  // si t'es connecté tu as un token dans le header
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token
    if (token) {
      headers.set('authorization', `Bearer ${token}`)
    }
    return headers
  }
}),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: '/user/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    signup: builder.mutation({
      query: (userData) => ({
        url: '/user/signup',
        method: 'POST',
        body: userData,
      }),
    }),
    getUserInfos : builder.mutation({
      query: (credentials) => ({
        url: '/user/profile',
        method: 'POST',
        body: credentials,
      }),
    })
  }),
});

export const { useLoginMutation, useSignupMutation , useGetUserInfosMutation } = authApi;
