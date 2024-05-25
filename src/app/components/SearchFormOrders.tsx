"use client";
import { useState, useEffect } from "react";
import { OrdersUsers } from "../interfaces/orders.type";
import ViewButton from "./button/ViewButton";
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
      <div className="my-3 flex justify-start sm:col-span-2 md:col-span-4">
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
      </div>
      <div className="p-4 bg-white border border-gray-200 rounded-lg shadow col-span-auto sm:col-span-2 md:col-span-4  dark:border-white dark:bg-black  ">
        <table className="w-full table-auto text-left">
          <thead>
            <tr>
              <th className="max-sm:hidden">DATE</th>
              <th>FULL NAME</th>
              <th className="max-md:hidden">EMAIL</th>
              <th className="max-lg:hidden">PHONE NUMBER</th>
              <th>AMOUNT</th>
              <th className="w-24">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((fn) => {
              return (
                <tr key={fn.id}>
                  <td className="max-sm:hidden">{fn.date}</td>
                  <td>{fn.fullName}</td>
                  <td className="max-md:hidden">{fn.email}</td>
                  <td className="max-lg:hidden">{fn.phone}</td>
                  <td>{fn.amount}</td>
                  <td className="flex justify-between mt-1">
                    <ViewButton refto={`carts/view/${fn.id}`} />
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
