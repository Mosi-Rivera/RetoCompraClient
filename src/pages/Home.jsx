import React, { useState } from 'react';
import '../styles/backgroundImage.css';
import '../styles/Home.css';
import DisplayProducts from '../components/DisplayProducts/DisplayProducts.jsx';
import { getProducts } from '../api/products/productRoutes.js';
import Header from '../components/Header.jsx';
//import ModalComponent from '../components/Modal/Modal.jsx';

function HomePage() {

    return (
      <>
    <div>
      <Header/>    
      <div className='background-image'> 
        <nav>
          <ul>
            <li><a href="/login">Log In</a></li>
            <li><a href="/AboutUs">About Us</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </nav>
      </div>

      <main>

        <h3>Welcome to Color T-Shirts!</h3>

        {/* Display products */}
        <DisplayProducts fetchMethod={getProducts} defaultLimit={5}/>
    
        
      </main>
    


    </div>
    <footer>

{/* Move footer to Component and import */}
{"2024 Digital Bit Lord Website. All rights reserved"}
</footer>
    </>
  );
}

export default HomePage;