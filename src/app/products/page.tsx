import { useProducts } from "../hooks/useProducts";
import { Products } from "../interfaces/products.type";
import SearchFormProducts from "../components/SearchFormProducts";

export default async function ProductsList() {
  const products: Products[] = await useProducts();

  return (
    <>
      <div className="sm:col-span-2 md:col-span-4">
        <div className="flex justify-start">
          <div className="text-2xl lg:text-3xl font-semibold">Products</div>
        </div>
      </div>
      <SearchFormProducts initialData={products} />
    </>
  );
}
