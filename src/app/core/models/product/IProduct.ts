export interface IProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  count: number;
  categoryId: string;
  categoryName: string;
  imageUrl: string | null;
}

export interface ProductsResponse {
  items: IProduct[];
  pageNumber: number;
  totalPages: number;
  isPrevious: boolean;
  isNext: boolean;
}