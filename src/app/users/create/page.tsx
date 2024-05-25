import FormUser from "@/app/components/FormUser";
export default function CreateUser() {
  return (
    <>
      <div className="sm:col-span-2 md:col-span-4">
        <div className="text-2xl lg:text-3xl font-semibold ">Create User</div>
      </div>
      <div className="sm:col-span-2 md:col-span-4">
        <FormUser pathBack="/users" />
      </div>
    </>
  );
}
