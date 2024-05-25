"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { Users } from "../interfaces/users.type";
import Link from "next/link";

export default function FormComponent({
  currentProduct,
  submit,
  pathBack,
}: any) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Users>({
    mode: "onTouched",
    defaultValues: currentProduct,
  });

  const onSubmit: SubmitHandler<Users> = (data) => submit({ ...data });

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid gap-4 sm:grid-cols-2 md:grid-cols-4"
      >
        <div className="col-span-2 space-y-2 flex flex-col">
          <label className="text-sm font-medium mr-3" htmlFor="firstname">
            First Name
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
          />
          {errors.address?.geolocation?.long && (
            <span className="text-red-600 text-sm">
              {errors.address.geolocation.long.message}
            </span>
          )}
        </div>
        {/* <div className="col-span-2 md:col-span-4 flex justify-start mb-3"> */}
        <div className="col-span-2 md:col-span-4 flex flex-col md:flex-row justify-start mb-3 space-y-2 md:space-y-0 md:space-x-2">
          <button
            type="submit"
            className="px-4 py-2 bg-green-500 text-white font-semibold border-2 border-green-500 rounded-md transition-all duration-200 ease-in-out hover:bg-green-700 hover:border-green-700"
          >
            {currentProduct ? "Update" : "Create"}
          </button>
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
