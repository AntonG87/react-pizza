import {createSlice} from '@reduxjs/toolkit'

const initialState = {
  totalPrice: 0,
  items: [],
  addedPizzas:0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct(state, action) {
      // Ищем в items, есть ли уже такая же пицца (с таким же id, type и size)
      const findItem = state.items.find(
        (obj) =>
          obj.id === action.payload.id &&
          obj.type === action.payload.type &&
          obj.size === action.payload.size
      );

      if (findItem) {
        findItem.count++; // Если нашли, просто увеличиваем count
      } else {
        state.items.push({ ...action.payload, count: 1 }); // Если нет, добавляем как новый объект
      }

      // Обновляем общую стоимость  и значение пицц
      state.addedPizzas = state.items.reduce((sum, obj) => obj.count + sum, 0);
      state.totalPrice = state.items.reduce((sum, obj) => obj.price * obj.count + sum, 0);

      //Оповещаем пользователя о добавлении

    },
    deleteProducts(state, action) {
      // Оставляем в state.items только те элементы, которые НЕ совпадают с переданными данными
      console.log(action.payload)
      console.log(state.items)
      state.items = state.items.filter(
        (obj) =>
          !(obj.id === action.payload.id &&
            obj.type === action.payload.type &&
            obj.size === action.payload.size)
      );

      // Обновляем сумму цен и общее количество пицц
      state.totalPrice = state.items.reduce((sum, obj) => obj.price * obj.count + sum, 0);
      state.addedPizzas = state.items.reduce((sum, obj) => obj.count + sum, 0);
    },

    removeProduct(state, action) {
      const findItem = state.items.find(
        (obj) =>
          obj.id === action.payload.id &&
          obj.type === action.payload.type &&
          obj.size === action.payload.size
      );

      if (findItem.count > 1) {
          findItem.count--; // Уменьшаем количество на 1
        } else {
          state.items = state.items.filter(
            (obj) =>
              !(obj.id === action.payload.id &&
                obj.type === action.payload.type &&
                obj.size === action.payload.size)
          );}

      // Обновляем сумму цен и общее количество пицц
      state.totalPrice = state.items.reduce((sum, obj) => obj.price * obj.count + sum, 0);
      state.addedPizzas = state.items.reduce((sum, obj) => obj.count + sum, 0);
    },

    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
      state.addedPizzas = 0;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addProduct,
  removeProduct,
  clearItems,
  deleteProducts
} = cartSlice.actions;

export default cartSlice.reducer;
