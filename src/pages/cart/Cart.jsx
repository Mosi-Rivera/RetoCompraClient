import { Box, Container } from "@mui/material";
import Header from "../../components/Header";
import { getCart } from "../../api/cart/cart_routes";
import { useEffect, useState } from "react";
import CartItem from "../../components/cart_components/CartItem/CartItem";


const CartPage = () => {
  const [cartInfo, setCartInfo] = useState(null);
  useEffect(() => {
    (async () => {
      try {
        const newCartInfo = await getCart();
        console.log(newCartInfo)
        setCartInfo(newCartInfo);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  if (!cartInfo)
    return (<h1>No Cart Found</h1>);
  return (
    <Container>
      <Header/>
      <section>
        {
          cartInfo.cart?.length == 0 ? 
          <h1>Cart is empty</h1>
          :
          <Box>
              <Box>
                {cartInfo.cart.map((item) => <CartItem key={'cart-item-' + item._id} item={item}/>)}
              </Box>
            
          </Box>
        }
      </section>
    </Container>
  );
}

export default CartPage;
