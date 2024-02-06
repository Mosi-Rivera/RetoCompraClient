import react from 'react'
import {render, screen} from '@testing-library/react';
import { beforeEach, expect } from 'vitest';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProductsList from '../ProductsList';

const products = (({brands, names}, amount) => {
    const result = [];
    for (let i = 0; i < amount; ++i)
    {
        result.push({
            name: "A product: " + names[i % names.length],
            assets: {thumbnail: "https://media.istockphoto.com/id/483960103/photo/blank-black-t-shirt-front-with-clipping-path.jpg?s=612x612&w=0&k=20&c=d8qlXILMYhugXGw6zX7Jer2SLPrLPORfsDsfRDWc-50="},
            price:{
              value: 5 + Math.floor(Math.random() * 30),
              currency: 'USD'
            },
            _id: "123456",
            brand: brands[i % brands.length],
            product: "654321"
        });
    }
    return (result);
})({
    brands: ["NIKE", "H&M", "OTHER"],
    names: ["Shirt", "T-Shirt", "Dress Shirt"]
}, 20);

describe("Product Component", () => {


    test("Should render.", () => {
      render(<BrowserRouter>
        <Routes>
          <Route path='/' element={<ProductsList products={products}/>}/>
        </Routes>
      </BrowserRouter>);
        expect(screen.getByTestId('products-container')).toBeDefined();
    });
    test("Should render products.", () => {
      render(<BrowserRouter>
        <Routes>
          <Route path='/' element={<ProductsList products={products}/>}/>
        </Routes>
      </BrowserRouter>);
        expect(screen.getByTestId('products-container').childElementCount).toBe(products.length);
    });
});