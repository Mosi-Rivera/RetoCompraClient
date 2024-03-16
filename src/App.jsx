import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import './App.css';
import UserProvider from './components/UserProvider/UserProvider';
import PersistUser from './components/PersistUser/PersistUser';
import Home from './pages/Home';
import Men from './pages/Men';
import Women from './pages/Women';
import SearchProduct from './pages/SearchProduct'
import CartPage from './pages/cart/Cart';
import Layout from './components/Layout';


function App() {

  return (
    <BrowserRouter>
      <UserProvider>
        <PersistUser>
          <Routes>
            <Route path='/' element={<Layout/>}>
              <Route path='/' element={<Home />} />
              <Route path='/men' element={<Men />} />
              <Route path='/women' element={<Women />} />
              <Route path='/search/:searchText' element={<SearchProduct />} />
              <Route path='/cart' element={<CartPage/>}/>
            </Route>
          </Routes>
        </PersistUser>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
