"use client";
import { useRouter } from "next/navigation";
import FormComponent from "@/app/components/FormComponent";

export default function CreateUser() {
  const router = useRouter();

  return (
    <>
      <div className="sm:col-span-2 md:col-span-4">
        <div className="text-2xl lg:text-3xl font-semibold ">Create User</div>
      </div>
      <div className="sm:col-span-2 md:col-span-4">
        <FormComponent pathBack="/users" />
      </div>
    </>
  );
}
