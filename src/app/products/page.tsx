import Link from "next/link";

const randomFullNames = [
  "Olivia Thompson",
  "Noah Johnson",
  "Emma Williams",
  "Liam Smith",
  "Ava Brown",
];
export default function ProductList() {
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
            <label className="mr-3" htmlFor="cart">
              Search Product
            </label>
            <input
              className="mr-3"
              id="cart"
              type="text"
              placeholder="Search here"
            />
            <button>Search</button>
          </form>
        </div>
        <div>
          <button>New Product</button>
        </div>
      </div>
      <div className="hidden md:block p-4 bg-white border border-gray-200 rounded-lg shadow col-span-auto sm:col-span-2 md:col-span-4  dark:border-white dark:bg-black">
        <span>Recent Order</span>
        <table className="w-full table-auto">
          <thead>
            <tr>
              <th>DATE & TIME</th>
              <th>FULL NAME</th>
              <th className="hidden lg:block">EMAIL</th>
              <th>PHONE NUMBER</th>
              <th>AMOUNT</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {randomFullNames.map((fn) => {
              return (
                <tr key={fn}>
                  <td className="text-center">2022-01-01 12:00:00</td>
                  <td className="text-center">{fn}</td>
                  <td className="text-center hidden lg:block">
                    {fn.split(" ").join("")}@store.com
                  </td>
                  <td className="text-center">0912345678</td>
                  <td className="text-center">1000</td>
                  <td className="text-center">
                    <Link href="/carts/view/1">View</Link>
                    <button>Update</button>
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
