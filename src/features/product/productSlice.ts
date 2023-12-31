import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import type {
  CreateProductRequest,
  Product,
  ProductResponse,
  UpdateProductRequest,
} from "../../types/productTypes";
import { deleteProduct, postNewProduct, updateProduct } from "../../app/api";

export interface ProductsState {
  products: { [id: string]: Product };
  newProduct: CreateProductRequest;
  updProduct: UpdateProductRequest;
  delProduct: boolean;
  searchResults: Product[];
}

const initialState: ProductsState = {
  products: {},
  searchResults: [],
  newProduct: {
    title: "",
    price: 0,
    description: "",
    categoryId: 0,
    images: [],
  },
  updProduct: {
    id: 0,
    title: "",
    price: 0,
  },
  delProduct: false,
};

export const postNewProductAsync = createAsyncThunk(
  "products/postNewProduct",
  async (productData: CreateProductRequest) => {
    const response = await postNewProduct(productData);
    return response;
  }
);

export const updateProductAsync = createAsyncThunk(
  "products/updateProduct",
  async ({ id, title, price }: UpdateProductRequest) => {
    const response = await updateProduct({ id, title, price });
    return response;
  }
);

export const deleteProductAsync = createAsyncThunk(
  "products/deleteProduct",
  async (id: number) => {
    const response = await deleteProduct(id);
    return response;
  }
);

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
      const sortedProductsArray = state.searchResults;

      if (action.payload === "asc") {
        sortedProductsArray.sort((a, b) => a.price - b.price);
      } else {
        sortedProductsArray.sort((a, b) => b.price - a.price);
      }

      state.searchResults = sortedProductsArray;
    },
    setSearchResults(state, action: PayloadAction<Product[]>) {
      state.searchResults = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        postNewProductAsync.fulfilled,
        (state, action: PayloadAction<ProductResponse>) => {
          const categoryId = action.payload.category.id;
          const { title, price, description, images } = action.payload;
          state.newProduct = { title, price, description, images, categoryId };
        }
      )
      .addCase(
        updateProductAsync.fulfilled,
        (state, action: PayloadAction<ProductResponse>) => {
          state.updProduct = action.payload;
        }
      )
      .addCase(
        deleteProductAsync.fulfilled,
        (state, action: PayloadAction<boolean>) => {
          state.delProduct = action.payload;
        }
      );
  },
});

export const { receivedProducts, setSearchResults, sortByPrice } =
  productsSlice.actions;
export default productsSlice.reducer;
