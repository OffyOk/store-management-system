import Image from "next/image";

async function getProducts() {
  const response = await fetch("https://fakestoreapi.com/products");

  if (!response.ok) {
    throw new Error("Something went wrong: Cannot get product");
  }

  const data = await response.json();
  return data;
}

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: Rating;
}

interface Rating {
  rate: number;
  count: number;
}

async function getOrders() {
  const response = await fetch("https://fakestoreapi.com/carts");

  if (!response.ok) {
    throw new Error("Something went wrong: Cannot get orders");
  }

  const data = await response.json();
  return data;
}

interface Order {
  id: number;
  userId: number;
  date: string; // Assuming date is a string in ISO format like '2020-10-10'
  products: { productId: number; quantity: number }[];
}

async function getProductDetail(id: number) {
  const response = await fetch(`https://fakestoreapi.com/products/${id}`);

  if (!response.ok) {
    throw new Error("Something went wrong: cannot get product detail");
  }

  const data = await response.json();
  return data;
}

interface Detail {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: Rating;
}

interface Rating {
  rate: number;
  count: number;
}

interface AllProducts {
  productId: number;
  quantity: number;
}

const countCustomer: number = 22;
const countProducts: number = 32;
const countOrders: number = 348; //sum of orders quantity

export default async function Home() {
  const products = await getProducts();
  const orders = await getOrders();
  const price = async (id: number) => {
    const response = await getProductDetail(id);
    return response.price;
  };

  const AllProductsInCart = orders.map((order: Order) =>
    order.products.map((product: AllProducts) => ({
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
      const pricc = products.find((product: Product) => product.id == curr.id);
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
        <p>{countOrders}</p>
      </div>
      <div className="row-start-2 row-end-3 col-start-4 col-end-5">
        <p>Customers:</p>
        <p>{countCustomer}</p>
      </div>
      <div className="bg-blue-400 row-start-2 row-end-3 col-start-5 col-end-6">
        <p>Products:</p>
        <p>{countProducts}</p>
      </div>
      <div className="row-start-3 row-end-5 col-start-2 col-end-4">
        <p>Product Orders/day</p>
        <ul>
          {orders.map((order: Order) => (
            <li key={order.id}>
              {order.products.map((p) => (
                <p key={p.productId}>
                  {price(p.productId)}--
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
          {orders.map((order: Order) => (
            <li key={order.id}>
              {order.products.map((p) => (
                <p key={p.productId}>
                  {price(p.productId)}--
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
