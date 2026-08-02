export interface IOrder {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  imageUrl?: string;
}

export interface OrderDetailsResponse {
  id: string;
  orderStatus: string;
  totalAmount: number;
  createdAt: string;
  items: IOrder[];
}
export interface UserOrderResponse {
  id: string;
  orderStatus: string;
  totalAmount: number;
  createdAt: string;
}
