import './App.css'
import './scss/app.scss'
import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router'
import Header from './Components/Header/Header'
import Home from './pages/Home'
import Cart from './Components/Cart/Cart'
import EmptyCart from './Components/EmptyCart/EmptyCard'
import NotFound from './pages/NotFound'


export const SearchContext = React.createContext()

function App() {
   const [searchValue,setSearchValue] = React.useState('')

    return (
        <BrowserRouter>
      <div className="wrapper">
          <SearchContext.Provider value={{searchValue, setSearchValue}}>
            <div className="content">
              <div className="container">
                <Header />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/empty-cart" element={<EmptyCart />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>

              </div>
            </div>
          </SearchContext.Provider>
      </div>
        </BrowserRouter>
  );
}

export default App;
