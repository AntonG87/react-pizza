import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {addProduct, CartItem} from '../../Redux/sliices/cartSlice'; // Путь к вашему слайсу
import {Link} from 'react-router-dom';
import Notification from '../Notification/Notification'; // Компонент уведомления


type PizzaBlockProps = {
  imageUrl: string;
  title: string;
  sizes: number[];
  types: number[];
  price: number;
  id: string;
  rating: number;
};

const PizzaBlock: React.FC<PizzaBlockProps> = ({
                                                 imageUrl,
                                                 title,
                                                 sizes,
                                                 types,
                                                 price,
                                                 id,
                                               }) => {
  const [activeType, setActiveType] = useState<number>(0);
  const [activeSize, setActiveSize] = useState<number>(0);
  const [adjustedPrice, setAdjustedPrice] = useState<number>(price);
  const [notificationVisible, setNotificationVisible] = useState<boolean>(false);

  const namesTypes = ['тонкое', 'традиционное'];
  const sizesTypes = ['26cm', '30cm', '40cm'];
  const dispatch = useDispatch();

  // Вычисление изменённой цены в зависимости от выбранного размера
  useEffect(() => {
    let newPrice = price;
    if (activeSize === 1) {
      newPrice *= 1.4;
    } else if (activeSize === 2) {
      newPrice *= 1.65;
    }
    setAdjustedPrice(Math.ceil(newPrice)); // Обновляем состояние с изменённой ценой
  }, [activeSize, price]);

  const onClickAdd = () => {
    const item: CartItem = {
      id,
      title,
      price: adjustedPrice,
      imageUrl,
      type: namesTypes[activeType],
      size: sizesTypes[activeSize],
      count: 1,
    };
    dispatch(addProduct(item)); // Добавляем товар в корзину через Redux

    // Показываем уведомление
    setNotificationVisible(true);

    // Скрываем уведомление через 3 секунды
    setTimeout(() => {
      setNotificationVisible(false);
    }, 3000);
  };

  return (
    <div className="pizza-block">
      {imageUrl ? (
        <Link to={'/pizza/' + id}>
          <img className="pizza-block__image" src={imageUrl} alt={title || 'Pizza'} />
        </Link>
      ) : (
        <div className="pizza-block__image-placeholder">Изображение не доступно</div>
      )}

      <h4 className="pizza-block__title">{title || 'Название пиццы'}</h4>

      <div className="pizza-block__selector">
        <ul>
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
        <div className="pizza-block__price">от {adjustedPrice} ₽</div>
        <button onClick={onClickAdd} className="button button--outline button--add">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
              fill="white"
            />
          </svg>
          <span>Добавить</span>
        </button>
      </div>

      {/* Уведомление о добавлении товара в корзину */}
      {notificationVisible && (
        <Notification
          message="Пицца добавлена в корзину!"
          onClose={() => setNotificationVisible(false)}
        />
      )}
    </div>
  );
};

export default PizzaBlock;
