"use client";
import { useRouter } from "next/navigation";
import FormComponent from "@/app/components/FormComponent";
import { Users } from "@/app/interfaces/users.type";
import Link from "next/link";

export default function CreateUser() {
  const router = useRouter();
  const createUser = async (user: Users) => {
    try {
      const response = await fetch("https://fakestoreapi.com/users", {
        method: "POST",
        body: JSON.stringify(user),
      });
      const data = await response.json();
      console.log("200");
      console.log(data);
      router.push("/users");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <div className="sm:col-span-2 md:col-span-4">
        <div className="flex justify-between">
          <div className="text-2xl lg:text-3xl font-semibold ">Create User</div>
          <div className="bg-green-200 border rounded shadow px-3 py-1">
            <Link href="/users">Back</Link>
          </div>
        </div>
      </div>
      <div className="sm:col-span-2 md:col-span-4">
        <FormComponent submit={createUser} />
      </div>
    </>
  );
}
