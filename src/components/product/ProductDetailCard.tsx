import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Grid,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { addToCart } from "../../features/cart/cartSlice";
import { Product } from "../../types/productTypes";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"; // Import the cart icon
import "../../styles/ProductDetailCard.scss";


interface ProductDetailCardProps {
  product: Product;
}

const ProductDetailCard: React.FC<ProductDetailCardProps> = ({ product }) => {
  const dispatch = useDispatch();
  const handleAddToCart = (productId: string) => {
    dispatch(addToCart(productId));
  };

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
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              className="card-title-cls"
            >
              {product.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {product.description}
            </Typography>
            <Typography variant="body2" color="text.primary">
              ${product.price}
            </Typography>
            <Button
              onClick={() => handleAddToCart(product.id)}
              variant="contained"
              style={{ backgroundColor: '#002b6b', color: 'white' }} 
              startIcon={<ShoppingCartIcon />} // Add the cart icon to the button
            >
              Add to Cart
            </Button>
            
          </CardContent>
        </Card>
      </Grid>
      </>
   
  );
};

export default ProductDetailCard;
