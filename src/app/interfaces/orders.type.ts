import { Address } from "./users.type";

export interface Orders {
  id: number;
  userId: number;
  date: string; // Assuming date is a string in ISO format like '2020-10-10'
  products: Prod[];
}

export interface Prod {
  productId: number;
  quantity: number;
}

export interface OrdersProducts {
  id: number;
  userId: number;
  date: string;
  amount: number;
}

export interface OrdersUsers {
  id: number;
  date: string;
  products?: Prod[];
  fullName: string;
  email?: string;
  phone?: string;
  address?: Address;
  amount?: number;
}
