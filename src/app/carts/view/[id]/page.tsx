import FormCart from "@/app/components/FormCart";
import { useUsers } from "@/app/hooks/useUsers";
import { useOrders } from "@/app/hooks/useOrders";
import { useProducts } from "@/app/hooks/useProducts";
import { Users } from "@/app/interfaces/users.type";
import { Orders, OrdersUsers, Prod } from "@/app/interfaces/orders.type";
import { Products } from "@/app/interfaces/products.type";

const CartView = async ({ params }: { params: { id: string } }) => {
  const order: Orders = await useOrders(params.id);
  const users: Users[] = await useUsers();
  const products: Products[] = await useProducts();
  const user = users.find((u: Users) => u.id === order.userId);
  const orderUser: OrdersUsers = {
    id: order.id,
    date: order.date.split("T")[0].replaceAll("-", "/"),
    products: order.products,
    fullName: user?.name.firstname + " " + user?.name.lastname,
    email: user?.email,
    phone: user?.phone,
    address: user?.address,
  };

  const totalPrice: number = order.products.reduce(
    (acc: any, current: Prod) => {
      const product = products.find((prod) => prod.id === current.productId);
      if (!product) {
        return <div key={current.productId}>N/A</div>;
      } else {
        return acc + product.price * current.quantity;
      }
    },
    0
  );

  return (
    <div className="sm:col-span-2 md:col-span-4">
      <div className="text-2xl lg:text-3xl font-semibold mb-3">
        <h1>Order Detail</h1>
      </div>
      <FormCart
        initOrder={orderUser}
        initProd={products}
        initTotal={totalPrice}
        pathBack="/carts"
        viewMode={true}
      />
    </div>
  );
};

export default CartView;
