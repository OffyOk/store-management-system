import { useOrders } from "@/app/hooks/useOrders";
import { useProducts } from "@/app/hooks/useProducts";
import { useUsers } from "@/app/hooks/useUsers";
import { Orders, OrdersProducts, Prod } from "@/app/interfaces/orders.type";
import { Products } from "@/app/interfaces/products.type";
import { Users } from "@/app/interfaces/users.type";
import Link from "next/link";
import Image from "next/image";

const CartView = async ({ params }: { params: { id: string } }) => {
  const orderDetail: Orders = await useOrders(params.id);
  const products: Products[] = await useProducts();
  const users: Users[] = await useUsers();
  const user = users.find((user: Users) => user.id === orderDetail.userId);

  const totalPrice: number = orderDetail.products.reduce(
    (acc: any, current: Prod) => {
      const product = products.find(
        (prod: Products) => current.productId === prod.id
      );
      if (!product) {
        return <div key={current.productId}>N/A</div>;
      } else {
        return acc + product.price * current.quantity;
      }
    },
    0
  );

  return (
    <>
      <div className="sm:col-span-2 md:col-span-4">
        <div className="flex justify-between">
          <div className="text-2xl lg:text-3xl font-semibold">Order Detail</div>
          <div className="bg-green-200 border rounded shadow px-3 py-1">
            <Link href="/carts">Back</Link>
          </div>
        </div>
      </div>
      <div className="sm:col-span-2 md:col-span-4">
        <div className="px-14 py-4 md:p-4 bg-white border border-gray-200 rounded-lg shadow dark:border-white dark:bg-black flex flex-col">
          <div className="flex justify-between">
            <div>
              <span className="font-semibold">Order ID: </span>
              <span className="px-10">{orderDetail.id}</span>
            </div>
            <div>
              <span className="font-semibold">Customer: </span>
              <span className="px-10">
                <Link href={`/users/view/${orderDetail.userId}`}>
                  {user?.username}
                </Link>
              </span>
            </div>
            <div>
              <span className="font-semibold">Order Date: </span>
              <span className="px-10">{orderDetail.date.split("T")[0]}</span>
            </div>
          </div>

          <div className="mt-3">
            <span className="font-semibold">Customer Address: </span>
            <div className="pl-5">
              <span>Number:</span>
              <span className="ml-1">{user?.address.number}</span>
              <span className="ml-5">Street:</span>
              <span className="ml-1">{user?.address.street}</span>
              <span className="ml-5">city:</span>
              <span className="ml-1">{user?.address.city}</span>
              <span className="ml-5">zipcode:</span>
              <span className="ml-1">{user?.address.zipcode}</span>
            </div>
          </div>

          <div className="mt-3">
            <span className="font-semibold">Products in Order: </span>
            <table className="w-full">
              <thead>
                <tr>
                  <th className="w-8/12">Product</th>
                  <th className="w-3/12">Price</th>
                  <th>Quantity</th>
                </tr>
              </thead>
              <tbody>
                {orderDetail.products.map((p: Prod) => {
                  const product = products.find(
                    (prod: Products) => p.productId === prod.id
                  );
                  if (!product) {
                    return <div key={p.productId}>Product not found</div>;
                  } else {
                    return (
                      <tr key={p.productId}>
                        <td className="px-5">{product.title}</td>
                        <td className="text-center">{product.price}</td>
                        <td className="text-center">{p.quantity}</td>
                      </tr>
                    );
                  }
                })}
              </tbody>
              <tfoot>
                <tr className="border-t border-gray-300">
                  <td className="px-5 font-bold">Total</td>
                  <td className="px-5"></td>
                  <td className="text-center">{totalPrice}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartView;
