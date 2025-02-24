import {configureStore} from '@reduxjs/toolkit'
import filterSlice from './sliices/filterSlice'
import cartSlice from './sliices/cartSlice'
import pizzasSlice from './sliices/pizzasSlice'
import {useDispatch} from "react-redux";

export const store = configureStore({
  reducer: {
    filterSlice ,
    cartSlice,
    pizzasSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();