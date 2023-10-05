import React from "react";
import Slider from "./slider/Slider";
import ProductList from "../components/product/ProductList";

import Categoryy from "./category/Categoryy"


const Home: React.FC = () => {
  return (
    <div>
      <Slider />
      <Categoryy/>
      <ProductList />
       
    </div>
  );
};

export default Home;
