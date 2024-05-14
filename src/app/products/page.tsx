import { useProducts, useProductDetail } from "../hooks/useProducts";
import { Products } from "../interfaces/products.type";
import Link from "next/link";

export default async function UsersList() {
  const products: Products[] = await useProducts();

  return (
    <>
      <div className="sm:col-span-2 md:col-span-4">
        <div className="flex justify-start">
          <div className="text-2xl lg:text-3xl font-semibold">Products</div>
        </div>
      </div>
      <div className="flex justify-between sm:col-span-2 md:col-span-4">
        <div>
          <form action="/">
            <label className="mr-3" htmlFor="product">
              Search products
            </label>
            <input
              className="mr-3"
              id="product"
              type="text"
              placeholder="Search here"
            />
            <button>Search</button>
          </form>
        </div>
        <div>
          <Link href={`products/create`}>
            <button>New product</button>
          </Link>
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
            {products.map((product: Products) => {
              return (
                <tr key={product.id}>
                  <td className="columns-2xs">{product.title}</td>
                  <td className="overflow-hidden  hidden lg:block">
                    {product.category}
                  </td>
                  <td className="text-left">{product.rating.rate}</td>
                  <td className="text-left">{product.price}</td>
                  <td className="text-left">
                    <Link href={`products/view/${product.id}`}>
                      <button>View</button>
                    </Link>
                    <Link href={`update/update/${product.id}`}>
                      <button>Update</button>
                    </Link>
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
}
