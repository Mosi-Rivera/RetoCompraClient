import Container from "@mui/material/Container";
import Pagination from "@mui/material/Pagination";
import ProductsList from "../ProductsList/ProductsList";
import ProductFilters from "../ProductFilters/ProductFilters";
import { useEffect, useState } from "react";
import { Backdrop, CircularProgress } from "@mui/material";
import { useSearchParams } from "react-router-dom";

const DisplayProducts = ({ fetchMethod, filter = false, pagination = false, defaultSort = '', defaultLimit = 24, loadingBackdrop = false }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || defaultLimit;
    const [maxPages, setMaxPages] = useState(0);
    const [products, setProducts] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [backdropOpen, setBackdropOpen] = useState(false);
    const handleFetch = async () => {
        try {
            setIsLoading(true);
            const options = Object.fromEntries(searchParams.entries());
            options.limit = limit;
            options.page = page;
            if (!options.sort)
                options.sort = defaultSort;
            console.log(options)
            const { products: newProducts, pages } = await fetchMethod(options);
            setProducts(newProducts);
            setMaxPages(pages);
        }
        catch (err) {
            setProducts(null);
        }
        finally {
            setIsLoading(false);
        }
    }
    const setPage = (page) => {
        setSearchParams((sp) => {
            const currentParams = Object.fromEntries(sp.entries());
            currentParams.page = page;
            return currentParams;
        });
    }
    useEffect(() => {
        if (isLoading)
            setBackdropOpen(true);
        else
            setTimeout(() => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                setBackdropOpen(false);
            }, 100);
    }, [isLoading]);
    useEffect(
        () => {
            handleFetch();
        },
        [searchParams]
    );
    return (
        <div data-testId='display-products'>
            {filter && <ProductFilters defaultSort={defaultSort} />}
            {
                loadingBackdrop && <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={backdropOpen}
                // onClick={handleClose}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
            }
            <ProductsList products={products} />
            {
                pagination && <Pagination
                    data-testId='pagination'
                    count={maxPages}
                    page={page}
                    onChange={(_, value) => setPage(value)}
                    color="primary"
                    size="large"
                    siblingCount={1}
                    boundaryCount={1}
                    style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}
                />
            }
        </div>
    );
}

export default DisplayProducts;
