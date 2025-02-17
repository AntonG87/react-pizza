import {configureStore} from '@reduxjs/toolkit'
import filterSlice from './sliices/filterSlice'
import cartSlice from './sliices/cartSlice'
import pizzasSlice from './sliices/pizzasSlice'

export const store = configureStore({
  reducer: {
    filterSlice ,
    cartSlice,
    pizzasSlice
  },
})