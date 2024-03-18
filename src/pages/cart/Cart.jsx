import { Box, Button, Container, Grid, Typography } from "@mui/material";
import Header from "../../components/Header";
import { getCart, setItemQuantity, removeItem } from "../../api/cart/cart_routes";
import { useContext, useEffect, useMemo, useState } from "react";
import CartItem from "../../components/cart_components/CartItem/CartItem";
import { Link } from "react-router-dom";
import { grey } from "@mui/material/colors";
import userContext from "../../contexts/userContext";


const CartPage = () => {
  const {userInfo, setUserInfo} = useContext(userContext);
  const [cart, setCart] = useState(null);

  const itemsCount = useMemo(() => cart?.items.reduce(
    (acc, item) => acc + item.quantity, 0
  ) || 0, [cart?.items]);
  const totalPrice = useMemo(() => cart?.items.reduce(
    (acc, item) => acc + item.quantity * item.variant.price.value, 0
  ).toFixed(2) || 0, [cart?.items]);

  const handleUpdateQuantity = async (sku, size, quantity) => {
    try {
      await setItemQuantity(sku, size, quantity);
      setCart({
        items: cart.items.map(item => {
          if (item.variant._id === sku)
          {
            item.quantity = quantity;
            return item;
          }
          return (item);
        })
      });
    } catch (error) {
      console.log(error);
    }
  }

  const handleRemoveItem = async (sku, size) => {
    try {
      await removeItem(sku, size);
      setCart({items: cart.items.filter(item => !(item.variant._id === sku && item.size === size))});
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    (async () => {
      try {
        const newCart = await getCart();
        setCart(newCart);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  if (!cart)
  return (<h1>No Cart Found</h1>);
  return (
    <Container sx={{marginTop: '2rem'}}>
      <Header/>
      <section>
        {
          cart.items?.length == 0 ? 
            <>
              <Typography variant="h5" textAlign='center'>Your Shopping Cart is empty.</Typography>
              <hr/>
            </>
            :
            <>
              <h1>Shopping Cart ({itemsCount})</h1>
              <hr/>
              <Grid container>
                <Grid item xs={12} md={8} order={{xs: 2, md: 1}} sx={{padding: "1rem"}}>
                  {cart.items.map((item) => <CartItem
                    key={'cart-item-' + item.variant._id + item.size}
                    item={item}
                    handleSetQuantity={handleUpdateQuantity}
                    handleRemove={handleRemoveItem}
                  />)}
                </Grid>
                <Grid item xs={12} md={4} order={{xs: 1, md: 2}} sx={{padding: "1rem"}}>
                  <Box backgroundColor={grey[200]} padding={2} borderRadius={1}>
                    <Typography variant="body1" fontWeight={'bold'}>Order Summary</Typography>
                    <hr/>
                    <Box display="flex" justifyContent="space-between"><Typography variant="body1">subtotal</Typography><Typography fontWeight="bold" variant="body1">${totalPrice}</Typography></Box>
                    <Box display="flex" justifyContent="space-between"><Typography>Delivery Cost</Typography><Typography fontWeight="bold" variant="body1">${0}</Typography></Box>
                    <Box display="flex" justifyContent="space-between"><Typography fontWeight="bold" variant="body1">Estimated Total</Typography><Typography fontWeight="bold" variant="body1">${totalPrice}</Typography></Box>
                  </Box>
                  <hr/>
                  <Box>
                    <Button fullWidth variant="contained" color="success" disableElevation>Checkout</Button>
                  </Box>
                  <hr/>
                  <Box>
                    <Link to='/'><Button fullWidth variant="outlined">Continue Shopping</Button></Link>
                  </Box>
                </Grid>
              </Grid>
            </>
        }
      </section>
    </Container>
  );
}

export default CartPage;
