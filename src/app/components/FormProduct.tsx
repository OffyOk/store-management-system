"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Products } from "../interfaces/products.type";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
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
  const [ImagePreview, setImagePreview] = useState<string | undefined>(
    initialData?.image
  );
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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  {
  }
  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="sm:col-span-2 md:col-span-4"
      >
        <div>
          {ImagePreview && initialData && (
            <div className="my-3 py-3 bg-white rounded-md shadow-lg">
              <Image
                className="h-56 w-full object-contain"
                src={ImagePreview}
                width={500}
                height={500}
                alt="Logo"
              />
            </div>
          )}
          <div className="">
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
              {...register("title", { required: "title is required" })}
              placeholder="title"
              id="title"
              disabled={viewMode}
            />
            {errors.title && (
              <span className="text-red-600 text-sm">
                {errors.title?.message}
              </span>
            )}
          </div>
          <div className="">
            <label
              className="text-sm font-medium mr-3 capitalize"
              htmlFor="category"
            >
              category
            </label>
            <input
              className={`w-full p-2 border border-gray-300 rounded ${
                errors.category?.message ? "border-red-500" : ""
              }`}
              {...register("category", { required: "category is required" })}
              placeholder="category"
              id="category"
              disabled={viewMode}
            />
            {errors.category && (
              <span className="text-red-600 text-sm">
                {errors.category?.message}
              </span>
            )}
          </div>
          <div className="flex gap-2">
            <div className="w-1/2">
              <label
                className="text-sm font-medium mr-3 capitalize"
                htmlFor="price"
              >
                price
              </label>
              <input
                className={`w-full p-2 border border-gray-300 rounded ${
                  errors.price?.message ? "border-red-500" : ""
                }`}
                {...register("price", { required: "price is required" })}
                placeholder="price"
                id="price"
                disabled={viewMode}
              />
              {errors.price && (
                <span className="text-red-600 text-sm">
                  {errors.price?.message}
                </span>
              )}
            </div>
            <div className="w-1/2">
              <label
                className="text-sm font-medium mr-3 capitalize"
                htmlFor="rating"
              >
                rating
              </label>
              <input
                className={`w-full p-2 border border-gray-300 rounded ${
                  errors.rating?.rate?.message ? "border-red-500" : ""
                }`}
                {...register("rating.rate", { required: "rating is required" })}
                placeholder="rating"
                id="rating"
                disabled={viewMode}
              />
              {errors.rating?.rate && (
                <span className="text-red-600 text-sm">
                  {errors.rating?.rate?.message}
                </span>
              )}
            </div>
          </div>
          <div className="">
            <label
              className="text-sm font-medium mr-3 capitalize"
              htmlFor="description"
            >
              description
            </label>
            <input
              className={`w-full p-2 border border-gray-300 rounded ${
                errors.description?.message ? "border-red-500" : ""
              }`}
              {...register("description", {
                required: "description is required",
              })}
              type="textarea"
              placeholder="description"
              id="description"
              disabled={viewMode}
            />
            {errors.description && (
              <span className="text-red-600 text-sm">
                {errors.description?.message}
              </span>
            )}
          </div>
          <div className="col-span-2 space-y-2 flex flex-col">
            <label
              className="text-sm font-medium mr-3 capitalize"
              htmlFor="image"
            >
              image
            </label>
            <input
              className={`w-full p-2 border border-gray-300 rounded ${
                errors.image?.message ? "border-red-500" : ""
              }`}
              {...register(
                "image",
                ImagePreview
                  ? {}
                  : {
                      required: "image is required",
                    }
              )}
              placeholder="image"
              id="image"
              type="file"
              disabled={false}
              onChange={handleImageChange}
            />
            {errors.image && (
              <span className="text-red-600 text-sm">
                {errors.image.message}
              </span>
            )}
          </div>
          {ImagePreview && !initialData && (
            <div className="my-3 py-3 bg-white rounded-md shadow-lg">
              <Image
                className="h-56 w-full object-contain"
                src={ImagePreview}
                width={500}
                height={500}
                alt="Logo"
              />
            </div>
          )}
        </div>

        <div className="my-3 col-span-2 md:col-span-4 flex flex-col md:flex-row justify-start mb-3 space-y-2 md:space-y-0 md:space-x-2">
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
