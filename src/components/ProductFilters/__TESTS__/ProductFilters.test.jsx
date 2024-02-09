import react from 'react'
import {render, screen} from '@testing-library/react';
import { beforeEach, expect } from 'vitest';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProductFilters from '../ProductFilters';

describe("Product Component", () => {


    test("Should render.", () => {
        render(<BrowserRouter>
            <Routes>
              <Route path='/' element={<ProductFilters/>}/>
            </Routes>
          </BrowserRouter>);
        expect(screen.getByTestId('product-filters')).toBeDefined();
    });
    test("Should render inputs.", () => {
      render(<BrowserRouter>
        <Routes>
          <Route path='/' element={<ProductFilters/>}/>
        </Routes>
      </BrowserRouter>);
        expect(screen.getByTestId('size-select')).toBeDefined();
        expect(screen.getByTestId('color-select')).toBeDefined();
        expect(screen.getByTestId('sort-select')).toBeDefined();
    });
});