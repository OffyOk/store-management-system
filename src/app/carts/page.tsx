import { useUsers } from "../hooks/useUsers";
import { useOrders } from "../hooks/useOrders";
import { useProducts } from "../hooks/useProducts";
import { Users } from "../interfaces/users.type";
import { Orders, OrdersProducts, OrdersUsers } from "../interfaces/orders.type";
import { Products } from "../interfaces/products.type";
import SearchFormOrders from "../components/SearchFormOrders";

export default async function CartList() {
  const users: Users[] = await useUsers();
  const orders: Orders[] = await useOrders();
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
          date: order.date.split("T")[0].replaceAll("-", "/"),
          fullName: user.name.firstname + " " + user.name.lastname,
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

      if (dateA.getTime() !== dateB.getTime()) {
        return dateB.getTime() - dateA.getTime();
      }

      return a.fullName.localeCompare(b.fullName);
    }
  );

  return (
    <div className="sm:col-span-2 md:col-span-4">
      <div className="text-2xl lg:text-3xl font-semibold">Carts</div>
      <SearchFormOrders initialData={sortOrdersUsers} />
    </div>
  );
}
