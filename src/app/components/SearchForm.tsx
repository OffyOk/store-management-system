"use client";
import { useState, useEffect } from "react";
import { Users } from "../interfaces/users.type";
import Link from "next/link";

interface SearchFormProps {
  initialData: Users[];
}

const SearchForm = ({ initialData }: SearchFormProps) => {
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
      <div className="flex justify-between sm:col-span-2 md:col-span-4">
        <div>
          <form action="/">
            <input
              className="mr-3"
              id="user"
              type="text"
              placeholder="Search Customer..."
              value={searchTerm}
              onChange={handleChange}
            />
          </form>
        </div>
        <div>
          <Link href="/users/create">
            <button>New customer</button>
          </Link>
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
                  <td className="text-center">
                    <Link href={`users/view/${user.id}`}>View</Link>
                    <Link href={`users/update/${user.id}`}>Update</Link>
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
};

export default SearchForm;
