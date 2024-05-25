"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { Users } from "../interfaces/users.type";
import Link from "next/link";
import { useRouter } from "next/navigation";

//props = {initialData: {f:val, f:val}, pathBack: "/user"}
//FormComponent(props)
//formcompo ({init})
interface FormCompProps {
  initialData?: Users;
  pathBack: string;
  viewMode?: boolean;
}

export default function FormComponent({
  initialData,
  pathBack,
  viewMode = false,
}: FormCompProps) {
  const router = useRouter();

  const itemPath = `${pathBack}/${initialData?.id}`;
  const updatePath = `${pathBack}/update/${initialData?.id}`;

  const updateData = async (submitData: Users) => {
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
  } = useForm<Users>({
    mode: "onTouched",
    defaultValues: initialData,
  });

  const onSubmit: SubmitHandler<Users> = (submitData) =>
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
            htmlFor="firstname"
          >
            first name
          </label>
          <input
            className={`w-full p-2 border border-gray-300 rounded ${
              errors.name?.firstname?.message ? "border-red-500" : ""
            }`}
            {...register("name.firstname", {
              required: "first name is required",
            })}
            placeholder="First Name"
            id="firstname"
            disabled={viewMode}
          />
          {errors.name?.firstname && (
            <span className="text-red-600 text-sm">
              {errors.name.firstname.message}
            </span>
          )}
        </div>
        <div className="col-span-2 space-y-2  flex flex-col">
          <label className="text-sm font-medium mr-3" htmlFor="lastname">
            Last Name
          </label>
          <input
            className={`w-full p-2 border border-gray-300 rounded ${
              errors.name?.lastname?.message ? "border-red-500" : ""
            }`}
            {...register("name.lastname", {
              required: "last name is required",
            })}
            placeholder="Last Name"
            id="lastname"
            disabled={viewMode}
          />
          {errors.name?.lastname && (
            <span className="text-red-600 text-sm">
              {errors.name.lastname.message}
            </span>
          )}
        </div>
        <div className="col-span-2 space-y-2 flex flex-col">
          <label className="text-sm font-medium mr-3" htmlFor="userName">
            Username
          </label>
          <input
            className={`w-full p-2 border border-gray-300 rounded ${
              errors.username?.message ? "border-red-500" : ""
            }`}
            {...register("username", { required: "Username is required" })}
            placeholder="Username"
            id="userName"
            disabled={viewMode}
          />
          {errors.username && (
            <span className="text-red-600 text-sm">
              {errors.username?.message}
            </span>
          )}
        </div>
        <div className="col-span-2 space-y-2 flex flex-col">
          <label className="text-sm font-medium mr-3" htmlFor="email">
            Email
          </label>
          <input
            className={`w-full p-2 border border-gray-300 rounded ${
              errors.email?.message ? "border-red-500" : ""
            }`}
            {...register("email", { required: "Email is required" })}
            placeholder="Email"
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
          <label className="text-sm font-medium mr-3" htmlFor="phoneNumber">
            Phone number
          </label>
          <input
            className={`w-full p-2 border border-gray-300 rounded ${
              errors.phone?.message ? "border-red-500" : ""
            }`}
            {...register("phone", {
              required: "Phone number is required",
            })}
            placeholder="Phone number"
            id="phoneNumber"
            disabled={viewMode}
          />
          {errors.phone && (
            <span className="text-red-600 text-sm">
              {errors.phone?.message}
            </span>
          )}
        </div>
        <h2 className="col-span-2 md:col-span-4 text-md font-medium mt-3">
          Address
        </h2>
        <div className="col-span-1 space-y-2 flex flex-col">
          <label className="text-sm font-medium mr-3" htmlFor="addressNumber">
            No.
          </label>
          <input
            className={`w-full p-2 border border-gray-300 rounded ${
              errors.address?.number?.message ? "border-red-500" : ""
            }`}
            {...register("address.number", {
              required: "number is required",
            })}
            placeholder="number"
            id="addressNumber"
            disabled={viewMode}
          />
          {errors.address?.number && (
            <span className="text-red-600 text-sm">
              {errors.address.number.message}
            </span>
          )}
        </div>
        <div className="col-span-1 space-y-2 flex flex-col">
          <label className="text-sm font-medium mr-3" htmlFor="addressStreet">
            Street
          </label>
          <input
            className={`w-full p-2 border border-gray-300 rounded ${
              errors.address?.street?.message ? "border-red-500" : ""
            }`}
            {...register("address.street", {
              required: "street is required",
            })}
            placeholder="street"
            id="addressStreet"
            disabled={viewMode}
          />
          {errors.address?.street && (
            <span className="text-red-600 text-sm">
              {errors.address.street.message}
            </span>
          )}
        </div>
        <div className="col-span-1 space-y-2 flex flex-col">
          <label className="text-sm font-medium mr-3" htmlFor="addressCity">
            City
          </label>
          <input
            className={`w-full p-2 border border-gray-300 rounded ${
              errors.address?.city?.message ? "border-red-500" : ""
            }`}
            {...register("address.city", {
              required: "city is required",
            })}
            placeholder="city"
            id="addressCity"
            disabled={viewMode}
          />
          {errors.address?.city && (
            <span className="text-red-600 text-sm">
              {errors.address.city.message}
            </span>
          )}
        </div>
        <div className="col-span-1 space-y-2 flex flex-col">
          <label className="text-sm font-medium mr-3" htmlFor="addressZipcode">
            Zipcode
          </label>
          <input
            className={`w-full p-2 border border-gray-300 rounded ${
              errors.address?.zipcode?.message ? "border-red-500" : ""
            }`}
            {...register("address.zipcode", {
              required: "zipcode is required",
            })}
            placeholder="zipcode"
            id="addressZipcode"
            disabled={viewMode}
          />
          {errors.address?.zipcode && (
            <span className="text-red-600 text-sm">
              {errors.address.zipcode.message}
            </span>
          )}
        </div>
        <div className="col-span-1 space-y-2 flex flex-col">
          <label className="text-sm font-medium mr-3" htmlFor="Geolat">
            Latitude
          </label>
          <input
            className={`w-full p-2 border border-gray-300 rounded ${
              errors.address?.geolocation?.lat?.message ? "border-red-500" : ""
            }`}
            {...register("address.geolocation.lat", {
              required: "Latitude is required",
            })}
            placeholder="Latitude"
            id="Geolat"
            disabled={viewMode}
          />
          {errors.address?.geolocation?.lat && (
            <span className="text-red-600 text-sm">
              {errors.address.geolocation.lat.message}
            </span>
          )}
        </div>
        <div className="col-span-1 space-y-2 flex flex-col">
          <label className="text-sm font-medium mr-3" htmlFor="GeoLong">
            Longitude
          </label>
          <input
            className={`w-full p-2 border border-gray-300 rounded ${
              errors.address?.geolocation?.long?.message ? "border-red-500" : ""
            }`}
            {...register("address.geolocation.long", {
              required: "Longitude is required",
            })}
            placeholder="Longitude"
            id="GeoLong"
            disabled={viewMode}
          />
          {errors.address?.geolocation?.long && (
            <span className="text-red-600 text-sm">
              {errors.address.geolocation.long.message}
            </span>
          )}
        </div>
        {/* <div className="col-span-2 md:col-span-4 flex justify-start mb-3"> */}
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
