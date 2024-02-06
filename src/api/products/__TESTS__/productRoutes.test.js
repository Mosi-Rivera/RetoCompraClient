import { describe, expect, test } from "vitest";
import { getProducts } from "../productRoutes";

describe("Get products", () => {
    test("Should not get error", () => {
        expect(getProducts()).resolves.not.toThrowError();
    });
    test("Should sort.", async () => {
        const products = await getProducts({sort: "high"});
        expect(products).not.toBeNull();
        let lastPrice = null;
        for (const {price} of products)
        {
            if (!lastPrice) lastPrice = price;
            expect(price).toBeLessThanOrEqual(lastPrice);
        }
    });
    test("Should search by field.", async () => {
        const brand = "NIKE";
        const products = await getProducts({brand});
        expect(products).not.toBeNull();
        for (const {brand: productBrand} of products)
            expect(productBrand).toBe(brand);
    });
    test("Should return page limit or less documents", async () => {
        const limit = 3;
        const products = await getProducts({limit});
        expect(products.length).lessThanOrEqual(limit);
    });
});

//NOTE: TESTING FETCH METHODS MIGHT BE USELESS?