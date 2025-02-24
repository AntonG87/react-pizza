import './App.css'
import './scss/app.scss'
import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router'
import Home from './pages/Home'

const Cart = React.lazy(()=> import('./Components/Cart/Cart'));
const Header = React.lazy(()=> import('./Components/Header/Header'));
const EmptyCart = React.lazy(()=> import('./Components/EmptyCart/EmptyCard'));
const NotFound = React.lazy(()=> import('./pages/NotFound'));
const FullPizza = React.lazy(()=> import('./pages/FullPizza'));

function App() {
  return (
    <BrowserRouter>
      <div className="wrapper">
          <div className="content">
            <div className="container">
              <Header/>
              <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/cart" element={
                  <React.Suspense fallback={<div>Загрузка...</div>}>
                    <Cart/>
                  </React.Suspense>}/>
                <Route path="/empty-cart" element={
                  <React.Suspense fallback={<div>Загрузка...</div>}>
                    <EmptyCart/>
                  </React.Suspense>}/>
                <Route path="/pizza/:id" element={
                  <React.Suspense fallback={<div>Загрузка...</div>}>
                    <FullPizza/>
                  </React.Suspense>}/>
                <Route path="*" element={
                  <React.Suspense fallback={<div>Загрузка...</div>}>
                    <NotFound/>
                  </React.Suspense>}/>
              </Routes>
            </div>
          </div>
      </div>
    </BrowserRouter>
  )
}

export default App;
