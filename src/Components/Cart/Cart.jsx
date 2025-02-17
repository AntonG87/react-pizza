import {
  addProduct,
  clearItems,
  deleteProducts,
  removeProduct
} from '../../Redux/sliices/cartSlice'
import {useDispatch, useSelector} from 'react-redux'
import CartItem from './CartItem'
import EmptyCard from '../EmptyCart/EmptyCard'


const Cart = ()=>{

  const {items,totalPrice} = useSelector(state => state.cartSlice)
  const dispatch = useDispatch();

  const cleanAllCart = ()=>{
    dispatch(clearItems())
  }
  const removeProductCart = (id, type, size) => {
    dispatch(deleteProducts({ id, type, size }));

  };

  const onClickPlus = (id, type, size) => {
    dispatch(addProduct({id, type, size}));
  };

  const onClickMinus = (id, type, size)=>{
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