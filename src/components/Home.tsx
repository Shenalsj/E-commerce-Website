import React from "react";
import Slider from "./slider/Slider";
import ProductList from "../components/product/ProductList";

const Home: React.FC = () => {
  return (
    <div>
      <Slider />
      <ProductList />
    </div>
  );
};

export default Home;
