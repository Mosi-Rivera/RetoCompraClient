import { Box, FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import userContext from "../../../contexts/userContext";

const CartItem = ({item}) => {
    const {userInfo, setUserInfo} = useContext(userContext);
    const [quantity, setQuantity] = useState(item.quantity.toString());
    const handleQuantityChange = async (e) => {
        try {
            const newQuantity = e.target.value;
            const {cart, totalPrice} = setCartItemQuantity(item._id, item.size, parseInt(newQuantity));
            setUserInfo({...userInfo, cart, totalPrice});
            setQuantity(newQuantity);
        } catch (error) {
            console.log(error);
        }

    }
    return (
        <Box>
            <Box>
                <Link to={'/productInfo/' + item._id}>
                    <img src={item.image} aria-description="Product image." style={{width: '100px'}}/>
                </Link>
            </Box>
            <Box>
                <Box>
                    <Typography variant="body1" fontWeight='bold'>{item.name}</Typography>
                    <Typography variant="body2">Color: {item?.color}</Typography>
                    <Typography variant="body2">Size: {item?.size}</Typography>
                </Box>
                <Box>
                    <Box>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Quantity</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={quantity}
                            label="Quantity"
                            onChange={handleQuantityChange}
                        >
                            <MenuItem value={1}>1</MenuItem>
                            <MenuItem value={2}>2</MenuItem>
                            <MenuItem value={3}>3</MenuItem>
                            <MenuItem value={4}>4</MenuItem>
                            <MenuItem value={5}>5</MenuItem>
                        </Select>
                    </FormControl>
                    </Box>
                    <Box>
                        <Typography variant="body2">{item.price}</Typography>
                    </Box>
                    <Box>
                        <Typography variant="body2">{item.totalPrice}</Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

export default CartItem;
