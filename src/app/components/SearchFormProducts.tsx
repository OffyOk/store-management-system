"use client";
import { useState, useEffect } from "react";
import { Products } from "../interfaces/products.type";
import CreateButton from "./button/CreateButton";
import ViewButton from "./button/ViewButton";
import UpdateButton from "./button/UpdateButton";
import DelButton from "./button/DelButton";

interface SearchFormProps {
  initialData: Products[];
}

const SearchFormProducts = ({ initialData }: SearchFormProps) => {
  const [data, setData] = useState<Products[]>(initialData);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState<Products[]>(initialData);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  const handlePageChange = (pageNumber: number) => setCurrentPage(pageNumber);

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  useEffect(() => {
    const results = data.filter((item) =>
      `${item.title} ${item.category} ${item.rating.rate} ${item.price}`
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
          <form action="/products">
            <input
              className="px-4 py-2 border rounded-md w-full"
              id="product"
              type="text"
              placeholder="Search Product..."
              value={searchTerm}
              onChange={handleChange}
            />
          </form>
        </div>
        <div>
          <CreateButton refto="/products/create" page="Product" />
        </div>
      </div>
      <div className="mb-4 p-4 bg-white border border-gray-200 rounded-lg shadow col-span-auto sm:col-span-2 md:col-span-4  dark:border-white dark:bg-black">
        {filteredData.length > 0 ? (
          <table className="w-full table-auto  text-left">
            <thead>
              <tr>
                <th>TITLE</th>
                <th className="w-36 max-sm:hidden">CATEGORY</th>
                <th className="max-[1500px]:hidden">RATING</th>
                <th className="max-[1650px]:hidden">PRICE</th>
                <th className="w-36">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((product: Products) => {
                return (
                  <tr className="max-sm:h-24 md:h-12" key={product.id}>
                    <td>{product.title}</td>
                    <td className="max-sm:hidden">{product.category}</td>
                    <td className="max-[1500px]:hidden">
                      {product.rating.rate}
                    </td>
                    <td className="max-[1650px]:hidden">{product.price}</td>
                    <td>
                      <div className="flex justify-between">
                        <ViewButton refto={`products/view/${product.id}`} />
                        <UpdateButton refto={`products/update/${product.id}`} />
                        <DelButton />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <div className="text-center text-gray-500">
            No product found for {'"'}
            {searchTerm}
            {'"'}
          </div>
        )}
      </div>
    </>
  );
};

export default SearchFormProducts;
