import React from "react"
import DisplayProducts from "../components/DisplayProducts/DisplayProducts";
import { getProducts } from "../api/products/productRoutes";

export default function Women() {
    return (
        <main>
            <section>
                <h2 style={{ textAlign: 'left' }}>Women</h2>
                <DisplayProducts fetchMethod={(options) => getProducts({ ...options, section: "women" })} defaultLimit={24} pagination={true} filter={true} />
            </section>
        </main>
    );
}
