import FormProduct from "@/app/components/FormProduct";

export default function CreateProducts() {
  return (
    <div className="sm:col-span-2 md:col-span-4">
      <div className="text-2xl lg:text-3xl font-semibold ">Create Product</div>
      <FormProduct pathBack="/products" />
    </div>
  );
}
