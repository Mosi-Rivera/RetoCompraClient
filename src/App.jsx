import React from 'react';
import MyForm from './components/MyForm';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from './pages/SignIn';
import './App.css';
import UserProvider from './components/UserProvider/UserProvider';
import PersistUser from './components/PersistUser/PersistUser';

function App() {

  return (
      <BrowserRouter>
        <UserProvider>
          <PersistUser>
            <Routes>
              <Route path='/login' element={<SignIn />}></Route>
              <Route path='/register' element={<MyForm />}></Route>
            </Routes>
          </PersistUser>
        </UserProvider>
      </BrowserRouter>
  );
}

export default App;
