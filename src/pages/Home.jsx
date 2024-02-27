import { FolderCopyOutlined } from "@mui/icons-material";
import { Box, Container, Typography } from "@mui/material";
import Header from "../components/Header";
import DisplayProducts from "../components/DisplayProducts/DisplayProducts";
import { getProducts } from "../api/products/productRoutes";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
// import "../styles/Home.css";

const Home = () => {
  return (
    <Container maxWidth={false} sx={{maxWidth: 1400 , paddingTop: "95px"}}>
      <Header />
      <main>
        <section>
          <div  className="full" style={{
          width: '100%',
          height: "500px",
          maxHeight: "100vh",
          overflow: 'hidden',
          backgroundImage: "url(/public/assets/Background.jpg)",
          backgroundSize: "cover",
          }}> 
          </div> 
          <Box sx={{display:"flex" , width: "100%", justifyContent:"space-between", marginTop: "1rem"}}>
            <Link to="/Men" style={{flex:"1", marginRight: "8px"}} > 
              <Box sx={{width: "100%", paddingTop: "400px", backgroundSize: "cover", backgroundImage:"url(/public/assets/MenRetoCompras.jpg)"}} > 
              </Box> 
              <Typography variant="h4" textAlign="center" >Men</Typography> 
            </Link>
            <Link to="/Women" style={{flex:"1", marginLeft: "8px"}} > 
              <Box sx={{width: "100%" , paddingTop: "400px", backgroundSize: "cover", backgroundImage:"url(/public/assets/WomenRetoCompras.jpg)"}} > 
                
              </Box> 
              <Typography variant="h4" textAlign="center" >Women</Typography> 
            </Link>
          </Box>
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
