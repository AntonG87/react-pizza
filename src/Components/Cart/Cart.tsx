import {
  addProduct,
  clearItems,
  deleteProducts,
  removeProduct
} from '../../Redux/sliices/cartSlice'
import {useDispatch, useSelector} from 'react-redux'
import CartItem from './CartItem'
import EmptyCard from '../EmptyCart/EmptyCard'
import React from "react";
import {RootState} from "../../Redux/store";


export type productTypes = {
  id: string;
  type: string;
  size: string;
}

const Cart :React.FC = ()=>{
  const {items,totalPrice} = useSelector((state: RootState) => state.cartSlice)
  const dispatch = useDispatch();


  const cleanAllCart = ()=>{
    dispatch(clearItems())
  }

  const removeProductCart = (product: productTypes) => {
    const { id, type, size } = product;
    dispatch(deleteProducts({ id, type, size }));
  };

  const onClickPlus = (product:productTypes) => {
    const { id, type, size,} = product;
    dispatch(addProduct({id, type, size}));
  };

  const onClickMinus = (product: productTypes)=>{
    const { id, type, size } = product;
    dispatch(removeProduct({id, type, size}));
  }

  return (
    items.length >= 1 ? (
      <CartItem
        items={items}
        totalPrice={totalPrice}
        cleanAllCart={cleanAllCart}
        removeProductCart={removeProductCart}
        onClickPlus={onClickPlus}
        onClickMinus={onClickMinus}
      />
    ) : (
      <EmptyCard />
    )
  );

}
export default Cart;