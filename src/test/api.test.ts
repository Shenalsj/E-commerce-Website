import { deleteProduct, postNewProduct, updateProduct } from "../app/api"
import { CreateProductRequest, UpdateProductRequest } from "../types/productTypes";
import axios from "axios"

// post new product should post a new product to a fake api
// it should return passed if the right data was passed through it to the back end
let createdProduct: number = 0

test("postNewProduct test", async () => {
    const { data } = await axios.get<{ id: number }[]>(
        "https://api.escuelajs.co/api/v1/categories"
    );

    if (data.length === 0) {
        throw new Error("Got 0 categories.")
    };

    const prodExamp: CreateProductRequest = {
        title: "The Product1",
        price: 100,
        description: "PRO",
        categoryId: data[0].id,
        images: ["https://i.imgur.com/s8WRA2O.jpeg"],
    };

    const newProd = await postNewProduct(prodExamp)
    createdProduct = newProd.id
    expect(newProd.title).toEqual(prodExamp.title)
})


test("updateProduct test", async () => {
    const { data } = await axios.get<{ id: number }[]>(
        "https://api.escuelajs.co/api/v1/products" 
    );

    if (data.length === 0) {
        throw new Error("Got 0 products.")
    };


    const prodExamp: UpdateProductRequest = {
        id: data[0].id,
        title: "Table",
        price: 40
    };

    const updatedProd = await updateProduct(prodExamp)
    expect(updatedProd.title).toEqual(prodExamp.title)
})


test("deleteProduct test", async () => {
    const prodExamp: number = createdProduct

    const deletedProd = await deleteProduct(prodExamp)
    expect(deletedProd).toEqual(true)
})