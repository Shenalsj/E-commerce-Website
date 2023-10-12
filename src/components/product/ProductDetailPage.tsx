import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, Button,Grid } from "@mui/material";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { useAppSelector } from "../../app/hooks";
import { Product } from "../../types/productTypes";
import { addToCart } from "../../features/cart/cartSlice";
import "../../styles/ProductDetailPage.scss"

const ProductDetailPage = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const { productId } = useParams<{ productId: string }>();
  const dispatch = useDispatch();
  console.log(productId, "productId");
  const products = useAppSelector((state) => state.product.products);

  useEffect(() => {
    if (productId) {
      setProduct(products[productId]);
    }
  }, [productId]);

  console.log(product);

  // Function to add product to cart
  const handleAddToCart = (productId: any) => {
    if (productId) {
      dispatch(addToCart(productId));
    }
  };

  return (
    <Grid container spacing={2} className="product-detail-container">
    <Grid item xs={12} sm={6} md={6}>
      <img
        src={product?.images[0]}
        alt=""
        className="product-image"
      />
    </Grid>
    <Grid item xs={12} sm={6} md={6}>
      <Box mt={2}>
        <Typography fontSize={25} fontWeight={"bold"} gutterBottom style={{ textAlign: "left" }}>
          Name: {product?.title}
        </Typography>
        <Typography fontSize={20} gutterBottom style={{ textAlign: "left" }}>
          Description: {product?.description}
        </Typography>
        <Typography gutterBottom fontSize={18} style={{ textAlign: "left" }}>
          Price: ${product?.price}
        </Typography>
        <Button
          variant="contained"
          onClick={() => handleAddToCart(product?.id)}
          style={{ backgroundColor: "#002b6b", marginTop: "10px", marginLeft: "0", marginRight: "10px" }}
        >
          Add to cart
        </Button>
        <Link to="/cart" className="home-link">
          <Button variant="contained" style={{ backgroundColor: "#002b6b", marginTop: "10px", marginLeft: "0", marginRight: "10px" }}>
            Buy Now
          </Button>
        </Link>
      </Box>
    </Grid>
  </Grid>
  );
};

export default ProductDetailPage;
