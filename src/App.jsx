import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import './App.css';
import UserProvider from './components/UserProvider/UserProvider';
import PersistUser from './components/PersistUser/PersistUser';
import Home from './pages/Home';
import {CrudProducts} from './components/CrudProducts';
import Women from './pages/Women'


function App() {

  return (
    <BrowserRouter>
      <UserProvider>
        <PersistUser>
          <Routes>
            <Route path='*' element={<Home />} />
            <Route path='/women' element={<Women />} />
            {/* <Route path= "/Crud" element={<CrudProducts/>} /> */}
          </Routes>
        </PersistUser>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
