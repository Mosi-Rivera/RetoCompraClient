import { Box, Container, Typography, Grid } from "@mui/material";
import Header from "../components/Header";
import DisplayProducts from "../components/DisplayProducts/DisplayProducts";
import { getProducts } from "../api/products/productRoutes";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";


const Home = () => {
  return (
    <Container maxWidth={false} sx={{ maxWidth: 1400, paddingTop: "95px" }}>
      <Header />
      <main>
        <section>
          <div className="full" style={{
            width: '100%',
          }}>
            <Box sx={{ display: { xs: "block", md: "none" } }}>
              <img src="/assets/Background.jpg" style={{ width: "100%" }} />
            </Box>
            <Box sx={{ display: { xs: "none", md: "block" } }}>
              <img src="/assets/Background2.jpeg" style={{ width: "100%" }} />
            </Box>
          </div>
          <Grid container columnSpacing={4} marginTop={3}>
            <Grid item xs={12} md={6}>
              <Link to="/Men" >
                <Box>
                  <img src="/assets/MenRetoCompras.jpg" style={{ width: "100%" }} />
                </Box>
                <Typography variant="h4" textAlign="center" >Men</Typography>
              </Link>
            </Grid>
            <Grid item xs={12} md={6}>
              <Link to="/Women" >
                <Box>
                  <img src="/assets/WomenRetoCompras.jpeg" style={{ width: "100%" }} />
                </Box>
                <Typography variant="h4" textAlign="center" >Women</Typography>
              </Link>
            </Grid>
          </Grid>
        </section>
        <section>
          <h2 style={{ textAlign: 'center' }}>Popular Products</h2>
          <DisplayProducts fetchMethod={getProducts} defaultSort="popular" defaultLimit={4} />
        </section>
      </main>
      {/* <Footer /> */}
    </Container >
  );
}

export default Home;
