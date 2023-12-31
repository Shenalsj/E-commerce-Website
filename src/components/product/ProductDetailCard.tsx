import React from 'react';
import { Card, CardContent, CardMedia, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import { Product } from '../../types/productTypes';
import ProductInfo from './ProductInfo';
import '../../styles/ProductDetailCard.scss';

interface ProductDetailCardProps {
  product: Product;
}

const ProductDetailCard: React.FC<ProductDetailCardProps> = ({ product }) => {
  return (
    <>
      <Grid container spacing={1} className="grid-cls">
        <Card className="card-cls">
          <Link to={`/products/${product.id}`}>
            <CardMedia
              component="img"
              alt={product.imageAlt}
              height="140"
              image={product.images}
              className="card-media-cls"
            />
          </Link>

          <CardContent className="card-content-cls">
            <ProductInfo product={product} />
          </CardContent>
        </Card>
      </Grid>
    </>
  );
};

export default ProductDetailCard;
