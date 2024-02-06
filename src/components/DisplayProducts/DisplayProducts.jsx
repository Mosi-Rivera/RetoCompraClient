import Container from "@mui/material/Container";
import Pagination from "@mui/material/Pagination";
import ProductsList from "../ProductsList/ProductsList";
import ProductFilters from "../ProductFilters/ProductFilters";
import { useEffect, useState } from "react";
import { Backdrop, CircularProgress } from "@mui/material";
import { useSearchParams } from "react-router-dom";

const DisplayProducts = ({fetchMethod, filter = false, pagination = false, default_sort = '', default_limit = 24, loading_backdrop = false}) => {
    const [search_params, setSearchParams] = useSearchParams();
    const page = parseInt(search_params.get('page')) || 1;
    const limit = parseInt(search_params.get('limit')) || default_limit;
    const [max_pages, setMaxPages] = useState(0);
    const [products, setProducts] = useState(null);
    const [is_loading, setIsLoading] = useState(false);
    const [backdrop_open, setBackdropOpen] = useState(false);
    const handleFetch = async () => {
        try
        {
            setIsLoading(true);
            const options = Object.fromEntries(search_params.entries());
            options.limit = limit;
            options.page = page;
            const {products: _products, pages} = await fetchMethod(options);
            setProducts(_products);
            setMaxPages(pages);
        }
        catch(err)
        {
            setProducts(null);
        }
        finally
        {
            setIsLoading(false);
        }
    }
    const setPage = (page) => {
        setSearchParams((sp) => {
            const current_params = Object.fromEntries(sp.entries());
            current_params.page = page;
            return current_params;
        });
    }
    useEffect(() => {
        if (is_loading)
            setBackdropOpen(true);
        else
        setTimeout(() => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            setBackdropOpen(false);
        }, 100);
    }, [is_loading]);
    useEffect(
        () => {
            handleFetch();
        },
        [search_params]
    );
    return (
        <Container data-testId='display-products'>
            { filter && <ProductFilters default_sort={default_sort}/> }
            {
                loading_backdrop && <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={backdrop_open}
                    // onClick={handleClose}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
            }
            <ProductsList products={products} />
            {
                pagination && <Pagination
                count={max_pages}
                page={page}
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