export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
}

export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: 'ADMIN' | 'USER';
}


export interface Order {
  id: number;
  orderStatus: 'IN_PROGRESS' | 'ORDERED' | 'SHIPPED';
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