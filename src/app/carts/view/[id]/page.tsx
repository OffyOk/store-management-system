import { useOrderDetail } from "@/app/hooks/useOrders";
import { OrdersProducts } from "@/app/interfaces/orders.type";

const Page = async ({ params }: { params: { slug: string; id: number } }) => {
  const orderDetail = await useOrderDetail(params.id);
  return (
    <>
      <div className="sm:col-span-2 md:col-span-4">
        <div className="flex justify-start">
          <div className="text-2xl lg:text-3xl font-semibold">Order Detail</div>
        </div>
      </div>
      <div className="sm:col-span-2 md:col-span-4">
        <div className="flex-col justify-start">
          <div>
            <span>Order ID: </span>
            <span>{orderDetail.id}</span>
          </div>
          <div>
            <span>Customer: </span>
            <span>{orderDetail.userId}</span>
          </div>
          <div>
            <span>Order Date: </span>
            <span>{orderDetail.date}</span>
          </div>
          <div>
            <span>Products in Order: </span>
            <span>
              {orderDetail.products.map((p: OrdersProducts) => (
                <div key={p.productId}>
                  Product: {p.productId} quantity: {p.quantity}
                </div>
              ))}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
