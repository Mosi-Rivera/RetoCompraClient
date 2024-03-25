import React, { useState , useEffect } from "react"
import { Button, Container, Grid, Box, Typography } from "@mui/material";
import Header from "../components/Header";
import DisplayProducts from "../components/DisplayProducts/DisplayProducts";
import { getProductInfo} from "../api/products/productRoutes";
import { useParams, Link, useNavigate } from 'react-router-dom';    

export default function ProductInfo() {

    const {productId} = useParams();
    
    const [productInfo, setProductInfo]= useState(null)

    const navigate = useNavigate()
   
    useEffect(() => {
        async function getInfo() {
            try {
                const returnedProductInfo = await getProductInfo(productId)
                setProductInfo(returnedProductInfo) 
                console.log(returnedProductInfo)
    
            } catch(error) {
                console.log(error)
            }    
        }
            getInfo()

    }, [])
    
        if (!productInfo)
            return <h3> Product not available </h3>
    

    return (
        <Container maxWidth={false} sx={{ maxWidth: 1400, paddingTop: "95px", textAlign: 'left'  }}>
            <Header />
            <main>
                {/* { productInfo ?  : <h3> Product not available </h3>} */}

                <section>
                    <h2 style={{ textAlign: 'left' }}>Product Information</h2>

                    <Grid container columnSpacing={4} marginTop={3}>
                        <Grid item xs={12} md={6}> 

                        <img src={productInfo?.variant?.assets?.thumbnail} width="100%" />
                        
                     {/* --> Product Image (thumbnail) */}
                
                        </Grid>
                            <Grid item xs={12} md={6}>
                            {/* --> Product Description divide by Boxes
                            --> include button to buy --> not authen  */}
                            <Typography variant="h6" gutterBottom>
                            Description
                            {productInfo?.variant?.product?.brand}

                           <Grid container >
                            {productInfo?.colors.map(colorInfo => <Grid item> 
                                <Link onClick={()=> navigate(0)} to= {"/product/" + colorInfo._id} > <img src={colorInfo?.assets?.thumbnail} width="30px"/>
                                </Link>
                                </Grid>)}
                            </Grid>

                        </Typography>
                            <Button variant="contained" color="primary">
                             Add to Cart
                            </Button>

                        </Grid>

                    </Grid>
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
