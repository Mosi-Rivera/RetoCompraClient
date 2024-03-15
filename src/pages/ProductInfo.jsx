import React, { useState , useEffect } from "react"
import { Button, Container } from "@mui/material";
import Header from "../components/Header";
import DisplayProducts from "../components/DisplayProducts/DisplayProducts";
import { getProductInfo} from "../api/products/productRoutes";
import { useParams } from 'react-router-dom';    

export default function ProductInfo() {

    // const { userInfo, setUserInfo } = useContext(userContext);
    const {productId} = useParams();
    
    const [productInfo, setProductInfo]= useState(null)
   
    useEffect(() => {
        async function getInfo() {
            try {
                const returnedProductInfo = await getProductInfo(productId)
                setProductInfo(returnedProductInfo) 
    
            } catch(error) {
                console.log(error)
            }    
        }
            getInfo()

    })
        if (!productInfo)
            return <h3> Product not available </h3>
       
    return (
        <Container maxWidth={false} sx={{ maxWidth: 1400, paddingTop: "95px", textAlign: 'left'  }}>
            <Header />
            <main>
                {/* { productInfo ?  : <h3> Product not available </h3>} */}

                <section>
                    <h2 style={{ textAlign: 'left' }}>Product Information</h2>

                    {/* <Grid container columnSpacing={4} marginTop={3}>
                        <Grid item xs={12} md={6}> 
                        --> Product Image (thumbnail)
                
                        </Grid>
                            <Grid item xs={12} md={6}>
                            --> Product Description divide by Boxes
                            --> include button to buy --> not authen 

                        </Grid>
                    </Grid> */}
{/* 
                        <div>
                        {userInfo.isAuthenticated ?
                            <AuthenticatedNav handleLogout={handleLogout} role={userInfo.user.role} firstName={userInfo.user.firstName} lastName={userInfo.user.lastName} /> :
                            <NotAuthenticatedNav />
                        }
                        <div>

             */}
                </section>
            </main>
            {/* <Footer /> */}
        </Container >
    );
}
