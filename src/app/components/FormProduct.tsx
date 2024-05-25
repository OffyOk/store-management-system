"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Products } from "../interfaces/products.type";

interface FormProductProps {
  initialData?: Products;
  pathBack: string;
  viewMode?: boolean;
}

export default function FormProduct({
  initialData,
  pathBack,
  viewMode = false,
}: FormProductProps) {
  const router = useRouter();

  const itemPath = `${pathBack}/${initialData?.id}`;
  const updatePath = `${pathBack}/update/${initialData?.id}`;

  const updateData = async (submitData: Products) => {
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
  } = useForm<Products>({
    mode: "onTouched",
    defaultValues: initialData,
  });

  const onSubmit: SubmitHandler<Products> = (submitData) =>
    updateData({ ...submitData });

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid gap-4 sm:grid-cols-2 md:grid-cols-4"
      >
        <div className="col-span-2 space-y-2 flex flex-col">
          <label
            className="text-sm font-medium mr-3 capitalize"
            htmlFor="title"
          >
            title
          </label>
          <input
            className={`w-full p-2 border border-gray-300 rounded ${
              errors.title?.message ? "border-red-500" : ""
            }`}
            {...register("title", {
              required: "Title is required",
            })}
            placeholder="title"
            id="title"
            disabled={viewMode}
          />
          {errors.title && (
            <span className="text-red-600 text-sm">{errors.title.message}</span>
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
