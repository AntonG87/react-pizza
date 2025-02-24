import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {productTypes} from "../../Components/Cart/Cart";

export type CartItem = {
  id:string,
  title:string,
  price:number,
  imageUrl:string,
  type:string ,
  size:string ,
  count:number
};

interface CartSliceState{
  totalPrice:number;
  items:CartItem[];
  addedPizzas:number;
};

interface payloadActionsCart {
  id: string;
  type: string;
  size: string;
}

const initialState: CartSliceState = {
  totalPrice: 0,
  items: JSON.parse(localStorage.getItem('cartItems') || '[]'), // Загружаем корзину из localStorage
  addedPizzas:0,
};


const calculateCartTotal = (items: CartItem[]) => {
  let totalPrice = 0;
  let addedPizzas = 0;

  items.forEach(item => {
    totalPrice += item.price * item.count; // Умножаем цену на количество
    addedPizzas += item.count; // Считаем общее количество товаров
  });

  return { totalPrice, addedPizzas };
};

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    ...initialState,
    ...calculateCartTotal(initialState.items),
  },
  reducers: {
    addProduct(state, action:PayloadAction<productTypes>) {
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
        // @ts-ignore
        state.items.push({ ...action.payload, count: 1 }); // Если нет, добавляем как новый объект
      }

      // Обновляем общую стоимость  и значение пицц
      state.addedPizzas = state.items.reduce((sum, obj) => obj.count + sum, 0);
      state.totalPrice = state.items.reduce((sum, obj) => obj.price * obj.count + sum, 0);

      //добавил в локал
      localStorage.setItem('cartItems', JSON.stringify(state.items));
    },
    deleteProducts(state, action:PayloadAction<payloadActionsCart>) {
      // Оставляем в state.items только те элементы, которые НЕ совпадают с переданными данными
      state.items = state.items.filter(
        (obj) =>
          !(obj.id === action.payload.id &&
            obj.type === action.payload.type &&
            obj.size === action.payload.size)
      );

      // Обновляем сумму цен и общее количество пицц
      state.totalPrice = state.items.reduce((sum, obj) => obj.price * obj.count + sum, 0);
      state.addedPizzas = state.items.reduce((sum, obj) => obj.count + sum, 0);

      localStorage.setItem('cartItems', JSON.stringify(state.items));

    },

    removeProduct(state, action:PayloadAction<payloadActionsCart>) {
      const findItem = state.items.find(
        (obj) =>
          obj.id === action.payload.id &&
          obj.type === action.payload.type &&
          obj.size === action.payload.size
      );

      if (findItem) { // Проверяем, найден ли элемент
        if (findItem.count > 1) {
          findItem.count--; // Уменьшаем количество на 1
        } else {
          state.items = state.items.filter(
            (obj) =>
              !(obj.id === action.payload.id &&
                obj.type === action.payload.type &&
                obj.size === action.payload.size)
          );
        }
      }

    // Обновляем сумму цен и общее количество пицц
      state.totalPrice = state.items.reduce((sum, obj) => obj.price * obj.count + sum, 0);
      state.addedPizzas = state.items.reduce((sum, obj) => obj.count + sum, 0);

      localStorage.setItem('cartItems', JSON.stringify(state.items));
    },

    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
      state.addedPizzas = 0;

      localStorage.setItem('cartItems', JSON.stringify(state.items));

    },
  },
});

export const {
  addProduct,
  removeProduct,
  clearItems,
  deleteProducts
} = cartSlice.actions;

export default cartSlice.reducer;
