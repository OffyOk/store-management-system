"use client";
import { useState, useEffect } from "react";
import { Users } from "../interfaces/users.type";
import Link from "next/link";
import { Orders } from "../interfaces/orders.type";
import DelButton from "./button/DelButton";
import UpdateButton from "./button/UpdateButton";
import ViewButton from "./button/ViewButton";
import CreateButton from "./button/CreateButton";

interface SearchFormProps {
  initialData: Users[];
}

const SearchFormUsers = ({ initialData }: SearchFormProps) => {
  const [data, setData] = useState<Users[]>(initialData);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState<Users[]>(initialData);

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  useEffect(() => {
    const results = data.filter((item) =>
      `${item.name.firstname} ${item.name.lastname} ${item.username} ${item.email} ${item.phone}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
    setFilteredData(results);
  }, [searchTerm, data]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <>
      <div className="flex items-center justify-between sm:col-span-2 md:col-span-4">
        <div>
          <form action="/">
            <input
              className="px-4 py-2 border rounded-md w-full"
              id="user"
              type="text"
              placeholder="Search Customer..."
              value={searchTerm}
              onChange={handleChange}
            />
          </form>
        </div>
        <div>
          <CreateButton refto="/users/create" page="Customer" />
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
            {filteredData.map((user: Users) => {
              return (
                <tr key={user.id}>
                  <td className="text-center">{user.name.firstname}</td>
                  <td className="text-center">{user.name.lastname}</td>
                  <td className="text-center hidden lg:block">
                    {user.username}
                  </td>
                  <td className="text-center">{user.email}</td>
                  <td className="text-center">{user.phone}</td>
                  <td className="text-center flex gap-1 justify-center mt-1">
                    <ViewButton refto={`users/view/${user.id}`} />
                    <UpdateButton refto={`users/update/${user.id}`} />
                    <DelButton />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default SearchFormUsers;
