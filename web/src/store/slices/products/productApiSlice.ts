import { Product } from "../../../types";
import { apiSlice } from "../apiSlice";
import { ProductRequest } from "./types";


export const productApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query<Product[], void>({
            query: () => ({
                url: "/products"
            })
        }),
        addProduct: builder.mutation<Product, ProductRequest>({
            query: (newProduct) => ({
                url: "/products",
                method: "POST",
                body: newProduct
            })
        }),
        updateProduct: builder.mutation<Product, {id: number, product: ProductRequest}>({
            query: ({id, product}) => ({
                url: `/products/${id}`,
                method: "PUT",
                body: product
            })
        }),
        deleteProduct: builder.mutation<void, {id: number}>({
            query: (id) => ({
                url: `/products/${id}`,
                method: "DELETE"
            })
        })
    })
})

export const {
    useGetProductsQuery,
    useAddProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation
} = productApiSlice