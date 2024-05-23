import { useUsers } from "../hooks/useUsers";
import { Users } from "../interfaces/users.type";
import Link from "next/link";
import SearchForm from "../components/SearchForm";

export default async function UsersList() {
  const users: Users[] = await useUsers();
  return (
    <>
      <div className="sm:col-span-2 md:col-span-4">
        <div className="flex justify-start">
          <div className="text-2xl lg:text-3xl font-semibold">Customer</div>
        </div>
      </div>
      <SearchForm initialData={users} />
    </>
  );
}
