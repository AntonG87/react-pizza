import './App.css'
import './scss/app.scss'
import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router'
import Home from './pages/Home'
import Header from './Components/Header/Header'
import Cart from './Components/Cart/Cart'
import EmptyCart from './Components/EmptyCart/EmptyCard'
import NotFound from './pages/NotFound'
import FullPizza from './pages/FullPizza'


function App() {
  return (
    <BrowserRouter>
      <div className="wrapper">
          <div className="content">
            <div className="container">
              <Header/>
              <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/cart" element={<Cart/>}/>
                <Route path="/empty-cart" element={<EmptyCart/>}/>
                <Route path="/pizza/:id" element={<FullPizza/>}/>
                <Route path="*" element={<NotFound/>}/>
              </Routes>
            </div>
          </div>
      </div>
    </BrowserRouter>
  )
}

export default App;
