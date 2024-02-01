import react from 'react'
import {render, screen} from '@testing-library/react';
import { beforeEach, expect } from 'vitest';
import Product from '../Product';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

describe("Product Component", () => {
    const product_obj = {
        name: "test name",
        assets: {thumbnail: "https://media.istockphoto.com/id/483960103/photo/blank-black-t-shirt-front-with-clipping-path.jpg?s=612x612&w=0&k=20&c=d8qlXILMYhugXGw6zX7Jer2SLPrLPORfsDsfRDWc-50="},
        price:{
          value: 19.99,
          currency: 'USD'
        },
        _id: "123456",
        brand: "NIKE",
        product: "654321"
    };

    test("Should render product.", () => {
      render(<BrowserRouter>
        <Routes>
          <Route path='/' element={<Product product={product_obj}/>}/>
        </Routes>
      </BrowserRouter>);
        expect(screen.getByText(product_obj.name)).toBeDefined();
        expect(screen.getByText(product_obj.price.value + ' ' + product_obj.price.currency)).toBeDefined();
        expect(screen.getByText(product_obj.brand)).toBeDefined();
    });
});