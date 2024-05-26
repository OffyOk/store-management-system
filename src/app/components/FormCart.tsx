"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { OrdersUsers, Prod } from "../interfaces/orders.type";
import { Products } from "../interfaces/products.type";

interface FormCartProps {
  initOrder?: OrdersUsers;
  initProd?: Products[];
  initTotal?: number;
  pathBack: string;
  viewMode?: boolean;
}

export default function FormCart({
  initOrder,
  initProd,
  initTotal,
  pathBack,
  viewMode = false,
}: FormCartProps) {
  const router = useRouter();

  const itemPath = `${pathBack}/${initOrder?.id}`;
  // const updatePath = `${pathBack}/update/${initOrder?.id}`;

  const updateData = async (submitData: OrdersUsers) => {
    try {
      if (!initOrder) {
        const response = await fetch(`https://fakestoreapi.com${pathBack}`, {
          method: "POST",
          body: JSON.stringify(submitData),
        });
      } else {
        const response = await fetch(`https://fakestoreapi.com${itemPath}`, {
          method: "PATCH",
          body: JSON.stringify(submitData),
        });
      }
      router.push(pathBack);
    } catch (e) {
      console.log(e);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OrdersUsers>({
    mode: "onTouched",
    defaultValues: initOrder,
  });

  const onSubmit: SubmitHandler<OrdersUsers> = (submitData) =>
    updateData({ ...submitData });

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="sm:col-span-2 md:col-span-4"
      >
        <div>
          <div className="flex gap-2">
            <div className="w-1/6 space-y-1">
              <label
                className="text-sm font-medium mr-3 capitalize"
                htmlFor="orderId"
              >
                ID
              </label>
              <input
                className="w-full p-2 border border-gray-300 rounded"
                {...register("id")}
                placeholder="orderId"
                id="orderId"
                disabled={viewMode}
              />
            </div>
            <div className="w-1/2 space-y-1">
              <label
                className="text-sm font-medium mr-3 capitalize"
                htmlFor="fullName"
              >
                customer
              </label>
              <input
                className={`w-full p-2 border border-gray-300 rounded ${
                  errors.fullName?.message ? "border-red-500" : ""
                }`}
                {...register("fullName", { required: "fullName is required" })}
                placeholder="fullName"
                id="fullName"
                disabled={viewMode}
              />
              {errors.fullName && (
                <span className="text-red-600 text-sm">
                  {errors.fullName?.message}
                </span>
              )}
            </div>
            <div className="w-1/3 space-y-1">
              <label
                className="text-sm font-medium mr-3 capitalize"
                htmlFor="date"
              >
                date
              </label>
              <input
                className={`w-full p-2 border border-gray-300 rounded ${
                  errors.date?.message ? "border-red-500" : ""
                }`}
                {...register("date", { required: "date is required" })}
                placeholder="date"
                id="date"
                disabled={viewMode}
              />
              {errors.date && (
                <span className="text-red-600 text-sm">
                  {errors.date?.message}
                </span>
              )}
            </div>
          </div>
          <div>
            <h4 className="text-lg font-semibold mt-3">Customer Address:</h4>
            <div className="flex justify-between gap-2">
              <div className="w-1/2 space-y-1">
                <label
                  className="text-sm font-medium mr-3 capitalize"
                  htmlFor="adsNum"
                >
                  no.
                </label>
                <input
                  className={`w-full p-2 border border-gray-300 rounded ${
                    errors.address?.number?.message ? "border-red-500" : ""
                  }`}
                  {...register("address.number", {
                    required: "Address Number is required",
                  })}
                  placeholder="Address Number"
                  id="adsNum"
                  disabled={viewMode}
                />
                {errors.address?.number && (
                  <span className="text-red-600 text-sm">
                    {errors.address?.number?.message}
                  </span>
                )}
              </div>
              <div className="w-1/2 space-y-1">
                <label
                  className="text-sm font-medium mr-3 capitalize"
                  htmlFor="adsStr"
                >
                  street
                </label>
                <input
                  className={`w-full p-2 border border-gray-300 rounded ${
                    errors.address?.street?.message ? "border-red-500" : ""
                  }`}
                  {...register("address.street", {
                    required: "Address Street is required",
                  })}
                  placeholder="Address Street"
                  id="adsStr"
                  disabled={viewMode}
                />
                {errors.address?.street && (
                  <span className="text-red-600 text-sm">
                    {errors.address?.street?.message}
                  </span>
                )}
              </div>
            </div>
            <div className="flex justify-between gap-2">
              <div className="w-1/2 space-y-1">
                <label
                  className="text-sm font-medium mr-3 capitalize"
                  htmlFor="adsCity"
                >
                  city
                </label>
                <input
                  className={`w-full p-2 border border-gray-300 rounded ${
                    errors.address?.city?.message ? "border-red-500" : ""
                  }`}
                  {...register("address.city", {
                    required: "Address City is required",
                  })}
                  placeholder="Address City"
                  id="adsCity"
                  disabled={viewMode}
                />
                {errors.address?.city && (
                  <span className="text-red-600 text-sm">
                    {errors.address?.city?.message}
                  </span>
                )}
              </div>
              <div className="w-1/2 space-y-1">
                <label
                  className="text-sm font-medium mr-3 capitalize"
                  htmlFor="adsZip"
                >
                  zipcode
                </label>
                <input
                  className={`w-full p-2 border border-gray-300 rounded ${
                    errors.address?.zipcode?.message ? "border-red-500" : ""
                  }`}
                  {...register("address.zipcode", {
                    required: "Address Zipcode is required",
                  })}
                  placeholder="Address Zipcode"
                  id="adsZip"
                  disabled={viewMode}
                />
                {errors.address?.zipcode && (
                  <span className="text-red-600 text-sm">
                    {errors.address?.zipcode?.message}
                  </span>
                )}
              </div>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-semibold mt-3">Product in Order:</h4>
            <table className="w-full text-left">
              <thead>
                <tr>
                  <th className="font-medium">Product</th>
                  <th className="font-medium w-16">Price</th>
                  <th className="font-medium w-[66px]">Quantity</th>
                </tr>
              </thead>
              <tbody>
                {initOrder?.products?.map((p) => {
                  const product = initProd?.find(
                    (prod: Products) => p.productId === prod.id
                  );
                  if (!product) {
                    return <div key={p.productId}>Product not found</div>;
                  } else {
                    return (
                      <tr key={p.productId}>
                        <td className="pr-2">{product.title}</td>
                        <td>{product.price}</td>
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
                  <td className="text-center">{initTotal}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        <div className="my-3 col-span-2 md:col-span-4 flex flex-col md:flex-row justify-start mb-3 space-y-2 md:space-y-0 md:space-x-2">
          {!viewMode && (
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white font-semibold border-2 border-green-500 rounded-md transition-all duration-200 ease-in-out hover:bg-green-700 hover:border-green-700"
            >
              {initOrder ? "Update" : "Create"}
            </button>
          )}
          {/* {viewMode && (
            <Link href={updatePath}>
              <button className="w-full px-4 py-2 bg-yellow-500 text-white font-semibold border-2 border-yellow-500 rounded-md transition-all duration-200 ease-in-out hover:bg-yellow-700 hover:border-yellow-700">
                Edit
              </button>
            </Link>
          )} */}
          <Link href={pathBack}>
            <button className="w-full px-4 py-2 bg-red-500 text-white font-semibold border-2 border-red-500 rounded-md transition-all duration-200 ease-in-out hover:bg-red-700 hover:border-red-700">
              Cancel
            </button>
          </Link>
        </div>
      </form>
    </>
  );
}
