import { useProducts } from "./hooks/useProducts";
import { useOrders } from "./hooks/useOrders";
import { useUsers } from "./hooks/useUsers";
import { Products, reProducts } from "@/app/interfaces/products.type";
import { Orders, OrdersProducts } from "@/app/interfaces/orders.type";

export default async function Home() {
  const products = await useProducts();
  const orders = await useOrders();
  const users = await useUsers();
  const countProducts: number = products.length;
  const countOrders: number = orders.length;
  const countUsers: number = users.length;

  const totalRevenue = orders.reduce((acc: number, order: Orders) => {
    order.products.forEach((item: OrdersProducts) => {
      const product = products.find((p: Products) => p.id === item.productId);
      if (product) {
        const revenue = product.price * item.quantity;
        acc = (acc || 0) + revenue;
      }
    });
    return acc;
  }, 0);

  const reProduct = orders.flatMap((order: Orders) =>
    order.products.map((item: OrdersProducts) => {
      const product = products.find((p: Products) => p.id === item.productId);
      if (product) {
        return {
          id: product.id,
          title: product.title,
          price: product.price,
          quantity: item.quantity,
          revenue: product.price * item.quantity,
        };
      }
      console.log("something went wrong");
    })
  );

  const uniqueByIdWithQuantitySum = Object.values(
    reProduct.reduce(
      (
        acc: { [x: string]: { quantity: number } },
        obj: { id: string | number; quantity: number }
      ) => {
        if (!acc[obj.id]) {
          acc[obj.id] = { ...obj };
        } else {
          acc[obj.id].quantity += obj.quantity;
        }
        return acc;
      },
      {}
    )
  );

  uniqueByIdWithQuantitySum.sort((a, b) => b.quantity - a.quantity);
  const hotProduct = uniqueByIdWithQuantitySum.slice(0, 5);
  console.log(uniqueByIdWithQuantitySum);
  console.log(hotProduct);

  return (
    <>
      <div className="row-start-1 row-end-2 col-start-2 col-end-4">
        Dashboard
      </div>
      <div className="row-start-1 row-end-2 col-start-5 col-end-6">
        Customer View
      </div>
      <div className="row-start-2 row-end-3 col-start-2 col-end-3">
        <p>Revenue:</p>
        {/* <p>{Math.floor(totalRevenue)}</p> */}
      </div>
      <div className="bg-blue-400 row-start-2 row-end-3 col-start-3 col-end-4">
        <p>Orders:</p>
        <p>{countOrders}</p>
      </div>
      <div className="row-start-2 row-end-3 col-start-4 col-end-5">
        <p>Customers:</p>
        <p>{countUsers}</p>
      </div>
      <div className="bg-blue-400 row-start-2 row-end-3 col-start-5 col-end-6">
        <p>Products:</p>
        <p>{countProducts}</p>
      </div>
      <div className="row-start-3 row-end-5 col-start-2 col-end-4">
        <p>Product Orders/day</p>
      </div>
      <div className="bg-blue-400 row-start-3 row-end-5 col-start-4 col-end-6">
        <p>Hot Sales</p>
        <ul>
          {hotProduct.map((p: reProducts) => (
            <li key={p.id}>* {p.title}</li>
          ))}
        </ul>
      </div>
      <div className="bg-white row-start-5 row-end-7 col-start-2 col-end-6">
        <p>Recent Order</p>
      </div>
    </>
  );
}
