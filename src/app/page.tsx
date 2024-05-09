import { useProducts } from "./hooks/useProducts";
import { useOrders } from "./hooks/useOrders";
import { useUsers } from "./hooks/useUsers";
import { Products, ReProducts } from "@/app/interfaces/products.type";
import { Orders, OrdersProducts } from "@/app/interfaces/orders.type";
import { Users } from "@/app/interfaces/users.type";
import { link } from "fs";

export default async function Home() {
  const products = await useProducts();
  const orders = await useOrders();
  const users = await useUsers();
  const countProducts: number = products.length;
  const countOrders: number = orders.length;
  const countUsers: number = users.length;

  interface DateQuan {
    date: string;
    quantity: number;
    [key: string]: any; //ยังคิดค่านี้ไม่ออก
  }

  // unique day and sum quantity
  const orderPerday: DateQuan[] = Object.values(
    orders.reduce((acc: DateQuan, order: Orders) => {
      const date = order.date.split("T")[0]; // Extracting just the date part

      if (!acc[date]) {
        acc[date] = {
          date: order.date,
          quantity: order.products.reduce(
            (total, product) => total + product.quantity,
            0
          ),
        };
      } else {
        acc[date].quantity += order.products.reduce(
          (total, product) => total + product.quantity,
          0
        );
      }
      return acc;
    }, {})
  );

  orderPerday.sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return dateA - dateB;
  });

  // rewrite product to new data set
  const reProducts = orders.flatMap((order: Orders) =>
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

  // find total Revenue
  const totalRevenue = reProducts.reduce((acc: number, item: ReProducts) => {
    return acc + item.revenue;
  }, 0);

  // sum repeat product in to unique in array
  const sumAndUnique: ReProducts[] = Object.values(
    reProducts.reduce(
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

  // sort array descending
  sumAndUnique.sort((a: ReProducts, b: ReProducts) => {
    return b.quantity - a.quantity;
  });
  // get 5 first product
  const hotProduct = sumAndUnique.slice(0, 5);
  // console.log(uniqueByIdWithQuantitySum);
  // console.log(hotProduct);
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
        <p>{Math.floor(totalRevenue)}</p>
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
        <ul>
          {orderPerday.map((order: DateQuan) => (
            <li key={order.quantity}>
              date:{order.date},quantity:{order.quantity}
            </li>
          ))}
        </ul>
      </div>
      <div className="bg-blue-400 row-start-3 row-end-5 col-start-4 col-end-6">
        <p>Hot Sales</p>
        <ul>
          {hotProduct.map((p: ReProducts) => (
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
