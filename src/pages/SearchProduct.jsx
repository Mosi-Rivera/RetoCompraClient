import React from "react"
import DisplayProducts from "../components/DisplayProducts/DisplayProducts";
import { getSearchedProduct} from "../api/products/productRoutes";
import { useParams } from 'react-router-dom';    


export default function searchProduct() {
    const {searchText} = useParams();

    return (
        <main>
            <section>
                <h2 style={{ textAlign: 'left' }}>Search Product</h2>
                <DisplayProducts fetchMethod={(options) => getSearchedProduct(options,searchText)} defaultLimit={24} pagination={true} filter={true} />
            </section>
        </main>
    );
}
