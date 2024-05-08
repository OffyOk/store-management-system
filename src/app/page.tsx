import { useProducts, useProductDetail } from "./hooks/useProducts";
import { useOrders } from "./hooks/useOrders";
import { Products } from "@/app/interfaces/products.type";
import { Orders, OrdersProducts } from "@/app/interfaces/orders.type";

// const countCustomer: number = 22;
// const countProducts: number = 32;
// const countOrders: number = 348; //sum of orders quantity

export default async function Home() {
  const products = await useProducts();
  const orders = await useOrders();
  const Price = async (id: number) => {
    const response = await useProductDetail(id);
    return response.price;
  };

  const AllProductsInCart = orders.map((order: Orders) =>
    order.products.map((product: OrdersProducts) => ({
      id: product.productId,
      quantity: product.quantity,
    }))
  );

  interface AllCart {
    id: number;
    quantity: number;
  }

  const curr = 0;
  const TotalRevenue: number = AllProductsInCart.flat().reduce(
    (accum: number, curr: AllCart) => {
      const pricc = products.find((product: Products) => product.id == curr.id);
      if (pricc) {
        const currentPrice = curr.quantity * pricc.price;
        return accum + currentPrice;
      } else {
        console.log("fetch revenue error!!");
        return accum;
      }
    },
    0
  );

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
        <p>{Math.floor(TotalRevenue)}</p>
      </div>
      <div className="bg-blue-400 row-start-2 row-end-3 col-start-3 col-end-4">
        <p>Orders:</p>
        <p>asdfsdf</p>
      </div>
      <div className="row-start-2 row-end-3 col-start-4 col-end-5">
        <p>Customers:</p>
        <p>asdfsdf</p>
      </div>
      <div className="bg-blue-400 row-start-2 row-end-3 col-start-5 col-end-6">
        <p>Products:</p>
        <p>asdfsfd</p>
      </div>
      <div className="row-start-3 row-end-5 col-start-2 col-end-4">
        <p>Product Orders/day</p>
        <ul>
          {orders.map((order: Orders) => (
            <li key={order.id}>
              {order.products.map((p) => (
                <p key={p.productId}>
                  {Price(p.productId)}--
                  {p.quantity}
                </p>
              ))}
            </li>
          ))}
        </ul>
      </div>
      <div className="bg-blue-400 row-start-3 row-end-5 col-start-4 col-end-6">
        <p>Hot Sales</p>
        <ul>
          {orders.map((order: Orders) => (
            <li key={order.id}>
              {order.products.map((p) => (
                <p key={p.productId}>
                  {Price(p.productId)}--
                  {p.quantity}
                </p>
              ))}
            </li>
          ))}
        </ul>
      </div>
      <div className="bg-white row-start-5 row-end-7 col-start-2 col-end-6">
        asdfdsf
      </div>
    </>
  );
}
