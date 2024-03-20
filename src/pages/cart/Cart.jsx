import { Box, Button, Grid, IconButton, Typography } from "@mui/material";
import { getCart, setItemQuantity, removeItem } from "../../api/cart/cart_routes";
import { useContext, useEffect, useMemo, useState } from "react";
import CartItem from "../../components/cart_components/CartItem/CartItem";
import { Link } from "react-router-dom";
import { grey } from "@mui/material/colors";
import userContext from "../../contexts/userContext";
import { Close } from "@mui/icons-material";
import { useTheme } from "@emotion/react";


const CartPage = ({closeDrawer}) => {
  const {userInfo, setUserInfo} = useContext(userContext);
  const theme = useTheme();
  const borderColor = theme.palette.border.main;
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
          if (item.variant._id === sku) {
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
    if (cart) {
      const newUserInfo = userInfo;
      newUserInfo.user.cart = cart.items.map(item => ({_id: item.variant, quantity: item.quantity, size: item.size }));
      setUserInfo({
        ...newUserInfo
      });
    }
  }, [cart]);

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
  return (<></>);
  return (
    <Box style={{position: 'relative', overflowY: 'hidden', display: 'flex', flexDirection: 'column', height: '100%', width: '350px', maxWidth: '100vw'}}>
      <Box zIndex={2} padding={2} paddingBottom={0.5} borderBottom={'1px solid ' + borderColor} sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
        <Typography variant="h6" fontWeight="bold">Shopping Cart ({itemsCount})</Typography>
        <IconButton onClick={closeDrawer}><Close/></IconButton>
      </Box>
      {
        cart.items?.length == 0 ? 
          <Box height='100%' display='flex' alignItems='center'>
            <Typography width='100%' variant="h5" textAlign='center'>Your Shopping Cart is empty.</Typography>
          </Box>
          :
          <>
            <Box display='flex' flex={1} justifyContent="space-between" flexDirection='column' overflow='auto' paddingBottom='230px'>
              <Box padding={2} flex={1}>
                {cart.items.map((item) => <CartItem
                  key={'cart-item-' + item.variant._id + item.size}
                  item={item}
                  handleSetQuantity={handleUpdateQuantity}
                  handleRemove={handleRemoveItem}
                />)}
              </Box>
              <Box padding={2} position='absolute' bottom={0} right={0} bgcolor='white' width={'100%'}>
                <Box backgroundColor={grey[200]} padding={2} borderRadius={1}>
                  <Typography variant="body1" fontWeight={'bold'}>Order Summary</Typography>
                  <hr/>
                  <Box display="flex" justifyContent="space-between"><Typography variant="body1">subtotal</Typography><Typography fontWeight="bold" variant="body1">${totalPrice}</Typography></Box>
                  <Box display="flex" justifyContent="space-between"><Typography>Delivery Cost</Typography><Typography fontWeight="bold" variant="body1">${0}</Typography></Box>
                  <Box display="flex" justifyContent="space-between"><Typography fontWeight="bold" variant="body1">Estimated Total</Typography><Typography fontWeight="bold" variant="body1">${totalPrice}</Typography></Box>
                </Box>
                <Box marginTop={2}>
                  <Button fullWidth variant="contained" color="success" disableElevation>Checkout</Button>
                </Box>
              </Box>
            </Box>
          </>
      }
    </Box>
  );
}

export default CartPage;
