import Pagination from "@mui/material/Pagination";
import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Product from "../product/Product";

const ProductsList = ({products}) => {
    if (!products)
        return <CircularProgress style={{ margin: '20px auto', display: 'block' }} />;
    return <Container>
        <Grid container justifyContent={products ? "start" : 'center'} sx={{margin: "20px 40px 10px 4px"}} spacing={1}>
        {
            products.map((product) => <Grid item key={product._id} display='flex' flexDirection={'column'} xs={12} sm={6} md={4} lg={3}>
                <Product product={product}/>
            </Grid>)
        }
        </Grid>
    </Container> 
}

export default ProductsList;