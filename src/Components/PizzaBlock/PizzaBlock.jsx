import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {addProduct} from '../../Redux/sliices/cartSlice'
import {Link} from 'react-router-dom'

const PizzaBlock = ({ imageUrl, title, sizes, types, price,id,}) => {
  // Проверка наличия типов и размеров, установка значений по умолчанию
  const [activeType, setActiveType] = React.useState(types && types.length > 0 ? types[0] : 0);
  const [activeSize, setActiveSize] = React.useState(0);
  const namesTypes = ['тонкое', 'традиционное'];
  const sizesTypes = ['26cm','30cm','40cm']
  const dispatch = useDispatch();

  const cartItem = useSelector(state => state.cartSlice.items.find(obj=>obj.id ===id))
  const addedCount = cartItem? cartItem.count : 0
  const onClickAdd = ()=>{
    const item = {
      id,
      title,
      price,
      imageUrl,
      type: namesTypes[activeType],
      size: sizesTypes[activeSize]
    }
    dispatch(addProduct(item))
  }

  return (
    <div className="pizza-block">
      {/* Проверка наличия изображения */}
      {imageUrl ? (
        <Link to={'/pizza/'+id}>
          <img
            className="pizza-block__image"
            src={imageUrl}
            alt={title || 'Pizza'}
          />
        </Link>
      ) : (
        <div className="pizza-block__image-placeholder">Изображение не доступно</div>
      )}

      <h4 className="pizza-block__title">{title || 'Название пиццы'}</h4>

      <div className="pizza-block__selector">
        <ul>
          {/* Проверка наличия типов перед использованием map */}
          {types && types.length > 0 ? (
            types.map((type) => (
              <li
                key={type}
                className={activeType === type ? 'active' : ''}
                onClick={() => setActiveType(type)}
              >
                {namesTypes[type] || 'Неизвестный тип'}
              </li>
            ))
          ) : (
            <li>Типы пиццы не доступны</li>
          )}
        </ul>
        <ul>
          {/* Проверка наличия размеров перед использованием map */}
          {sizes && sizes.length > 0 ? (
            sizes.map((size, index) => (
              <li
                key={size}
                className={activeSize === index ? 'active' : ''}
                onClick={() => setActiveSize(index)}
              >
                {size} см
              </li>
            ))
          ) : (
            <li>Размеры пиццы не доступны</li>
          )}
        </ul>
      </div>

      <div className="pizza-block__bottom">
        <div className="pizza-block__price">от {price} ₽</div>
        <button onClick={onClickAdd} className="button button--outline button--add">
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
              fill="white"
            />
          </svg>
          <span>Добавить</span>
        </button>
      </div>
    </div>
  );
};


export default PizzaBlock;
