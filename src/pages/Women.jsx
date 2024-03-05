import React from "react"
import { Box, Container, Typography, Grid} from "@mui/material";
import Header from "../components/Header";
import DisplayProducts from "../components/DisplayProducts/DisplayProducts";
import { getProducts } from "../api/products/productRoutes";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

export default function Women() {


    return (
        <Container maxWidth={false} sx={{ maxWidth: 1400, paddingTop: "95px", textAlign: 'left'  }}>
            <Header />
            <main>
                {/* <section>
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
                                <Typography variant="h4" textAlign="center" >Men2</Typography>
                            </Link>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Link to="/Women" >
                                <Box>
                                    <img src="/assets/WomenRetoCompras.jpeg" style={{ width: "100%" }} />
                                </Box>
                                <Typography variant="h4" textAlign="center" >Women3</Typography>
                            </Link>
                        </Grid>
                    </Grid>
                </section> */}
                <section>
                    <h2 style={{ textAlign: 'left' }}>Women</h2>
                    <DisplayProducts fetchMethod={(options) => getProducts({ ...options, section: "women" })} defaultLimit={24} pagination={true} filter={true} />
                </section>
            </main>
            {/* <Footer /> */}
        </Container >
    );
}