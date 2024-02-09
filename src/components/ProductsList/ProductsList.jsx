import Pagination from "@mui/material/Pagination";
import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Product from "../product/Product";

const ProductsList = ({products}) => {
    return <Container>
        <Grid data-testId='products-container' container justifyContent={products ? "start" : 'center'} sx={{margin: "20px 40px 10px 4px"}} spacing={1}>
        {
            products && products.map((product) => <Grid item key={product._id} display='flex' flexDirection={'column'} xs={12} sm={6} md={4} lg={3}>
                <Product product={product}/>
            </Grid>)
        }
        </Grid>
    </Container> 
}

export default ProductsList;