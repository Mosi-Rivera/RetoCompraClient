import React from 'react';
import MyForm from './components/MyForm';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from './pages/SignIn';
import Home from './pages/Home';
import { AboutUs } from './components/AboutUs';
// import { loader } from './pages/Home';

import './App.css';


function App() {

  return (
    <BrowserRouter>

        <Routes>
          {/* <Route
            loader={loader}
            path="/" element={<Home />}></Route> */}
          <Route path='/login' element={<SignIn />}></Route>
          <Route path='/register' element={<MyForm />}></Route>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/AboutUs' element={<AboutUs/>}></Route>
          </Routes>
      </BrowserRouter>
  );
}

export default App;
