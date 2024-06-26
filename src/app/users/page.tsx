import { useUsers } from "../hooks/useUsers";
import { Users } from "../interfaces/users.type";
import SearchFormUsers from "../components/SearchFormUsers";

export default async function UsersList() {
  const users: Users[] = await useUsers();
  return (
    <div className="sm:col-span-2 md:col-span-4">
      <div className="text-2xl lg:text-3xl font-semibold">Customers</div>
      <SearchFormUsers initialData={users} />
    </div>
  );
}
