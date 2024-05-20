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
        <button type="submit" className="mx-auto px-3 py-1 border">
          {currentProduct ? "Update" : "Create"}
        </button>
      </form>
    </>
  );
}
