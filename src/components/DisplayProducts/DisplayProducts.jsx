import Container from "@mui/material/Container";
import Pagination from "@mui/material/Pagination";
import ProductsList from "../ProductsList/ProductsList";
import ProductFilters from "../ProductFilters/ProductFilters";
import { useEffect, useState } from "react";

const DisplayProducts = ({fetchMethod, filter = false, pagination = false, default_sort = '', default_limit = 24}) => {
    const [filter_state, setFilterState] = useState({
        color: '',
        size: '',
        sort: default_sort
    });
    const [pagination_data, setPaginationData] = useState({
        page: 1,
        limit: default_limit,
        max_pages: 100
    });
    const [products, setProducts] = useState(null);
    const handleFetch = async () => {
        try
        {
            const options = {...filter_state, page: pagination_data.page, limit: pagination_data.limit};
            for (const k in options)
                if (!options[k]) delete options[k];
            const _products = await fetchMethod(options);
            setProducts(_products);
        }
        catch(err)
        {
            setProducts(null);
        }
    }
    const setPage = (page) => {
        setPaginationData({...pagination_data, page});
    }
    useEffect(
        () => {
            handleFetch()
            window.scrollTo(0, 0);
        },
        [
            filter_state.color,
            filter_state.size,
            filter_state.sort,
            pagination_data.page,
            pagination_data.limit
        ]
    );
    return (
        <Container>
            { filter && <ProductFilters setFilterState={setFilterState} filter_state={filter_state}/> }
            <ProductsList products={products} />
            {
                pagination && <Pagination
                count={pagination_data.max_pages}
                page={pagination_data.page}
                onChange={(_, value) => setPage(value)}
                color="primary"
                size="large"
                siblingCount={1}
                boundaryCount={1}
                style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}
                />
            }
        </Container>
    );
}

export default DisplayProducts;