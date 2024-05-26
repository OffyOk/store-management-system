import { useOrders } from "@/app/hooks/useOrders";
import { Orders } from "@/app/interfaces/orders.type";
import FormCart from "@/app/components/FormCart";

export default async function CreateOrder() {
  const OrderData: Orders = await useOrders();

  return (
    <div className="sm:col-span-2 md:col-span-4">
      <div className="text-2xl lg:text-3xl font-semibold mb-3">
        Create Order
      </div>
      <FormCart pathBack="/orders" />
    </div>
  );
}
