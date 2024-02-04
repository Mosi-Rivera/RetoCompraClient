import React from 'react';
import MyForm from './components/MyForm';

import { HashRouter, Routes, Route, Outlet, NavLink } from "react-router-dom";
import SignIn from './pages/SignIn';
// import Home from './pages/Home';
// import { loader } from './pages/Home';

import './app.css';


function App() {

  return (
    <>
      <HashRouter>
        <Routes>
          {/* <Route
            loader={loader}
            path="/" element={<Home />}></Route> */}
          <Route path='/login' element={<SignIn />}></Route>
          <Route path='/register' element={<MyForm />}></Route>
        </Routes>
      </HashRouter>

    </>
  );
}

export default App;
