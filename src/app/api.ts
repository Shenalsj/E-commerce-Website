import axios from "axios";
import { Product } from "../features/product/productTypes"; 

export async function getProducts(): Promise<Product[]> {
  try {
    const response = await axios.get<Product[]>(
      "https://api.escuelajs.co/api/v1/products"
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch products: ");
  }
}

export type CartItems = { [productID: string]: number };
export type CheckoutResponse = { success: boolean; error?: string };

export async function checkout(items: CartItems): Promise<CheckoutResponse> {
  const modifier = Object.keys(items).length > 0 ? "success" : "error";
  const url = `/checkout-${modifier}.json`;
  await sleep(500);
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(items),
  });
  const data = await response.json();
  if (!data.success) {
    throw new Error(data.error);
  }
  return data as CheckoutResponse;
}

const sleep = (time: number) => new Promise((res) => setTimeout(res, time));
