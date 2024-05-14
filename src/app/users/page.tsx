import { useUsers } from "../hooks/useUsers";
import { Users } from "../interfaces/users.type";
import Link from "next/link";

export default async function UsersList() {
  const users: Users[] = await useUsers();

  return (
    <>
      <div className="sm:col-span-2 md:col-span-4">
        <div className="flex justify-start">
          <div className="text-2xl lg:text-3xl font-semibold">Customer</div>
        </div>
      </div>
      <div className="flex justify-between sm:col-span-2 md:col-span-4">
        <div>
          <form action="/">
            <label className="mr-3" htmlFor="user">
              Search Customer
            </label>
            <input
              className="mr-3"
              id="user"
              type="text"
              placeholder="Search here"
            />
            <button>Search</button>
          </form>
        </div>
        <div>
          <button>New customer</button>
        </div>
      </div>
      <div className="hidden md:block p-4 bg-white border border-gray-200 rounded-lg shadow col-span-auto sm:col-span-2 md:col-span-4  dark:border-white dark:bg-black">
        <table className="w-full table-auto">
          <thead>
            <tr>
              <th>FIRST NAME</th>
              <th>LAST NAME</th>
              <th>USERNAME</th>
              <th className="hidden lg:block">EMAIL</th>
              <th>PHONE NUMBER</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user: Users) => {
              return (
                <tr key={user.id}>
                  <td className="text-center">{user.name.firstname}</td>
                  <td className="text-center">{user.name.lastname}</td>
                  <td className="text-center hidden lg:block">
                    {user.username}
                  </td>
                  <td className="text-center">{user.email}</td>
                  <td className="text-center">{user.phone}</td>
                  <td className="text-center">
                    <Link href={`users/${user.id}`}>View</Link>
                    <button>Update</button>
                    <button>Delete</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
