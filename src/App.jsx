import React from 'react';
import MyForm from './components/MyForm';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from './pages/SignIn';
import './App.css';

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
