import { FolderCopyOutlined } from "@mui/icons-material";
import { Container } from "@mui/material";
import Header from "../components/Header";
import DisplayProducts from "../components/DisplayProducts/DisplayProducts";
import { getProducts } from "../api/products/productRoutes";
import Footer from "../components/Footer";
// import "../styles/Home.css";

const Home = () => {
  return (
    <Container disableGutters maxWidth={false} sx={{ maxWidth: "1920px", position: "relative" }}>
      <Header />
      <main>
        <section className="full" style={{
          width: '100%',
          height: "1280px",
          maxHeight: "100vh",
          overflow: 'hidden',
          backgroundImage: "url(/public/assets/Background.jpg)",
          backgroundSize: "cover",
  
        }}>
          
        </section>
        <section>
          <h2 style={{ textAlign: 'center' }}>Popular Products</h2>
          <DisplayProducts fetchMethod={getProducts} defaultSort="popular" defaultLimit={4} />
        </section>
      </main>
      {/* <Footer /> */}
    </Container>
  );
}

export default Home;
