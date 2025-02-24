import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios'
import {CartItem} from "./cartSlice";

export interface FetchPizzasParams {
  currentPage: number;
  limitPizzas: number;
  category: string;
  sortBy: string;
  order: string;
}

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error'
}
type stateType = {
  items:CartItem[],
  status: Status.LOADING | Status.SUCCESS | Status.ERROR
}

export const fetchPizzas = createAsyncThunk('pizzas/fetchPizzasStatus',
  async(params: FetchPizzasParams,)=>{
  const  { currentPage, limitPizzas, category, sortBy, order} = params ;
  const {data} = await axios.get<CartItem[]>(
    `https://6794d4b2aad755a134ea88e6.mockapi.io/items?page=${currentPage}&limit=${limitPizzas}&${category}&sortBy=${sortBy}&order=${order}`
  );
    return data as CartItem[];
 });

const initialState : stateType = {
  items: [],
  status:Status.LOADING
};

export const pizzasSlice = createSlice({
  name: "pizzas",
  initialState,
  reducers: {
    setItems(state,action ){
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state) => {
        state.status = Status.LOADING
        state.items = []
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        state.items = action.payload
        state.status = Status.SUCCESS
      })
      .addCase(fetchPizzas.rejected, (state) => {
        state.status =  Status.ERROR
        state.items = []
      })
  }
});


export const {setItems} = pizzasSlice.actions;

export default pizzasSlice.reducer;
