"use client";
import { useRouter } from "next/navigation";
import FormComponent from "@/app/components/FormComponent";
import { Users } from "@/app/interfaces/users.type";
import { useUsers } from "@/app/hooks/useUsers";
import Link from "next/link";

export default function UpdateUser({ params }: { params: { id: string } }) {
  const router = useRouter();
  const UserData = async () => {
    const res = await useUsers(params.id);
    return res;
  };

  const updateUser = async (user: Users) => {
    try {
      console.log("user data:", user);
      const response = await fetch(
        `https://fakestoreapi.com/users/${user.id}`,
        {
          method: "PATCH",
          body: JSON.stringify(user),
        }
      );
      const data = await response.json();
      router.push("/users");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <div className="sm:col-span-2 md:col-span-4">
        <div className="flex justify-between">
          <div className="text-2xl lg:text-3xl font-semibold ">Update User</div>
          <div className="bg-green-200 border rounded shadow px-3 py-1">
            <Link href="/users">Back</Link>
          </div>
        </div>
      </div>
      <div className="sm:col-span-2 md:col-span-4">
        <FormComponent currentProduct={UserData} submit={updateUser} />
      </div>
    </>
  );
}
