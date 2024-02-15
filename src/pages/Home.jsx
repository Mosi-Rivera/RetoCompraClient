import { Container } from "@mui/material";
import Header from "../components/Header";
import DisplayProducts from "../components/DisplayProducts/DisplayProducts";
import { getProducts } from "../api/products/productRoutes";
import Footer from "../components/Footer";
import "../styles/Home.css";

const Home = () => {
  return (
    <Container disableGutters maxWidth={false} sx={{maxWidth: "1920px", position: "relative"}}> 
      <Header/>
      <main>
        <section className="full" style={{
          width: '100%',
          paddingTop: "56px",
          maxHeight: "100vh",
          overflow: 'hidden'
        }}>
          <video preload="auto" autoPlay muted loop style={{
            objectFit: 'cover',
            width: '100%',
            height: '100%',
            display: "block",
            overflow: "hidden",
          }} src="/assets/video_of_women_modelling (1080p).mp4" type="video/mp4"/>
        </section>
        <section>
          <h2 style={{textAlign: 'center'}}>Popular Products</h2>
          <DisplayProducts fetchMethod={getProducts} defaultSort="popular" defaultLimit={4}/> 
        </section>
      </main>
      <Footer/>
    </Container>
  );
}

export default Home;
