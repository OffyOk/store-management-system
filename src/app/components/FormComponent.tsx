"use client";
import Link from "next/link";
// import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Name, Users } from "../interfaces/users.type";
import { defaultConfig } from "next/dist/server/config-shared";

export default function FormComponent({ currentProduct, submit }: any) {
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
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
        <div className="flex items-center">
          <label htmlFor="firstname">First Name</label>
          <input
            {...register("name.firstname", {
              required: "first name is required",
            })}
            placeholder="First Name"
            id="firstname"
          />

          {errors.name?.firstname && (
            <span>{errors.name.firstname.message}</span>
          )}
        </div>
        <div className="flex items-center">
          <label htmlFor="lastname">Last Name</label>
          <input
            {...register("name.lastname", {
              required: "last name is required",
            })}
            placeholder="Last Name"
            id="lastname"
          />
          {errors.name?.lastname && <span>{errors.name.lastname.message}</span>}
        </div>
        <div className="flex items-center">
          <label htmlFor="userName">Username</label>
          <input
            {...register("username", { required: "Username is required" })}
            placeholder="Username"
            id="userName"
          />
          {errors.username && <span>{errors.username?.message}</span>}
        </div>
        <div className="flex items-center">
          <label htmlFor="email">Email</label>
          <input
            {...register("email", { required: "Email is required" })}
            placeholder="Email"
            id="email"
          />
          {errors.email && <span>{errors.email?.message}</span>}
        </div>
        <div className="flex items-center">
          <label htmlFor="phoneNumber">Phone number</label>
          <input
            {...register("phone", {
              required: "Phone number is required",
            })}
            placeholder="Phone number"
            id="phoneNumber"
          />
          {errors.phone && <span>{errors.phone?.message}</span>}
        </div>
        <h2>Address</h2>
        <div className="flex items-center">
          <label htmlFor="addressNumber">No.</label>
          <input
            {...register("address.number", {
              required: "number is required",
            })}
            placeholder="number"
            id="addressNumber"
          />
          {errors.address?.number && (
            <span>{errors.address.number.message}</span>
          )}
        </div>
        <div className="flex items-center">
          <label htmlFor="addressStreet">Street</label>
          <input
            {...register("address.street", {
              required: "street is required",
            })}
            placeholder="street"
            id="addressStreet"
          />
          {errors.address?.street && (
            <span>{errors.address.street.message}</span>
          )}
        </div>
        <div className="flex items-center">
          <label htmlFor="addressCity">City</label>
          <input
            {...register("address.city", {
              required: "city is required",
            })}
            placeholder="city"
            id="addressCity"
          />
          {errors.address?.city && <span>{errors.address.city.message}</span>}
        </div>
        <div className="flex items-center">
          <label htmlFor="addressZipcode">Zipcode</label>
          <input
            {...register("address.zipcode", {
              required: "zipcode is required",
            })}
            placeholder="zipcode"
            id="addressZipcode"
          />
          {errors.address?.zipcode && (
            <span>{errors.address.zipcode.message}</span>
          )}
        </div>
        <div className="flex items-center">
          <label htmlFor="Geolat">Latitude</label>
          <input
            {...register("address.geolocation.lat", {
              required: "Latitude is required",
            })}
            placeholder="Latitude"
            id="Geolat"
          />
          {errors.address?.geolocation?.lat && (
            <span>{errors.address.geolocation.lat.message}</span>
          )}
        </div>
        <div className="flex items-center">
          <label htmlFor="GeoLong">Longitude</label>
          <input
            {...register("address.geolocation.long", {
              required: "Longitude is required",
            })}
            placeholder="Longitude"
            id="GeoLong"
          />
          {errors.address?.geolocation?.long && (
            <span>{errors.address.geolocation.long.message}</span>
          )}
        </div>

        <button type="submit" className="mx-auto px-3 py-1 border">
          {currentProduct ? "Update" : "Create"}
        </button>
      </form>
    </>
  );
}
