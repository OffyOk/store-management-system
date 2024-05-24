"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { OrdersUsers } from "../interfaces/orders.type";
import DelButton from "../components/button/DelButton";

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
              placeholder="Search Customer..."
              value={searchTerm}
              onChange={handleChange}
            />
          </form>
        </div>
        <div>
          <Link href="/orders/create">
            <button>New customer</button>
          </Link>
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
                    <Link href={`/carts/view/${fn.id}`}>View</Link>
                    <Link href={`/carts/update/${fn.id}`}>Update</Link>
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
