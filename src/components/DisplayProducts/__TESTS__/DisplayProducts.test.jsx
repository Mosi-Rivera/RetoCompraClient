import react from 'react'
import {render, screen} from '@testing-library/react';
import { beforeEach, expect } from 'vitest';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DisplayProducts from '../DisplayProducts';
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
const fetchProducts = async () => {
    Promise.resolve({products, pages: 1});
}

describe("Product Component", () => {
    test("Should render.", () => {
        render(<BrowserRouter>
            <Routes>
              <Route path='/' element={<DisplayProducts fetchMethod={fetchProducts}/>}/>
            </Routes>
          </BrowserRouter>);
        expect(screen.getByTestId('display-products')).toBeDefined();
    });
    test("Should display products list.", () => {
      render(<BrowserRouter>
        <Routes>
          <Route path='/' element={<DisplayProducts fetchMethod={fetchProducts}/>}/>
        </Routes>
      </BrowserRouter>);
        expect(screen.getByTestId('products-container')).toBeDefined();
    });
    test("Should render filter when attribute is set.", () => {
      render(<BrowserRouter>
        <Routes>
          <Route path='/' element={<DisplayProducts fetchMethod={fetchProducts} filter/>}/>
        </Routes>
      </BrowserRouter>);
        expect(screen.getByTestId('product-filters')).toBeDefined();
    });
    test("Should render pagination when attribute is set.", () => {
      render(<BrowserRouter>
        <Routes>
          <Route path='/' element={<DisplayProducts fetchMethod={fetchProducts} pagination/>}/>
        </Routes>
      </BrowserRouter>);
        expect(screen.getByTestId('pagination')).toBeDefined();
    });
});