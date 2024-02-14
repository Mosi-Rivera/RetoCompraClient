import Pagination from "@mui/material/Pagination";
import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Product from "../product/Product";

const ProductsList = ({products}) => {
    return <Grid data-testId='products-container' container justifyContent={products ? "start" : 'center'} sx={{padding: "0px 2.5em"}} spacing={1}>
        {
            products && products.map((product) => <Grid item key={product._id} boxSizing={"border-box"} display='flex' flexDirection={'column'} xs={12} sm={6} md={4} lg={3}>
                <Product product={product}/>
            </Grid>)
        }
        </Grid>
}

export default ProductsList;
