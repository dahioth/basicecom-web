
export interface GetOrdersResponse {
    id: number;
    orderStatus: string;
    totalPrice: number;
    user: {
        id: number
    };
    orderLines: OrderLine[];
}



export interface OrderLine {
    id: number;
    product: {
        id: number;
    };
    orderLineQuantity: number;
}

export interface OrderLineToAdd {
    productId: number;
    orderLineQuantity: number;
}

export interface AddOrderRequest {
    orderLines: OrderLineToAdd[]
}

export interface UpdateOrderStatusRequest {
    status: 'IN_PROGRESS' | 'ORDERED' | 'SHIPPED'
}