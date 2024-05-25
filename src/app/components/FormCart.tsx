"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { OrdersUsers } from "../interfaces/orders.type";

interface FormCartProps {
  initialData?: OrdersUsers;
  pathBack: string;
  viewMode?: boolean;
}

export default function FormCart({
  initialData,
  pathBack,
  viewMode = false,
}: FormCartProps) {
  const router = useRouter();

  const itemPath = `${pathBack}/${initialData?.id}`;
  const updatePath = `${pathBack}/update/${initialData?.id}`;

  const updateData = async (submitData: OrdersUsers) => {
    try {
      if (!initialData) {
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
    defaultValues: initialData,
  });

  const onSubmit: SubmitHandler<OrdersUsers> = (submitData) =>
    updateData({ ...submitData });

  // Date --> better if use date picker
  // fullname --> search in full name and select from exist user
  // or saerch from email below and after select auto fill email
  // email -----> auto fill after select user
  // phone --> auto fill after select use
  // product,amount --> select product and amount from list?
  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid gap-4 sm:grid-cols-2 md:grid-cols-4"
      >
        <div className="col-span-2 space-y-2 flex flex-col">
          <label className="text-sm font-medium mr-3 capitalize" htmlFor="date">
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
            <span className="text-red-600 text-sm">{errors.date?.message}</span>
          )}
        </div>
        <div className="col-span-2 space-y-2 flex flex-col">
          <label
            className="text-sm font-medium mr-3 capitalize"
            htmlFor="fullName"
          >
            fullName
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
        <div className="col-span-2 space-y-2 flex flex-col">
          <label
            className="text-sm font-medium mr-3 capitalize"
            htmlFor="email"
          >
            email
          </label>
          <input
            className={`w-full p-2 border border-gray-300 rounded ${
              errors.email?.message ? "border-red-500" : ""
            }`}
            {...register("email", { required: "email is required" })}
            placeholder="email"
            id="email"
            disabled={viewMode}
          />
          {errors.email && (
            <span className="text-red-600 text-sm">
              {errors.email?.message}
            </span>
          )}
        </div>
        <div className="col-span-2 space-y-2 flex flex-col">
          <label
            className="text-sm font-medium mr-3 capitalize"
            htmlFor="phone"
          >
            phone
          </label>
          <input
            className={`w-full p-2 border border-gray-300 rounded ${
              errors.phone?.message ? "border-red-500" : ""
            }`}
            {...register("phone", { required: "phone is required" })}
            placeholder="phone"
            id="phone"
            disabled={viewMode}
          />
          {errors.phone && (
            <span className="text-red-600 text-sm">
              {errors.phone?.message}
            </span>
          )}
        </div>
        <div className="col-span-2 space-y-2 flex flex-col">
          <label
            className="text-sm font-medium mr-3 capitalize"
            htmlFor="amount"
          >
            amount
          </label>
          <input
            className={`w-full p-2 border border-gray-300 rounded ${
              errors.amount?.message ? "border-red-500" : ""
            }`}
            {...register("amount", { required: "amount is required" })}
            placeholder="amount"
            id="amount"
            disabled={viewMode}
          />
          {errors.amount && (
            <span className="text-red-600 text-sm">
              {errors.amount?.message}
            </span>
          )}
        </div>

        <div className="col-span-2 md:col-span-4 flex flex-col md:flex-row justify-start mb-3 space-y-2 md:space-y-0 md:space-x-2">
          {!viewMode && (
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white font-semibold border-2 border-green-500 rounded-md transition-all duration-200 ease-in-out hover:bg-green-700 hover:border-green-700"
            >
              {initialData ? "Update" : "Create"}
            </button>
          )}
          {viewMode && (
            <Link href={updatePath}>
              <button className="w-full px-4 py-2 bg-yellow-500 text-white font-semibold border-2 border-yellow-500 rounded-md transition-all duration-200 ease-in-out hover:bg-yellow-700 hover:border-yellow-700">
                Edit
              </button>
            </Link>
          )}
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
