import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import './App.css';
import UserProvider from './components/UserProvider/UserProvider';
import PersistUser from './components/PersistUser/PersistUser';
import Home from './pages/Home';

import Women from './pages/Women'
import Men from './pages/Men';
import { CrudProducts } from './components/CrudProducts';


function App() {

  return (
    <BrowserRouter>
      <UserProvider>
        <PersistUser>
          <Routes>
            <Route path='*' element={<Home />} />
            <Route path='/women' element={<Women />} />
            <Route path='/men' element={<Men />} />
            {/* <Route path= "/Crud" element={<CrudProducts/>} /> */}
          </Routes>
        </PersistUser>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
