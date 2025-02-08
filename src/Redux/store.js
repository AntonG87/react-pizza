import {configureStore} from '@reduxjs/toolkit'
import filterSlice from './sliices/filterSlice'

export const store = configureStore({
  reducer: {
    filterSlice ,
  },
})