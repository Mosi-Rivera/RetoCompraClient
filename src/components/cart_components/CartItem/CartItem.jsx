import { DeleteForever } from "@mui/icons-material";
import { Box, FormControl, IconButton, MenuItem, Select, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const CartItem = ({item, handleSetQuantity, handleRemove}) => {
    const quantity = item.quantity;
    const price = item.variant.price.value;
    const totalPrice = (item.variant.price.value * item.quantity).toFixed(2);
    return (
        <Box display="flex" marginBottom={4}>
            <Box marginRight={2}>
                <Link to={'/productInfo/' + item.variant._id}>
                    <img src={item.variant.assets.thumbnail} aria-description="Product image." style={{width: '100px'}}/>
                </Link>
            </Box>
            <Box flex={1}>
                <Box>
                    <Box display='flex' justifyContent='space-between' alignItems='center'>
                        <Typography variant="body1" fontWeight='bold'>{item.variant.product.name}</Typography>
                        <IconButton onClick={() => handleRemove(item.variant._id, item.size)}>
                            <DeleteForever/>
                        </IconButton>
                    </Box>
                    <Box>
                        <Typography variant="body2">Size: {item.size}</Typography>
                    </Box>
                </Box>
                <Box>
                    <Box display="flex" flexDirection='column' justifyContent="space-between">
                        <Typography variant="body1">Quantity:</Typography>
                        <FormControl size="small" sx={{maxWidth: '70px'}}>
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
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Typography variant="body1">Price:</Typography>
                        <Typography variant="body1">${totalPrice}</Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

export default CartItem;
