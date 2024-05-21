import { useUsers } from "@/app/hooks/useUsers";
import { Users } from "@/app/interfaces/users.type";
import Link from "next/link";

export default async function UsersView({
  params,
}: {
  params: { id: string };
}) {
  const userDetail: Users = await useUsers(params.id);
  return (
    <>
      <div className="sm:col-span-2 md:col-span-4">
        <div className="flex justify-between">
          <div className="text-2xl lg:text-3xl font-semibold ">
            <h1>User Detail</h1>
          </div>
          <div className="bg-green-200 border rounded shadow px-3 py-1">
            <Link href="/users">Back</Link>
          </div>
        </div>
      </div>
      <div className="sm:col-span-2 md:col-span-4">
        <div>
          <p>Firstname</p>
          <span>{userDetail.name.firstname}</span>
        </div>
        <div>
          <p>Lastname</p>
          <span>{userDetail.name.lastname}</span>
        </div>
      </div>
      <div className="sm:col-span-2 md:col-span-4">
        <div>
          <p>Username</p>
          <span>{userDetail.username}</span>
        </div>
        <div>
          <p>Email</p>
          <span>{userDetail.email}</span>
        </div>
        <div>
          <p>Phone</p>
          <span>{userDetail.phone}</span>
        </div>
      </div>
      <div className="sm:col-span-2 md:col-span-4">
        <div>
          <p>Address</p>
          <span>No: </span>
          <span>{userDetail.address.number}</span>
          <span>Street: </span>
          <span>{userDetail.address.street}</span>
          <span>City: </span>
          <span>{userDetail.address.city}</span>
          <span>Zipcode: </span>
          <span>{userDetail.address.zipcode}</span>
          <div>
            <p>Geolocation</p>
            <span>Latitude: </span>
            <span>{userDetail.address.geolocation.lat}</span>
            <span>Longitude:</span>
            <span>{userDetail.address.geolocation.long}</span>
          </div>
        </div>
      </div>
    </>
  );
}
