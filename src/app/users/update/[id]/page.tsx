"use client";
import { useRouter } from "next/navigation";
import FormComponent from "@/app/components/FormComponent";
import { Users } from "@/app/interfaces/users.type";
import { useUsers } from "@/app/hooks/useUsers";

export default function UpdateUser({ params }: { params: { id: string } }) {
  const router = useRouter();
  const UserData = async () => {
    const res = await useUsers(params.id);
    return res;
  };

  const updateUser = async (user: Users) => {
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
      <h1 className="sm:col-span-2 md:col-span-4">Create User</h1>
      <div className="sm:col-span-2 md:col-span-4">
        <FormComponent currentProduct={UserData} submit={updateUser} />
      </div>
    </>
  );
}
