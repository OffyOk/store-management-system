"use client";

import Image from "next/image";
import { ReProducts } from "../interfaces/products.type";

export default function Card({ product }: { product: ReProducts }) {
  return (
    <>
      <div className="w-56 m-2 border shadow rounded-lg bg-white dark:bg-black">
        <div className="w-20 mt-5 mx-auto border rounded-lg bg-yellow-300 border-gray-300 shadow text-center">
          Sales: {product.quantity}
        </div>
        <div className=" mx-auto w-1/2 flex justify-center h-36">
          <div className="my-auto hover:scale-125 transition-transform">
            <Image
              className="object-cover "
              src={`${product.image}`}
              width={500}
              height={500}
              alt="Logo"
            />
          </div>
        </div>
        <div className="w-3/4 mx-auto flex justify-between my-3">
          <div className="w-1/2 h-9 text-xl font-bold overflow-hidden">
            {product.title}
          </div>
          <div>
            <div className="px-3 py-1 font-semibold">${product.price}</div>
          </div>
        </div>
      </div>
    </>
  );
}
