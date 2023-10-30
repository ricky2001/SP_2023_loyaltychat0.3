import { configureStore } from '@reduxjs/toolkit'
import authSlice from './auth/index'
import apiSlice from './api/index'
export const store = configureStore({
  reducer: {
    authStore:authSlice,
    apiStore:apiSlice,

  },
})