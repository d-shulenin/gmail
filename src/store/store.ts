import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice'
import { getDefaultMiddleware } from '@reduxjs/toolkit';

const customizedMiddleware = getDefaultMiddleware({
    serializableCheck: false
  })

export const store = configureStore({
    reducer: {
        user: userReducer,
    },
    middleware: customizedMiddleware,
  })

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch