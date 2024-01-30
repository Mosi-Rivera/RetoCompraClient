import React, { useEffect, useState } from 'react';
import { HashRouter, Routes, Route, Outlet, NavLink } from "react-router-dom";
import SignIn from './pages/SignIn';
// import Home from './pages/Home';
// import { loader } from './pages/Home';

import './app.css';
import { ThemeProvider } from '@mui/system';
import theme from './styles/theme';
import DisplayProducts from './components/DisplayProducts/DisplayProducts';

console.log("string");

const fetchProducts = async (config) => {
  try
  {
    const query = '?' + new URLSearchParams(config).toString();
    const response = await fetch('http://localhost:4800/api/products' + query);
    if (response.ok)
      return await response.json(); 
    else
      Promise.reject(response);
  }
  catch(err)
  {
    console.log(err);
  }
}

function App() {
  return (
    <>
    <ThemeProvider theme={theme}>
      <HashRouter>
          <Routes>
            <Route
              path="/" element={<DisplayProducts fetchMethod={fetchProducts} pagination filter/>}></Route>
            <Route path='/signin' element={<SignIn />}></Route>
          </Routes>
        </HashRouter>
    </ThemeProvider>
    </>
  );
}

export default App;
