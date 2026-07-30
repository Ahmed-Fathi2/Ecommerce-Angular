export interface IProductDetails {
  id: string;
  name: string;
  description: string;
  price: number;
  count: number;
  categoryId: string;
  categoryName: string;
  categoryDescription: string;
  imageUrl: string|null;
}