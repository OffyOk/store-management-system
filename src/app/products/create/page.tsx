import FormProduct from "@/app/components/FormProduct";

export default function CreateProducts() {
  return (
    <>
      <div className="sm:col-span-2 md:col-span-4">
        <div className="text-2xl lg:text-3xl font-semibold ">Create User</div>
      </div>
      <div className="sm:col-span-2 md:col-span-4">
        <FormProduct pathBack="/products" />
      </div>
    </>
  );
}
