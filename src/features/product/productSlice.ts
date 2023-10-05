import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "../product/productTypes"; 




export interface ProductsState {
  products: { [id: string]: Product };
  searchResults: Product[]; 
}

const initialState: ProductsState = {
  products: {},
  searchResults: [], 
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    receivedProducts(state, action: PayloadAction<Product[]>) {
      const products = action.payload;
      products.forEach((product) => {
        state.products[product.id] = product;
      });
    },
    sortByPrice: (state, action: PayloadAction<"asc" | "desc">) => {
      const sortedProductsArray = Object.values(state.products);

      if (action.payload === "asc") {
        sortedProductsArray.sort((a, b) => a.price - b.price);
      } else {
        sortedProductsArray.sort((a, b) => b.price - a.price);
      }

      state.products = sortedProductsArray.reduce((acc, product) => {
        acc[product.id] = product;
        return acc;
      }, {} as { [id: string]: Product });
    },
    setSearchResults(state, action: PayloadAction<Product[]>) {
      state.searchResults = action.payload;
    },
  },
});

export const { receivedProducts,setSearchResults  } = productsSlice.actions;
export default productsSlice.reducer;
