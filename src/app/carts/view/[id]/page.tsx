import { useOrderDetail } from "@/app/hooks/useOrders";
import { useProducts } from "@/app/hooks/useProducts";
import { useUsers } from "@/app/hooks/useUsers";
import { Orders, OrdersProducts } from "@/app/interfaces/orders.type";
import { Products } from "@/app/interfaces/products.type";
import { Users } from "@/app/interfaces/users.type";
import Link from "next/link";
import Image from "next/image";

const CartView = async ({ params }: { params: { id: number } }) => {
  const orderDetail: Orders = await useOrderDetail(params.id);
  const products: Products[] = await useProducts();
  const users: Users[] = await useUsers();
  const user = users.find((user: Users) => user.id === orderDetail.userId);

  const totalPrice: number = orderDetail.products.reduce(
    (acc: any, current: OrdersProducts) => {
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
            <span className="font-semibold">Products in Order: </span>
            <table className="w-full">
              <thead>
                <tr>
                  <th className="w-8/12">Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                </tr>
              </thead>
              <tbody>
                {orderDetail.products.map((p: OrdersProducts) => {
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
                <tr>
                  <td className="px-5">Total</td>
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
