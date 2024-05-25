import FormComponent from "@/app/components/FormComponent";
import { useUsers } from "@/app/hooks/useUsers";
import { Users } from "@/app/interfaces/users.type";
import Link from "next/link";

export default async function UpdateUser({
  params,
}: {
  params: { id: string };
}) {
  const UserData: Users = await useUsers(params.id);

  return (
    <div className="sm:col-span-2 md:col-span-4">
      <div className="text-2xl lg:text-3xl font-semibold mb-3">Update User</div>
      <FormComponent initialData={UserData} pathBack="/users" />
    </div>
  );
}
