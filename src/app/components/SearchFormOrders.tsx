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
              className="mr-3"
              id="order"
              type="text"
              placeholder="Search Order..."
              value={searchTerm}
              onChange={handleChange}
            />
          </form>
        </div>
        <div>
          <CreateButton refto="/orders/create" page="Order" />
        </div>
      </div>
      <div className="hidden md:block p-4 bg-white border border-gray-200 rounded-lg shadow col-span-auto sm:col-span-2 md:col-span-4  dark:border-white dark:bg-black">
        <table className="w-full table-auto">
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
                  <td className="text-center">{fn.date}</td>
                  <td className="text-center">{fn.fullName}</td>
                  <td className="text-center hidden lg:block">{fn.email}</td>
                  <td className="text-center">{fn.phone}</td>
                  <td className="text-center">{fn.amount}</td>
                  <td className="text-center">
                    <ViewButton refto={`orders/view/${fn.id}`} />
                    <UpdateButton refto={`orders/update/${fn.id}`} />
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
