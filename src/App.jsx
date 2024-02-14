import React from 'react';
import MyForm from './components/MyForm';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import UserProvider from './components/UserProvider/UserProvider';
import PersistUser from './components/PersistUser/PersistUser';
import Home from './pages/Home';

function App() {

  return (
      <BrowserRouter>
        <UserProvider>
          <PersistUser>
            <Routes>
              <Route path='*' element={<Home/>}/>
            </Routes>
          </PersistUser>
        </UserProvider>
      </BrowserRouter>
  );
}

export default App;
