import {createSlice} from '@reduxjs/toolkit'

const initialState = {
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
      setSearchValue(state, action) {
      state.searchValue = action.payload;
    },
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
    },
  },
});

export const selectFilter = state => state.filterSlice;

// Селектор для вычисления pagesCount на основе текущего состояния
export const selectPagesCount = (state) =>
  Math.ceil(state.filter.countPizzas / state.filter.limitPizzas);

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
