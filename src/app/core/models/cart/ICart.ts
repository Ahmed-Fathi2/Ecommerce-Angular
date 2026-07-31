export interface ICart {
  id: string;
  userId: string;
  items: ICartItem[];
  totalCartPrice: number;
}

export interface ICartItem {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  imageUrl: string;
}