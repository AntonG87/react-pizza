import { useParams } from 'react-router';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const FullPizza: React.FC = () => {
  const { id } = useParams();
  const [pizza, setPizza] = useState<{
    imageUrl: string;
    title: string;
    price: number;
    desc: string;
  }>({
    imageUrl: '',
    title: '',
    price: 0,
    desc: ''
  });
  const [loading, setLoading] = useState<boolean>(true); // Add loading state

  useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(`https://6794d4b2aad755a134ea88e6.mockapi.io/items/${id}`);
        setPizza(data);
      } catch (err) {
        console.log('Error:', err);
      } finally {
        setLoading(false); // After data loads or on error, set loading to false
      }
    }

    fetchPizza();
  }, [id]);

  if (loading) {
    return <>Loading...</>; // Show loading message until data arrives
  }

  return (
    <div className="pizza-block">
      {/* Check for image existence */}
      {pizza.imageUrl ? (
        <img
          className="pizza-block__image"
          src={pizza.imageUrl}
          alt={pizza.title || 'Pizza'}
        />
      ) : (
        <div className="pizza-block__image-placeholder">Image not available</div>
      )}

      <h4 className="pizza-block__title">{pizza.title || 'Pizza Name'}</h4>
      <p>{pizza.desc}</p>

      <div className="pizza-block__bottom">
        <div className="pizza-block__price">from {pizza.price} ₪</div>
        <Link to={'/'}>
          <div>
            <h3 style={{ textDecoration: 'underline' }}>Back</h3>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default FullPizza;
