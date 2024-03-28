import React, { useState, useEffect, useMemo, useContext } from "react"
import { Button, Container, Grid, Box, Typography, MenuItem, Select } from "@mui/material";
import Header from "../components/Header";
import DisplayProducts from "../components/DisplayProducts/DisplayProducts";
import { getProductInfo } from "../api/products/productRoutes";
import { useParams, Link, useNavigate } from 'react-router-dom';
import userContext from "../contexts/userContext";
import { addItem } from "../api/cart/cart_routes";


const productSize = [
    "XS",
    "S",
    "M",
    "L",
    "XL",

]

export default function ProductInfo() {


    const { userInfo, setUserInfo } = useContext(userContext);
    const { productId } = useParams();
    const [productInfo, setProductInfo] = useState(null)
    const [selectedStock, setSelectedStock] = useState("")
    const [selectedQuantity, setSelectedQuantity] = useState("")

    function openSignUp() {
        console.log("openingModal")
    }

    function handleAddToCart() {
        if (!productInfo || !selectedStock || !selectedQuantity) 
                return 
        try { 
            addItem(productInfo.variant._id, selectedStock, selectedQuantity)
            
        } catch (err) {
            console.log(err)
        }
    }

    function stockFilter(sizeString) {
        return productInfo?.variant?.stock[sizeString].stock > 0;
    }
    const sizeItems = useMemo(() => productSize.filter(stockFilter).map(stockItem => (
        <MenuItem key={stockItem} value={stockItem}>
            {stockItem}
        </MenuItem>
    )), [productInfo])

    useEffect(() => {
        async function getInfo() {
            try {
                const returnedProductInfo = await getProductInfo(productId)
                setProductInfo(returnedProductInfo)

            } catch (error) {
                console.log(error)
            }
        }
        getInfo()

    }, [productId])

    const handleStockChange = (event) => {
        setSelectedStock(event.target.value)
    };

    const handleStockQuantity = (event) => {
        setSelectedQuantity(event.target.value)

    };

    if (!productInfo)
        return <h3> Product not available </h3>

    return (
        <main>
            <section>
                <h2 style={{ textAlign: 'left' }}>Product Detail Information</h2>

                <Grid container columnSpacing={4} marginTop={3}>
                    <Grid item xs={12} md={6}>

                        <img src={productInfo?.variant?.assets?.thumbnail} width="80%" />

                    </Grid>
                    <Grid item xs={12} md={6}>

                        <Typography variant="h6" gutterBottom>
                            <h3> Description:
                                {productInfo?.variant?.product?.description} </h3>
                            <h3>Brand:
                                {productInfo?.variant?.product?.brand} </h3>
                            <Box display="flex"> <h3>Size:</h3>
                                <Select value={selectedStock} onChange={handleStockChange}>
                                    {sizeItems}
                                </Select>
                            </Box>
                            <Box display="flex"><h3>Quantity:</h3>
                                <Select value={selectedQuantity} onChange={handleStockQuantity} disabled={!selectedStock}>
                                    {selectedStock && new Array(Math.min(5, productInfo?.variant?.stock?.[selectedStock].stock || 0)).fill().map((_, i) => <MenuItem value={i + 1}>{i + 1} </MenuItem>)}
                                </Select>
                            </Box>

                            <h3>Price:
                                ${productInfo?.variant?.price?.value} </h3>
                            <h3> Colors:
                                <Grid container >
                                    {productInfo?.colors.map(colorInfo => <Grid item>
                                        <Link to={"/product/" + colorInfo._id} > <img src={colorInfo?.assets?.thumbnail} width="30px" />
                                        </Link>
                                    </Grid>)}
                                </Grid> </h3>
                        </Typography>
                        <Button onClick={handleAddToCart} variant="contained" color="primary" disabled={!userInfo?.isAuthenticated || !productInfo || !selectedStock || !selectedQuantity}>
                            Add to Cart
                        </Button>
                        {!userInfo?.isAuthenticated && <Typography onClick={openSignUp} sx={{ cursor: "hover", textDecoration: "underline" }}>
                            To add item to cart, please log-in.
                        </Typography>}

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
    )
}
