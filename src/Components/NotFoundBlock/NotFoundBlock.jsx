import react from 'react'
import emptyCart from '../../assets/img/error-404-found-glitch-effect_8024-4.avif'
import {Link} from 'react-router-dom'
import React from "react";


const NotFoundBlock = (props) => {

    return (
        <div className="content">
            <div className="container container--cart">
                <div className="cart cart--empty">
                    <h2>Ничего не найдено <icon>😕</icon></h2>
                    <p>
                        Вероятней всего, такой страницы не существует.
                        <br/>
                        Либо у нас временные неполадки,просим вас подождать и вернуться немного позднее.
                    </p>
                    <img src={emptyCart} alt="Empty cart"/>
                    <Link to="/" className="button button--black">
                        <span>Вернуться назад</span>
                    </Link>
                </div>
            </div>
        </div>
            )
};
export default NotFoundBlock;