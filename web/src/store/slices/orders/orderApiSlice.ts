import { Order } from "../../../types";
import { apiSlice } from "../apiSlice"
import { AddOrderRequest, UpdateOrderStatusRequest } from "./types";


export const orderApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getOrders: builder.query<Order[], void>({
            query: () => ({
                url: "/orders"
            })
        }),
        addOrder: builder.mutation<Order, AddOrderRequest>({
            query: (order: AddOrderRequest) => ({
                url: "/orders",
                method: "POST",
                body: order
            })
        }),
        updateOrderStatus: builder.mutation<Order, {id: number, newStatus: UpdateOrderStatusRequest}>({
            query: ({id, newStatus}) => ({
                url: `/orders/${id}/status`,
                method: 'PATCH',
                body: newStatus
            })
        })
    })
})

export const {
    useGetOrdersQuery,
    useAddOrderMutation,
    useUpdateOrderStatusMutation
} = orderApiSlice;

