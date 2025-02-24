import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from "../store";
import {ListType} from "../../Components/Sort/Sort";

export interface FilterSliceState {
  searchValue:string,
  categoryId: number,
  sortType: {
    name: string,
    sort:string,
  },
  countPizzas: number,
  currentPage: number,
  limitPizzas: number,
}

type setFiltersTypes ={
  categoryId: number,
  sortType: {
    name: string,
    sort:string,
  },
  currentPage: number,

}
const initialState: FilterSliceState = {
  searchValue:'',
  categoryId: 0,
  sortType: {
    name: 'популярности',
    sort: 'rating',
  },
  countPizzas: 12,
  currentPage: 1,
  limitPizzas: 12,
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
      setSearchValue(state, action:PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setCategoryId(state, action:PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setSortType(state, action:PayloadAction<ListType>) {
      state.sortType = action.payload;
    },
    setCurrentPage(state, action:PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setCountPizzas(state,action:PayloadAction<number>){
      state.countPizzas = action.payload;
    },
    setFilters(state,action:PayloadAction<setFiltersTypes>){
      state.categoryId = Number(action.payload.categoryId)
      state.sortType = action.payload.sortType
      state.currentPage =   Number(action.payload.currentPage)
    },
  },
});

export const selectFilter = (state: RootState) => state.filterSlice;

// Селектор для вычисления pagesCount на основе текущего состояния
export const selectPagesCount = (state: RootState) =>
  Math.ceil(state.filterSlice.countPizzas / state.filterSlice.limitPizzas);

// Action creators are generated for each case reducer function
export const {
  setCategoryId,
  setSortType,
  setCurrentPage,
  setCountPizzas,
  setFilters,
  setSearchValue
} = filterSlice.actions;


export default filterSlice.reducer;
