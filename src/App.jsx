import React from 'react';
import MyForm from './components/MyForm';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from './pages/SignIn';
import {ORIGIN_URL} from './api/environment';

import './app.css';
import DisplayProducts from './components/DisplayProducts/DisplayProducts';

const fetchProducts = async (filters) => {
  try
  {
    const query = '?' + new URLSearchParams(filters);
    console.log(query);
    const response = await fetch(ORIGIN_URL + '/api/products' + query);
    if (response.ok)
      return response.json();
    return Promise.reject(res);
  }
  catch(err)
  {
    console.log(err);
  }
}

function App() {

  return (
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<SignIn />}></Route>
          <Route path='/register' element={<MyForm />}></Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
