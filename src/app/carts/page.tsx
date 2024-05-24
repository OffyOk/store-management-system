import { useUsers } from "../hooks/useUsers";
import { useOrders } from "../hooks/useOrders";
import { useProducts } from "../hooks/useProducts";
import { Users } from "../interfaces/users.type";
import { Orders, OrdersProducts, OrdersUsers } from "../interfaces/orders.type";
import { Products } from "../interfaces/products.type";
import DelButton from "../components/button/DelButton";
import Link from "next/link";
import SearchFormOrders from "../components/SearchFormOrders";

export default async function CartList() {
  const orders: Orders[] = await useOrders(); // order: [{id:1,userId:A,date:...,products:[{productId:...,quantity:3},...{}]},...,{}]
  const users: Users[] = await useUsers();
  // we want to know who is this userId ,and what product in a cart
  // so we will go in to each order then use UserId to match with id from Users
  const products: Products[] = await useProducts();

  const ordersProducts: OrdersProducts[] = orders.map((order: Orders) => {
    let totalAmount = 0;

    order.products.forEach((item) => {
      const product = products.find((p: Products) => p.id === item.productId);

      if (product) {
        totalAmount += product.price * item.quantity;
      }
    });

    return {
      id: order.id,
      userId: order.userId,
      date: order.date,
      amount: totalAmount,
    };
  });

  const ordersUsers: OrdersUsers[] = ordersProducts.map(
    (order: OrdersProducts) => {
      const user = users.find((u: Users) => u.id === order.userId);
      if (!user) {
        throw new Error("user not found");
      } else {
        return {
          id: order.id,
          date: order.date.split("T")[0],
          fullName: user.name.firstname + "" + user.name.lastname,
          email: user.email,
          phone: user.phone,
          address: user.address,
          amount: order.amount,
        };
      }
    }
  );

  const sortOrdersUsers: OrdersUsers[] = ordersUsers.sort(
    (a: OrdersUsers, b: OrdersUsers) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);

      // First, compare the dates
      if (dateA.getTime() !== dateB.getTime()) {
        return dateB.getTime() - dateA.getTime(); // Descending order
      }

      // If dates are the same, compare by fullName
      return a.fullName.localeCompare(b.fullName);
    }
  );

  return (
    <>
      <div className="sm:col-span-2 md:col-span-4">
        <div className="flex justify-start">
          <div className="text-2xl lg:text-3xl font-semibold">Carts</div>
        </div>
      </div>
      <SearchFormOrders initialData={sortOrdersUsers} />
    </>
  );
}
