import FormProduct from "@/app/components/FormProduct";
import { useProducts } from "@/app/hooks/useProducts";
import { Products } from "@/app/interfaces/products.type";

export default async function ProductView({
  params,
}: {
  params: { id: string };
}) {
  const ProductData: Products = await useProducts(params.id);

  return (
    <div className="sm:col-span-2 md:col-span-4">
      <div className="text-2xl lg:text-3xl font-semibold">Product Detail</div>
      <FormProduct
        initialData={ProductData}
        pathBack="/products"
        viewMode={true}
      />
    </div>
  );
}
