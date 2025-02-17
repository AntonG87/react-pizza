import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchPizzas = createAsyncThunk('pizzas/fetchPizzasStatus',
  async(params,thunkAPI)=>{
  const  { currentPage, limitPizzas, category, sortBy, order,} = params ;
  const {data} = await axios.get(
    `https://6794d4b2aad755a134ea88e6.mockapi.io/items?page=${currentPage}&limit=${limitPizzas}&${category}&sortBy=${sortBy}&order=${order}`
  );
  return data;
 });

const initialState = {
  items: [],
  status:'loading'
};

export const pizzasSlice = createSlice({
  name: "pizzas",
  initialState,
  reducers: {
    setItems(state,action){
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state) => {
        state.status = "loading"
        state.items = []
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        state.items = action.payload
        state.status = "success"
      })
      .addCase(fetchPizzas.rejected, (state) => {
        state.status = "error"
        state.items = []
      })
  }
});

// Action creators are generated for each case reducer function
export const {setItems} = pizzasSlice.actions;

export default pizzasSlice.reducer;
