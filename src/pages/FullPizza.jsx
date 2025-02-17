import {useParams} from 'react-router'
import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

const FullPizza = () => {
  const { id } = useParams();
  const [pizza, setPizza] = useState(null);
  const [loading, setLoading] = useState(true); // Добавляем состояние для загрузки

  useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(`https://6794d4b2aad755a134ea88e6.mockapi.io/items/${id}`);
        setPizza(data);
      } catch (err) {
        console.log('Error:', err);
      } finally {
        setLoading(false); // После загрузки данных или ошибки, устанавливаем состояние загрузки в false
      }
    }

    fetchPizza();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>; // Показываем сообщение о загрузке до получения данных
  }

  return (
    <div  className="pizza-block">
      {/* Проверка наличия изображения */}
      {pizza.imageUrl ? (
        <img
          className="pizza-block__image"
          src={pizza.imageUrl}
          alt={pizza.title || 'Pizza'}
        />
      ) : (
        <div className="pizza-block__image-placeholder">Изображение не доступно</div>
      )}


      <h4 className="pizza-block__title">{pizza.title || 'Название пиццы'}</h4>
      <p>{pizza.desc}</p>

      <div className="pizza-block__bottom">
        <div className="pizza-block__price">от {pizza.price} ₽</div>
        <Link to={'/'}>
          <div>
            <h3 style={{ textDecoration: "underline" }}>Назад</h3>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default FullPizza;
