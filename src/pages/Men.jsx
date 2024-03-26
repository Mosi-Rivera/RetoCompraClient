import React from "react"
import DisplayProducts from "../components/DisplayProducts/DisplayProducts";
import { getProducts } from "../api/products/productRoutes";

export default function Men() {
    return (
        <main>
            <section>
                <h2 style={{ textAlign: 'left' }}>Mens</h2>
                <DisplayProducts fetchMethod={(options) => getProducts({ ...options, section: "men" })} defaultSort="popular" defaultLimit={24} pagination={true} filter={true} />
            </section>
        </main>
    );
}

