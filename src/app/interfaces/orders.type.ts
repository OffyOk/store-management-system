export interface Orders {
  id: number;
  userId: number;
  date: string; // Assuming date is a string in ISO format like '2020-10-10'
  products: { productId: number; quantity: number }[];
}

export interface OrdersProducts {
  productId: number;
  quantity: number;
}
