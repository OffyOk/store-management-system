"use client";
import { useState, useEffect } from "react";
import { Users } from "../interfaces/users.type";
import CreateButton from "./button/CreateButton";
import ViewButton from "./button/ViewButton";
import UpdateButton from "./button/UpdateButton";
import DelButton from "./button/DelButton";

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
      <div className="my-3 flex items-center justify-between gap-1 sm:col-span-2 md:col-span-4">
        <div className="max-sm:w-full">
          <form action="/users">
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
      <div className="p-4 bg-white border border-gray-200 rounded-lg shadow col-span-auto sm:col-span-2 md:col-span-4  dark:border-white dark:bg-black">
        {filteredData.length > 0 ? (
          <table className="w-full table-auto text-left">
            <thead>
              <tr>
                <th className="max-sm:hidden">FIRST NAME</th>
                <th className="max-sm:hidden">LAST NAME</th>
                <th>USERNAME</th>
                <th className="max-md:hidden">EMAIL</th>
                <th className="max-[1024px]:hidden">PHONE NUMBER</th>
                <th className="w-36">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((user: Users) => {
                return (
                  <tr key={user.id}>
                    <td className="max-sm:hidden">{user.name.firstname}</td>
                    <td className="max-sm:hidden">{user.name.lastname}</td>
                    <td>{user.username}</td>
                    <td className="max-md:hidden">{user.email}</td>
                    <td className="max-[1024px]:hidden">{user.phone}</td>
                    <td className="flex justify-between mt-1">
                      <ViewButton refto={`users/view/${user.id}`} />
                      <UpdateButton refto={`users/update/${user.id}`} />
                      <DelButton />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <div className="text-center text-gray-500">
            No user found for {'"'}
            {searchTerm}
            {'"'}
          </div>
        )}
      </div>
    </>
  );
};

export default SearchFormUsers;
