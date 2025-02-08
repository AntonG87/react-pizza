import {createSlice} from '@reduxjs/toolkit'

const initialState = {
  categoryId: 0,
  sortType: {
    name: 'популярности',
    sort: 'rating',
  },
  countPizzas: 12,
  currentPage: 1,
  limitPizzas: 6,
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategoryId(state, action) {
      state.categoryId = action.payload;
    },
    setSortType(state, action) {
      state.sortType = action.payload;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    setCountPizzas(state,action){
      state.countPizzas = action.payload;
    },
    setFilters(state,action){
      state.categoryId = Number(action.payload.categoryId)
      state.sortType = action.payload.sortType
      state.currentPage =   Number(action.payload.currentPage)
    }
  },
});

// Селектор для вычисления pagesCount на основе текущего состояния
export const selectPagesCount = (state) =>
  Math.ceil(state.filter.countPizzas / state.filter.limitPizzas);

// Action creators are generated for each case reducer function
export const {
  setCategoryId,
  setSortType,
  setCurrentPage,
  setCountPizzas,
  setFilters
} = filterSlice.actions;

export default filterSlice.reducer;
