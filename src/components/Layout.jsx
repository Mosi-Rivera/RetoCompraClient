import { Outlet } from "react-router-dom";
import Header from "./Header";
import { Container } from "@mui/material";
import Footer from "./Footer";

export default function Layout() {
    return (
        <Container maxWidth={false} sx={{ maxWidth: 1400, paddingTop: "110px" }}>
            <Header />
            <Outlet />
            <Footer />
        </Container>
    )
}
