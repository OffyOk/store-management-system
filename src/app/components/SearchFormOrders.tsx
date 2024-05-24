"use client";
import { useState, useEffect } from "react";
import { OrdersUsers } from "../interfaces/orders.type";
import CreateButton from "./button/CreateButton";
import ViewButton from "./button/ViewButton";
import UpdateButton from "./button/UpdateButton";
import DelButton from "./button/DelButton";

interface SearchFormProps {
  initialData: OrdersUsers[];
}

const SearchFormOrders = ({ initialData }: SearchFormProps) => {
  const [data, setData] = useState<OrdersUsers[]>(initialData);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState<OrdersUsers[]>(initialData);

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  useEffect(() => {
    const results = data.filter((item) =>
      `$${item.date} ${item.fullName} ${item.email} ${item.phone} ${item.amount}`
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
              className="px-4 py-2 border rounded-md w-full"
              id="cart"
              type="text"
              placeholder="Search Cart..."
              value={searchTerm}
              onChange={handleChange}
            />
          </form>
        </div>
        <div>
          <CreateButton refto="/carts/create" page="Cart" />
        </div>
      </div>
      <div className="hidden md:block p-4 bg-white border border-gray-200 rounded-lg shadow col-span-auto sm:col-span-2 md:col-span-4  dark:border-white dark:bg-black">
        <table className="w-full table-auto text-left">
          <thead>
            <tr>
              <th>DATE</th>
              <th>FULL NAME</th>
              <th className="hidden lg:block">EMAIL</th>
              <th>PHONE NUMBER</th>
              <th>AMOUNT</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((fn) => {
              return (
                <tr key={fn.id}>
                  <td>{fn.date}</td>
                  <td>{fn.fullName}</td>
                  <td className="hidden lg:block">{fn.email}</td>
                  <td>{fn.phone}</td>
                  <td>{fn.amount}</td>
                  <td className="flex gap-1 justify-center mt-1">
                    <ViewButton refto={`carts/view/${fn.id}`} />
                    <UpdateButton refto={`carts/update/${fn.id}`} />
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

export default SearchFormOrders;
