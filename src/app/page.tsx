import { useProducts } from "./hooks/useProducts";
import { useOrders } from "./hooks/useOrders";
import { useUsers } from "./hooks/useUsers";
import { Products, ReProducts } from "@/app/interfaces/products.type";
import {
  Orders,
  OrdersProducts,
  OrdersUsers,
} from "@/app/interfaces/orders.type";
import { Users } from "./interfaces/users.type";
import LineChart from "@/app/components/chart";
import Link from "next/link";
import SearchFormOrders from "./components/SearchFormOrders";

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

  const chartData = {
    labels: orderPerday.map((o) => o.date.split("T")[0]),
    datasets: [
      {
        label: "Sales",
        data: orderPerday.map((o) => o.quantity),
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
      },
    ],
  };

  // rewrite product to new data set
  const reProducts = orders.flatMap((order: Orders) =>
    order.products.map((item) => {
      const product = products.find((p: Products) => p.id === item.productId);
      if (product) {
        return {
          id: product.id,
          title: product.title,
          price: product.price,
          quantity: item.quantity,
          image: product.image,
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
        <div className="flex justify-between">
          <div className="text-2xl lg:text-3xl font-semibold">Dashboard</div>
          <Link href="https://store-offyok.vercel.app">
            <button className="flex items-center gap-1 px-3 py-2 bg-blue-600 text-white text-base font-medium rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300">
              Customer View
            </button>
          </Link>
        </div>
      </div>
      <div className="px-14 py-4 md:p-4 bg-white border border-gray-200 rounded-lg shadow dark:border-white dark:bg-black flex justify-between items-center">
        <span>Revenue:</span>
        <span className="text-2xl font-semibold">
          {Math.floor(totalRevenue)}
        </span>
      </div>
      <div className="px-14 py-4 md:p-4 bg-white border border-gray-200 rounded-lg shadow dark:border-white dark:bg-black flex justify-between items-center">
        <span>Orders:</span>
        <span className="text-2xl font-semibold">{countOrders}</span>
      </div>
      <div className="px-14 py-4 md:p-4 bg-white border border-gray-200 rounded-lg shadow dark:border-white dark:bg-black flex justify-between items-center">
        <span>Customers:</span>
        <span className="text-2xl font-semibold">{countUsers}</span>
      </div>
      <div className="px-14 py-4 md:p-4 bg-white border border-gray-200 rounded-lg shadow dark:border-white dark:bg-black flex justify-between items-center">
        <span>Products:</span>
        <span className="text-2xl font-semibold">{countProducts}</span>
      </div>
      <div className="p-4 bg-white border border-gray-200 rounded-lg shadow dark:border-white dark:bg-black sm:col-span-2 md:col-span-2">
        <p className="text-xl font-semibold">Sales/day</p>
        {/* <ul>
          {orderPerday.map((order: DateQuan) => (
            <li key={order.quantity}>
              date:{order.date},quantity:{order.quantity}
            </li>
          ))}
        </ul> */}
        <div className="h-72">
          <LineChart data={chartData} />
        </div>
      </div>
      <div className="p-4 bg-white border border-gray-200 rounded-lg shadow dark:border-white dark:bg-black sm:col-span-2 md:col-span-2">
        <p className="text-xl font-semibold">Hot Sales</p>
        <table className="w-full">
          <thead>
            <tr>
              <th>Product</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {hotProduct.map((p: ReProducts) => {
              return (
                <tr
                  className="border-t border-neutral-200 dark:border-white/50"
                  key={p.id}
                >
                  <td>{p.title}</td>
                  <td className="text-center">{p.quantity}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="p-4 bg-white border border-gray-200 rounded-lg shadow col-span-auto sm:col-span-2 md:col-span-4  dark:border-white dark:bg-black">
        <p className="text-xl font-semibold">Recent Order</p>
        <SearchFormOrders initialData={sortOrdersUsers} fromDash={true} />
      </div>
    </>
  );
}
