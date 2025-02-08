import {createSlice} from '@reduxjs/toolkit'

const initialState = {
  value: 0,
}

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState:{
    categoriesId:0
  },
  reducers: {
    setCategoriesId(state,action){
      state.categoriesId = action.categoriesId;
    }
  },
})

// Action creators are generated for each case reducer function
export const { setCategoriesId } = categoriesSlice.actions
export default categoriesSlice.reducer