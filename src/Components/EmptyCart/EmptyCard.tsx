import React from 'react'
import emptyCart from '../../assets/img/empty-cart.png';
import {Link} from 'react-router-dom'

const EmptyCart: React.FC = () => {

    return (
      <div className="content">
          <div className="container container--cart">
              <div className="cart cart--empty">
                  <h2>Your cart is empty <span>😕</span></h2>
                  <p>
                      Most likely, you haven’t ordered any pizza yet.
                      <br/>
                      To order a pizza, go to the main page.
                  </p>
                  <img src={emptyCart} alt="Empty cart"/>
                  <Link to="/" className="button button--black">
                      <span>Go back</span>
                  </Link>
              </div>
          </div>
      </div>
    )
};
export default EmptyCart;
