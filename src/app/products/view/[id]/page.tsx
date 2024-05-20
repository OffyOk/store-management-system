import { useProductDetail } from "@/app/hooks/useProducts";
import { Products } from "@/app/interfaces/products.type";
import Image from "next/image";

export default async function ProductView({
  params,
}: {
  params: { id: string };
}) {
  const productDetail = await useProductDetail(params.id);

  return (
    <>
      <div className="sm:col-span-2 md:col-span-4">
        <div className="flex justify-start">
          <div className="text-2xl lg:text-3xl font-semibold">
            Product Detail
          </div>
        </div>
      </div>
      <div className="sm:col-span-2 md:col-span-4">
        <div className="flex-col justify-start">
          <div className="mx-auto hover:scale-125 transition-transform">
            <Image
              className="object-cover "
              src={`${productDetail.image}`}
              width={500}
              height={500}
              alt="Logo"
            />
          </div>
          <div>
            <span>Title: </span>
            <span>{productDetail.id}</span>
            <span>{productDetail.rating.rate}</span>
          </div>
          <div>
            <span>Category: </span>
            <span>{productDetail.userId}</span>
          </div>
          <div>
            <span>Price: </span>
            <span>{productDetail.date}</span>
          </div>
          <div>
            <span>Description: </span>
            <span>{productDetail.description}</span>
          </div>
        </div>
      </div>
    </>
  );
}
