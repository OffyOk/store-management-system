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
      <div className="flex justify-between sm:col-span-2 md:col-span-4">
        <div>
          <form action="/">
            <input
              className="mr-3"
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
      <div className="hidden md:block p-4 bg-white border border-gray-200 rounded-lg shadow col-span-auto sm:col-span-2 md:col-span-4  dark:border-white dark:bg-black">
        <table className="w-full table-auto">
          <thead>
            <tr>
              <th className="columns-2xs ">TITLE</th>
              <th>CATEGORY</th>
              <th>RATING</th>
              <th>PRICE</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((product: Products) => {
              return (
                <tr key={product.id}>
                  <td className="columns-2xs">{product.title}</td>
                  <td className="overflow-hidden  hidden lg:block">
                    {product.category}
                  </td>
                  <td className="text-left">{product.rating.rate}</td>
                  <td className="text-left">{product.price}</td>
                  <td className="text-left">
                    <ViewButton refto={`products/view/${product.id}`} />
                    <UpdateButton refto={`products/update/${product.id}`} />
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

export default SearchFormProducts;
