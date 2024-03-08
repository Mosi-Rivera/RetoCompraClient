import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/system';
import { NavLink } from 'react-router-dom';

const ProductContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  overflow: 'hidden',
}));

const ProductImage = styled(Box)(({ thumbnail }) => ({
  width: '100%',
  height: '0',
  paddingBottom: '120%', // 4:3 aspect ratio for the thumbnail
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center center',
  backgroundImage: `url(${thumbnail})`,
  backgroundColor: '#0000001f'
}));

const ProductContent = styled(Box)({
  textAlign: 'left',
  padding: '8px',
  paddingBottom: '2rem',
  width: '100%',
});

const Product = ({ product }) => {
  const { assets, product: product_info, price, _id } = product;
  const brand = product_info?.brand ? product_info.brand : '';
  const name = product_info?.name ? product_info.name : '';
  const thumbnail = assets?.thumbnail ? assets.thumbnail : '';

  return (<NavLink to={`/product/${_id}`}>
        <ProductContainer data-testid='product-container'>
            <ProductImage data-testid='product-image' thumbnail={thumbnail} />
            <ProductContent>
                <Typography variant="subtitle2" color="textSecondary">
                {brand}
                </Typography>
                <Typography variant="body1">
                {name}
                </Typography>

                <Typography variant="body1">
                ${price && price.value}
                </Typography>
            </ProductContent>
        </ProductContainer>
  </NavLink>
  );
};

export default Product;
