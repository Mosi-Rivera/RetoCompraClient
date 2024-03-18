import { Box, FormControl, MenuItem, Select, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const CartItem = ({item, handleSetQuantity, handleRemove}) => {
    const quantity = item.quantity;
    const price = item.variant.price.value;
    const totalPrice = (item.variant.price.value * item.quantity).toFixed(2);
    return (
        <Box display="flex" paddingY={3} sx={{borderBottom: "1px solid grey"}}>
            <Box marginRight={2}>
                <Link to={'/productInfo/' + item._id}>
                    <img src={item.variant.assets.thumbnail} aria-description="Product image." style={{width: '100px'}}/>
                </Link>
            </Box>
            <Box flex={1}>
                <Box>
                    <Typography variant="body1" fontWeight='bold'>{item.variant.product.name}</Typography>
                    <Typography variant="body2">Color: {item.variant.color}</Typography>
                    <Typography variant="body2">Size: {item.size}</Typography>
                </Box>
                <Box>
                    <Box display="flex" justifyContent="space-between" alignItems="flex-end">
                        <Typography variant="body1">Quantity:</Typography>
                        <FormControl size="small">
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={quantity}
                                onChange={e => handleSetQuantity(item.variant._id, item.size, e.target.value)}
                            >
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={3}>3</MenuItem>
                                <MenuItem value={4}>4</MenuItem>
                                <MenuItem value={5}>5</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    <Box display="flex" justifyContent="space-between" alignItems="center" marginTop={2}>
                        <Typography variant="body1">Price:</Typography>
                        <Typography variant="body1">${price}</Typography>
                    </Box >
                    <Box display="flex" justifyContent="space-between" alignItems="center" marginTop={2}>
                        <Typography variant="body1">Total Price:</Typography>
                        <Typography variant="body1">${totalPrice}</Typography>
                    </Box>
                    <Box>
                        <span 
                            style={{textDecoration: 'underline', cursor: 'pointer', padding: '1rem 0px', display: 'inline-block'}}
                            onClick={() => handleRemove(item.variant._id, item.size)}
                        >Remove</span>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

export default CartItem;
