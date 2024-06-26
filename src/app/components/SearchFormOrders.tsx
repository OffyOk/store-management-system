"use client";
import { useState, useEffect } from "react";
import { OrdersProducts, OrdersUsers } from "../interfaces/orders.type";
import ViewButton from "./button/ViewButton";
import DelButton from "./button/DelButton";
import Pagination from "./Pagination";

interface SearchFormProps {
  initialData: OrdersUsers[];
  fromDash?: boolean;
}

const SearchFormOrders = ({
  initialData,
  fromDash = false,
}: SearchFormProps) => {
  const [data, setData] = useState<OrdersUsers[]>(initialData);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState<OrdersUsers[]>(initialData);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const handlePageChange = (pageNumber: number) => setCurrentPage(pageNumber);

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  useEffect(() => {
    const results = data.filter((item) =>
      `${item.date} ${item.fullName} ${item.email} ${item.phone} ${item.amount}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
    setCurrentPage(1);
    setFilteredData(results);
  }, [searchTerm, data]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <>
      <div className="my-3 flex justify-start sm:col-span-2 md:col-span-4">
        <div className="max-sm:w-full">
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
      <div
        className={
          fromDash
            ? ""
            : "mb-4 p-4 bg-white border border-gray-200 rounded-lg shadow col-span-auto sm:col-span-2 md:col-span-4  dark:border-white dark:bg-black"
        }
      >
        {filteredData.length > 0 ? (
          <>
            <table className="w-full table-auto text-left">
              <thead>
                <tr>
                  <th>DATE</th>
                  <th>FULL NAME</th>
                  <th className="max-md:hidden">EMAIL</th>
                  <th className="max-lg:hidden">PHONE NUMBER</th>
                  <th className="max-sm:hidden">AMOUNT</th>
                  <th className="w-24">ACTION</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((fn) => {
                  return (
                    <tr className="max-sm:h-24 md:h-12" key={fn.id}>
                      <td>{fn.date}</td>
                      <td>{fn.fullName}</td>
                      <td className="max-md:hidden">{fn.email}</td>
                      <td className="max-lg:hidden">{fn.phone}</td>
                      <td className="max-sm:hidden">{fn.amount}</td>
                      <td>
                        {" "}
                        <div className="flex justify-between">
                          <ViewButton refto={`carts/view/${fn.id}`} />
                          <DelButton />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              handlePageChange={handlePageChange}
            />
          </>
        ) : (
          <div className="text-center text-gray-500">
            No order found for {'"'}
            {searchTerm}
            {'"'}
          </div>
        )}
      </div>
    </>
  );
};

export default SearchFormOrders;
