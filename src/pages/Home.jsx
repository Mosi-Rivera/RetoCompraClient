import { Container, Typography } from "@mui/material";
import Header from "../components/Header";
import DisplayProducts from "../components/DisplayProducts/DisplayProducts";
import { getProducts } from "../api/products/productRoutes";
import Footer from "../components/Footer";
import "../styles/Home.css";

const Home = () => {
  return (
    <Container disableGutters maxWidth={false} sx={{maxWidth: "1920px", position: "relative"}}> 
      <Header/>
      <main className="home">
        <section className="image">
          <div>
          </div>
        </section>
        <section>
          <Container disableGutters maxWidth={false} sx={{maxWidth: '1440px', textAlign: "center", padding: "0px 2rem"}}>
            <div style={{width: "100%", borderBottom: "1px solid #e1e1e1", marginBottom: "4rem"}}>
              <div style={{maxWidth: '90%', margin: "0 auto", paddingBottom: "2rem"}}>
                <Typography variant="h2" paddingY={5} fontSize="2.5rem">Explore Our Top Picks</Typography>
                <Typography lineHeight="1.5rem" fontSize="1.1rem" variant="body1">
                  Dive into our curated selection of premium shirts that are making waves in the style world. From timeless classics to contemporary must-haves, each piece is meticulously chosen for its quality and sophistication. Elevate your wardrobe effortlessly with our top picks, setting the standard for refined fashion.
                </Typography>
              </div>
            </div>
            <DisplayProducts fetchMethod={getProducts} defaultSort="popular" defaultLimit={6}/> 
          </Container>
        </section>
      </main>
      <Footer/>
    </Container>
  );
}

export default Home;
